/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REQRES_X_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
