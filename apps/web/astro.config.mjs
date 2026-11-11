// @ts-check

import react from '@astrojs/react';
import stylex from '@stylexjs/unplugin';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [stylex.vite({ useCSSLayers: true })],
  },
});
