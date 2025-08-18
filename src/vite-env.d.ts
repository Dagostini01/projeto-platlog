/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  // adicione mais variáveis se precisar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
