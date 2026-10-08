const DEFAULT_ALLOWED_ORIGIN = 'https://primebuild.website';
const GITHUB_API_BASE = 'https://api.github.com';
const MAX_REDIRECT_HOPS = 5;

const ALLOWED_GITHUB_HOSTS = new Set([
  'github.com',
  'api.github.com',
  'objects.githubusercontent.com',
  'github-releases.githubusercontent.com',
  'release-assets.githubusercontent.com',
]);

function parseAllowedOrigins(env) {
  const configured = (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGIN)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return configured
    .map((origin) => {
      try {
        return new URL(origin).origin;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function getAllowedCorsOrigin(request, env) {
  const origin = request.headers.get('Origin');
  if (!origin) return null;

  let normalizedOrigin;
  try {
    normalizedOrigin = new URL(origin).origin;
  } catch {
    return null;
  }

  const allowedOrigins = parseAllowedOrigins(env);
  return allowedOrigins.includes(normalizedOrigin) ? normalizedOrigin : null;
}

function jsonHeaders(allowOrigin) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Origin',
  };

  if (allowOrigin) {
    headers['Access-Control-Allow-Origin'] = allowOrigin;
    headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }

  return headers;
}

function jsonResponse(payload, status, allowOrigin = null) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: jsonHeaders(allowOrigin),
  });
}

function isValidRepoPart(value) {
  return /^[A-Za-z0-9_.-]+$/.test(value);
}

function isAllowedGitHubHost(hostname) {
  const host = String(hostname || '').toLowerCase();
  return ALLOWED_GITHUB_HOSTS.has(host) || host.endsWith('.githubusercontent.com');
}

function getReleasePageUrl(owner, repo) {
  return `https://github.com/${owner}/${repo}/releases`;
}

