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

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.wasm?url' {
  const src: string;
  export default src;
}
