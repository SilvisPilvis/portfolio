import './bootstrap';
// import '../css/app.css'; 
import { createInertiaApp } from '@inertiajs/svelte'

createInertiaApp({
    resolve: name => {
        // can be set to lazy loading
        const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
        // const components = import.meta.glob('./Components/**/*.svelte', { eager: true })
        return pages[`./Pages/${name}.svelte`]
        // return components[`./Components/${name}.svelte`]
    },
    setup({ el, App, props }) {
        new App({ target: el, props, hydrate: true })
    },
    progress: {
        color: '#4B5563',
    },
    id: 'app',
})
