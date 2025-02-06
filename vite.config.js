import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import Inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths(),
    Inspect(),
  ],
  server: {
    port: 3000, // Asegúrate de que este puerto esté libre y sea el correcto
    open: true,  // Esto abrirá automáticamente el navegador
    strictPort: true, // Si el puerto 3000 está en uso, evitará que Vite inicie en otro puerto
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern', // Si usas variables globales
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Ajusta según tus dependencias
        },
      },
    },
  },
});