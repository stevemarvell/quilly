// src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // No API keys here! They live on the backend only.
  // Add any frontend-safe environment variables here if needed in the future
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}