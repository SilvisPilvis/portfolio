import './bootstrap';

import { createInertiaApp } from '@inertiajs/svelte'

createInertiaApp({
  resolve: name => {
    // can be set to lazy loading
    const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
    return pages[`./Pages/${name}.svelte`]
  },
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
  id: 'app',
})
