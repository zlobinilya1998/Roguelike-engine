/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BORDERS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
