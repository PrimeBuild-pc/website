import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Listen configuration (Windows-safe): avoid reusePort on win32 and allow HOST/PORT overrides
  const PORT = Number(process.env.PORT) || 5000;
  const HOST = process.env.HOST || (process.platform === "win32" ? "127.0.0.1" : "0.0.0.0");

  server.on("error", (err: any) => {
    const code = err?.code || "UNKNOWN";
    const msg = err?.message || String(err);
    log(`listen error [${code}]: ${msg}`);
  });

  const listenOptions: { port: number; host: string; reusePort?: boolean } = { port: PORT, host: HOST };
  if (process.platform !== "win32") {
    // SO_REUSEPORT is not supported on Windows and can throw ENOTSUP
    listenOptions.reusePort = true;
  }

  server.listen(listenOptions, () => {
    log(`serving on http://${HOST}:${PORT}`);
  });
})();