function getGitHubApiHeaders(env, accept = 'application/vnd.github+json') {
  const headers = {
    Accept: accept,
    'User-Agent': 'primebuild-release-resolver',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  return headers;
}

function getReleaseTimestamp(release) {
  const published = Date.parse(release?.published_at || '');
  if (!Number.isNaN(published)) return published;

  const created = Date.parse(release?.created_at || '');
  return Number.isNaN(created) ? -1 : created;
}

function selectLatestNonDraftRelease(releases) {
  return releases
    .filter((release) => release && release.draft !== true)
    .sort((a, b) => getReleaseTimestamp(b) - getReleaseTimestamp(a))[0];
}

function getAssetNameExtension(name) {
  const lower = String(name || '').toLowerCase();
  const dotIndex = lower.lastIndexOf('.');
  if (dotIndex === -1) return '';
  return lower.slice(dotIndex);
}

function getAssetScore(asset) {
  const lowerName = String(asset?.name || '').toLowerCase();
  const extension = getAssetNameExtension(lowerName);

  const isInstaller = /(^|[-_.\s])(setup|installer|install)([-_.\s]|$)/.test(lowerName);
  const isPortable = /(^|[-_.\s])(portable|standalone|noinstall)([-_.\s]|$)/.test(lowerName);
  const isChecksumOrSignature = /(^|[-_.\s])(sha1|sha256|sha512|md5|checksum|signature|sig|asc)([-_.\s]|$)/.test(lowerName);

  let category = 3;
  if (isInstaller) category = 0;
  else if (isPortable) category = 1;
  else category = 2;

  if (isChecksumOrSignature) {
    category = 6;
  }

  let extensionWeight = 3;
  if (extension === '.msi') extensionWeight = 0;
  else if (extension === '.exe') extensionWeight = 1;
  else if (extension === '.zip') extensionWeight = 2;

  const updatedAt = Date.parse(asset?.updated_at || '') || 0;
  const size = Number(asset?.size || 0);

  return { category, extensionWeight, updatedAt, size };
}

function compareAssets(a, b) {
  const scoreA = getAssetScore(a);
  const scoreB = getAssetScore(b);

  if (scoreA.category !== scoreB.category) {
    return scoreA.category - scoreB.category;
  }

  if (scoreA.extensionWeight !== scoreB.extensionWeight) {
    return scoreA.extensionWeight - scoreB.extensionWeight;
  }

  if (scoreA.updatedAt !== scoreB.updatedAt) {
    return scoreB.updatedAt - scoreA.updatedAt;
  }

  return scoreB.size - scoreA.size;
}

function isAssetFromRequestedRepo(asset, owner, repo) {
  if (!asset || typeof asset !== 'object') return false;
  if (!asset.url || !asset.browser_download_url || !asset.id) return false;

  try {
    const apiUrl = new URL(asset.url);
    const downloadUrl = new URL(asset.browser_download_url);

    if (apiUrl.protocol !== 'https:' || downloadUrl.protocol !== 'https:') return false;
    if (apiUrl.hostname.toLowerCase() !== 'api.github.com') return false;
    if (!isAllowedGitHubHost(downloadUrl.hostname)) return false;

    const expectedAssetPrefix = `/repos/${owner}/${repo}/releases/assets/`;
    if (!apiUrl.pathname.startsWith(expectedAssetPrefix)) return false;

    if (downloadUrl.hostname.toLowerCase() === 'github.com') {
      const expectedDownloadPrefix = `/${owner}/${repo}/releases/download/`;
      if (!downloadUrl.pathname.startsWith(expectedDownloadPrefix)) return false;
    }

    return true;
  } catch {
    return false;
  }
}

function isRedirectStatus(status) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function resolveGitHubOnlyRedirectChain(initialUrl, env) {
  let currentUrl = initialUrl;

  for (let hop = 0; hop <= MAX_REDIRECT_HOPS; hop += 1) {
    const parsedCurrent = new URL(currentUrl);
    if (!isAllowedGitHubHost(parsedCurrent.hostname)) {
      throw new Error('Redirect host not allowed');
    }

    const headers = getGitHubApiHeaders(
      env,
      parsedCurrent.hostname.toLowerCase() === 'api.github.com' ? 'application/octet-stream' : '*/*'
    );
    headers.Range = 'bytes=0-0';

    const response = await fetch(currentUrl, {
      method: 'GET',
      headers,
      redirect: 'manual',
    });

    if (isRedirectStatus(response.status)) {
      const location = response.headers.get('Location');
      if (!location) {
        throw new Error('Missing redirect location');
      }

      const nextUrl = new URL(location, currentUrl);
      if (!isAllowedGitHubHost(nextUrl.hostname)) {
        throw new Error('Redirect target host not allowed');
      }

      currentUrl = nextUrl.toString();
      continue;
    }

    if (response.status >= 200 && response.status < 300) {
      const finalUrl = new URL(currentUrl);
      if (!isAllowedGitHubHost(finalUrl.hostname)) {
        throw new Error('Final download host not allowed');
      }
      return finalUrl.toString();
    }

    throw new Error(`Unexpected download status ${response.status}`);
  }

  throw new Error('Redirect limit exceeded');
}

export const onRequestGet = async (context) => {
  const { request, env } = context;
  const allowOrigin = getAllowedCorsOrigin(request, env);

  if (request.headers.get('Origin') && !allowOrigin) {
    return jsonResponse({ success: false, error: 'Origin not allowed' }, 403);
  }

  const requestUrl = new URL(request.url);
  const owner = (requestUrl.searchParams.get('owner') || '').trim();
  const repo = (requestUrl.searchParams.get('repo') || '').trim();

  if (!isValidRepoPart(owner) || !isValidRepoPart(repo)) {
    return jsonResponse(
      {
        success: false,
        error: 'Invalid repository coordinates',
      },
      400,
      allowOrigin
    );
  }

  const releasePageUrl = getReleasePageUrl(owner, repo);
  const releasesApiUrl = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases`;

  try {
    const releasesResponse = await fetch(releasesApiUrl, {
      method: 'GET',
      headers: getGitHubApiHeaders(env),
    });

    if (!releasesResponse.ok) {
      return jsonResponse(
        {
          success: false,
          error: releasesResponse.status === 404 ? 'Repository not found' : 'GitHub API request failed',
          releasePageUrl,
        },
        releasesResponse.status === 404 ? 404 : 502,
        allowOrigin
      );
    }

    const releases = await releasesResponse.json();
    if (!Array.isArray(releases) || releases.length === 0) {
      return jsonResponse(
        {
          success: false,
          error: 'No releases available',
          releasePageUrl,
        },
        404,
        allowOrigin
      );
    }

    const latestRelease = selectLatestNonDraftRelease(releases);
    if (!latestRelease) {
      return jsonResponse(
        {
          success: false,
          error: 'No non-draft releases available',
          releasePageUrl,
        },
        404,
        allowOrigin
      );
    }

    const releaseAssets = Array.isArray(latestRelease.assets) ? latestRelease.assets : [];
    const validAssets = releaseAssets.filter((asset) => isAssetFromRequestedRepo(asset, owner, repo));

    if (validAssets.length === 0) {
      return jsonResponse(
        {
          success: false,
          error: 'No valid release assets found',
          releasePageUrl,
        },
        404,
        allowOrigin
      );
    }

    const selectedAsset = [...validAssets].sort(compareAssets)[0];
    if (!selectedAsset || !selectedAsset.url) {
      return jsonResponse(
        {
          success: false,
          error: 'Unable to select a release asset',
          releasePageUrl,
        },
        404,
        allowOrigin
      );
    }

    const downloadUrl = await resolveGitHubOnlyRedirectChain(selectedAsset.url, env);

    return jsonResponse(
      {
        success: true,
        releaseTag: latestRelease.tag_name || null,
        assetName: selectedAsset.name || null,
        downloadUrl,
        releasePageUrl,
      },
      200,
      allowOrigin
    );
  } catch (error) {
    console.error('github-release-download error', error);
    return jsonResponse(
      {
        success: false,
        error: 'Unable to resolve latest release asset',
        releasePageUrl,
      },
      500,
      allowOrigin
    );
  }
};

export const onRequestOptions = async ({ request, env }) => {
  const allowOrigin = getAllowedCorsOrigin(request, env);
  if (!allowOrigin) {
    return new Response('', {
      status: 403,
      headers: {
        Vary: 'Origin',
      },
    });
  }

  return new Response('', {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  });
};