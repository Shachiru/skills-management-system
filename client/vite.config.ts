// client/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // This enables the React Compiler
          ['babel-plugin-react-compiler', { target: '18' }],
        ],
      },
    }),
  ],
});