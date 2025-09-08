// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import starlight from '@astrojs/starlight';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://silvispilvis.github.io/portfolio/',
  base: '/portfolio',

  integrations: [starlight({
    title: 'Various docs and notes about my projects',
    favicon: '/favicon.svg',
  }), 
  auth()
  ]

});
