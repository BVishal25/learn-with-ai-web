import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/', // Make paths absolute for web deployment
      define: {
        // Expose the Google Client ID to the app, prefixed with VITE_ as required by Vite
        'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
      },
      resolve: {
        alias: {
          '@': new URL('.', import.meta.url).pathname,
        }
      }
    };
});