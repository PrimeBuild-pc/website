interface GitHubRepositoryConfig {
  owner: string;
  repo: string;
}

interface GitHubDownloadApiResponse {
  success: boolean;
  downloadUrl?: string;
  releasePageUrl?: string;
  error?: string;
}

interface ResolvedDownloadResult {
  success: boolean;
  downloadUrl: string;
  releasePageUrl: string;
  error?: string;
}

const REPO_PART_REGEX = /^[A-Za-z0-9_.-]+$/;
const ALLOWED_DOWNLOAD_HOSTS = new Set(['github.com', 'api.github.com', 'objects.githubusercontent.com']);

function isValidRepoPart(value: string): boolean {
  return REPO_PART_REGEX.test(value);
}

function isAllowedDownloadHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return ALLOWED_DOWNLOAD_HOSTS.has(host) || host.endsWith('.githubusercontent.com');
}

export function buildGitHubRepoUrl(owner: string, repo: string): string {
  return `https://github.com/${owner}/${repo}`;
}

export function buildGitHubReleasesUrl(owner: string, repo: string): string {
  return `${buildGitHubRepoUrl(owner, repo)}/releases`;
}

function getResolverEndpoint(): string {
  if (typeof window === 'undefined') {
    return '/github-release-download';
  }

  const isGitHubPages = window.location.hostname === 'primebuild.website';
  return isGitHubPages
    ? 'https://website-6al.pages.dev/github-release-download'
    : '/github-release-download';
}

function isValidResolvedDownloadUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && isAllowedDownloadHost(parsed.hostname);
  } catch {
    return false;
  }
}

export function getDownloadConfirmationMessage(appName: string): string {
  return [
    `${appName} e le altre app sono in continuo sviluppo.`,
    'Le app sono fornite "as is" senza garanzie di alcun tipo.',
    'PrimeBuild non si assume responsabilita per eventuali danni o problemi.',
    'Per scegliere versioni specifiche usa il pulsante "Repo" e scarica manualmente da GitHub.',
    '',
    'Vuoi continuare con il download automatico dell\'ultima release disponibile?'
  ].join('\n');
}

export async function resolveLatestReleaseDownload(
  config: GitHubRepositoryConfig
): Promise<ResolvedDownloadResult> {
  const releasePageUrl = buildGitHubReleasesUrl(config.owner, config.repo);

  if (!isValidRepoPart(config.owner) || !isValidRepoPart(config.repo)) {
    return {
      success: false,
      downloadUrl: releasePageUrl,
      releasePageUrl,
      error: 'Repository non valida.',
    };
  }

  const endpoint = getResolverEndpoint();
  const params = new URLSearchParams({ owner: config.owner, repo: config.repo });

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const payload = (await response.json().catch(() => ({}))) as GitHubDownloadApiResponse;
    const responseReleasePage = payload.releasePageUrl || releasePageUrl;

    if (!response.ok || !payload.success || !payload.downloadUrl) {
      return {
        success: false,
        downloadUrl: responseReleasePage,
        releasePageUrl: responseReleasePage,
        error: payload.error || 'Download non disponibile al momento.',
      };
    }

    if (!isValidResolvedDownloadUrl(payload.downloadUrl)) {
      return {
        success: false,
        downloadUrl: responseReleasePage,
        releasePageUrl: responseReleasePage,
        error: 'URL di download non valido.',
      };
    }

    return {
      success: true,
      downloadUrl: payload.downloadUrl,
      releasePageUrl: responseReleasePage,
    };
  } catch {
    return {
      success: false,
      downloadUrl: releasePageUrl,
      releasePageUrl,
      error: 'Errore di rete durante il download.',
    };
  }
}