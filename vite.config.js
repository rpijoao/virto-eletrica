import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        atendimento: resolve(__dirname, 'atendimento.html'),
        revisao: resolve(__dirname, 'revisao.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
