import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const reqresProxy = {
  '/reqres': {
    target: 'https://reqres.in',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/reqres/, ''),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: reqresProxy },
  preview: { proxy: reqresProxy },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
      },
    },
  },
});
