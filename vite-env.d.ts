/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the PocketBase API. Defaults to "/pb" (same-origin proxy). */
  readonly VITE_PB_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
