import axios from "axios";
import { router, setupProgress } from "@inertiajs/core";
import "lodash.clonedeep";
import "lodash.isequal";
import createServer from "@inertiajs/core/server";
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store2, ...callbacks) {
  if (store2 == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store2.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component") name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean) return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const apiKey = "your_github_api_key_here";
axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json",
    "Authorization": `Bearer ${apiKey}`,
    "X-GitHub-Api-Version": "2022-11-28"
  }
  // timeout: 1000,
});
const arrowUp = "/build/assets/arrow-up-D73UQnvF.png";
const css$2 = {
  code: "@keyframes svelte-1ymeo34-showElement{from{opacity:0;height:0}to{opacity:1;height:100%}}img.svelte-1ymeo34{transform:rotateX(0deg);transition:all 0.1s ease-in-out;fill:#e0fafe;stroke:#e0fafe;color:#e0fafe}.collapse-anim.svelte-1ymeo34{animation:svelte-1ymeo34-showElement cubic-bezier(0.16, 1, 0.3, 1) 1s forwards}.invert-rot.svelte-1ymeo34{transform:rotateX(180deg)}",
  map: '{"version":3,"file":"CollapsableThingy.svelte","sources":["CollapsableThingy.svelte"],"sourcesContent":["<script defer>\\n  import { onMount } from \\"svelte\\";\\n  export let title;\\n  export let content;\\n  export let images = [];\\n  export let project = false;\\n  let collapsed = true;\\n  import arrowUp from \\"../assets/arrow-up.png\\";\\n\\n  const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)\\n  const id = generateRandomString(6)\\n  // console.log(id);\\nfunction toggle(ct, ca) {\\n  // console.log(ct);\\n  if (!collapsed) {\\n\\n    ct.classList.add(\\"collapse-anim\\");\\n    // ct.classList.add(\\"visible\\");\\n    ca.classList.remove(\\"invert-rot\\");\\n    } else {\\n      ct.classList.remove(\\"collapse-anim\\");\\n      // ct.classList.remove(\\"visible\\");\\n      ca.classList.add(\\"invert-rot\\");\\n  }\\n  collapsed = !collapsed\\n}\\n\\nfunction toggleBool(){\\n  collapsed = !collapsed;\\n  if(!collapsed){\\n    document.querySelector(`#arrow${id}`).classList.remove(\\"invert-rot\\");\\n  } else {\\n    document.querySelector(`#arrow${id}`).classList.add(\\"invert-rot\\");\\n  }\\n}\\n<\/script>\\n\\n{#if project}\\n  <div class=\\"sm:text-4xl text-2xl text-text w-[90%] mb-40 mt-10 font-semibold\\"> <!-- mb-2 -->\\n    <div class=\\"flex flex-row justify-between items-center min-h-[1.5rem] max-h-[5rem]\\">\\n      <p class=\\"mb-4\\">{title}</p>\\n      <img src={arrowUp} alt=\\"\\" srcset=\\"\\" id={\\"arrow\\" + id} on:click={toggleBool} class=\\"mb-4 sm:mb-0 invert-rot p-8\\" type=\\"button\\">\\n    </div>\\n    {#if !collapsed}\\n    <p id={\\"thing\\" + id} class=\\"text-4xl font-normal collapse-anim mt-4 mb-2\\">{content}</p>\\n    <!-- add pretty images -->\\n    {#each images as image}\\n    <img src={image} alt=\\"\\" class=\\"rounded-lg\\">\\n    {/each}\\n\\n    {:else}\\n    <!-- <hr class=\\"my-8\\"> -->\\n    {/if}\\n  </div>\\n{:else}\\n  <div class=\\"sm:text-4xl text-2xl text-text w-[90%] mb-2 mt-10 font-semibold\\"> <!-- mb-2 -->\\n    <div class=\\"flex flex-row justify-between items-center min-h-[1.5rem] max-h-[5rem]\\">\\n      <p class=\\"mb-4\\">{title}</p>\\n      <img src={arrowUp} alt=\\"\\" srcset=\\"\\" id={\\"arrow\\" + id} on:click={toggleBool} class=\\"mb-4 sm:mb-0 invert-rot p-8\\" type=\\"button\\">\\n    </div>\\n    {#if !collapsed}\\n    <p id={\\"thing\\" + id} class=\\"text-4xl font-normal collapse-anim mt-4 mb-2\\">{content}</p>\\n    <!-- add pretty images -->\\n    {#each images as image}\\n    <img src={image} alt=\\"\\" class=\\"rounded-lg\\">\\n    {/each}\\n\\n    {:else}\\n    <!-- <hr class=\\"my-8\\"> -->\\n    {/if}\\n  </div>\\n{/if}\\n\\n\\n<style>\\n  @keyframes showElement {\\n    from {\\n      opacity: 0;\\n      height: 0;\\n    }\\n    to {\\n      opacity: 1;\\n      height: 100%;\\n    }\\n  }\\n\\n img{\\n  transform: rotateX(0deg);\\n  transition: all 0.1s ease-in-out;\\n  fill: #e0fafe;\\n  stroke: #e0fafe;\\n  color: #e0fafe;\\n }\\n\\n .collapse-anim{\\n    animation: showElement cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;\\n }\\n\\n .invert-rot{\\n  transform: rotateX(180deg);\\n }\\n</style>"],"names":[],"mappings":"AA2EE,WAAW,0BAAY,CACrB,IAAK,CACH,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CACV,CACA,EAAG,CACD,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IACV,CACF,CAED,kBAAG,CACF,SAAS,CAAE,QAAQ,IAAI,CAAC,CACxB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,WAAW,CAChC,IAAI,CAAE,OAAO,CACb,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,OACR,CAEA,6BAAc,CACX,SAAS,CAAE,0BAAW,CAAC,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,QAC3D,CAEA,0BAAW,CACV,SAAS,CAAE,QAAQ,MAAM,CAC1B"}'
};
const CollapsableThingy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { content } = $$props;
  let { images = [] } = $$props;
  let { project = false } = $$props;
  const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length);
  const id = generateRandomString(6);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.images === void 0 && $$bindings.images && images !== void 0) $$bindings.images(images);
  if ($$props.project === void 0 && $$bindings.project && project !== void 0) $$bindings.project(project);
  $$result.css.add(css$2);
  return `${project ? `<div class="sm:text-4xl text-2xl text-text w-[90%] mb-40 mt-10 font-semibold"> <div class="flex flex-row justify-between items-center min-h-[1.5rem] max-h-[5rem]"><p class="mb-4">${escape(title)}</p> <img${add_attribute("src", arrowUp, 0)} alt="" srcset=""${add_attribute("id", "arrow" + id, 0)} class="mb-4 sm:mb-0 invert-rot p-8 svelte-1ymeo34" type="button"></div> ${``}</div>` : `<div class="sm:text-4xl text-2xl text-text w-[90%] mb-2 mt-10 font-semibold"> <div class="flex flex-row justify-between items-center min-h-[1.5rem] max-h-[5rem]"><p class="mb-4">${escape(title)}</p> <img${add_attribute("src", arrowUp, 0)} alt="" srcset=""${add_attribute("id", "arrow" + id, 0)} class="mb-4 sm:mb-0 invert-rot p-8 svelte-1ymeo34" type="button"></div> ${``}</div>`}`;
});
const css$1 = {
  code: "img.svelte-1l3nknl{animation:svelte-1l3nknl-fade-in ease-in-out infinite}@keyframes svelte-1l3nknl-fade-in{from{opacity:0;scale:0}50%{opacity:1;scale:1}to,80%{opacity:0;scale:0}}",
  map: '{"version":3,"file":"Star.svelte","sources":["Star.svelte"],"sourcesContent":["<script>\\n    export let image = \\"\\";\\n    export let x = 0;\\n    export let y = 0;\\n    export let rot = 0;\\n    export let animlen = 3;\\n<\/script>\\n\\n<img src={image} alt=\\"\\" class={`w-12 h-12 absolute`} style={`top: ${y}%; left: ${x}%; animation-duration: ${animlen}s; transform: rotate(${rot}deg);`}>\\n\\n<style>\\n    img {\\n        /* z-index: 1; */\\n        animation: fade-in ease-in-out infinite;\\n    }\\n    @keyframes fade-in {\\n        from {\\n            opacity: 0;\\n            scale: 0;\\n        }\\n\\n        50% {\\n            opacity: 1;\\n            scale: 1;\\n        }\\n\\n        to, 80% {\\n            opacity: 0;\\n            scale: 0;\\n        }\\n    }\\n</style>\\n"],"names":[],"mappings":"AAWI,kBAAI,CAEA,SAAS,CAAE,sBAAO,CAAC,WAAW,CAAC,QACnC,CACA,WAAW,sBAAQ,CACf,IAAK,CACD,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,CACX,CAEA,GAAI,CACA,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,CACX,CAEA,EAAE,CAAE,GAAI,CACJ,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,CACX,CACJ"}'
};
const Star = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image = "" } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let { rot = 0 } = $$props;
  let { animlen = 3 } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0) $$bindings.image(image);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0) $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0) $$bindings.y(y);
  if ($$props.rot === void 0 && $$bindings.rot && rot !== void 0) $$bindings.rot(rot);
  if ($$props.animlen === void 0 && $$bindings.animlen && animlen !== void 0) $$bindings.animlen(animlen);
  $$result.css.add(css$1);
  return `<img${add_attribute("src", image, 0)} alt="" class="${escape(null_to_empty(`w-12 h-12 absolute`), true) + " svelte-1l3nknl"}"${add_attribute("style", `top: ${y}%; left: ${x}%; animation-duration: ${animlen}s; transform: rotate(${rot}deg);`, 0)}>`;
});
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store2, i) => subscribe(
        store2,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
const store = writable({
  component: null,
  layout: [],
  page: {},
  key: null
});
const h = (component, props, children) => {
  return {
    component,
    ...props ? { props } : {},
    ...children ? { children } : {}
  };
};
const Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  let { component } = $$props;
  let { props = {} } = $$props;
  let { children = [] } = $$props;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0) $$bindings.children(children);
  $$unsubscribe_store();
  return `${$store.component ? `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {
    default: () => {
      return `${each(children, (child, index) => {
        return `${validate_component(Render, "svelte:self").$$render($$result, Object.assign({}, child), {}, {})}`;
      })}`;
    }
  })}` : ``}`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let child;
  let layout;
  let components;
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  child = $store.component && h($store.component.default, $store.page.props);
  layout = $store.component && $store.component.layout;
  components = layout ? Array.isArray(layout) ? layout.concat(child).reverse().reduce((child2, layout2) => h(layout2, $store.page.props, [child2])) : h(layout, $store.page.props, [child]) : child;
  $$unsubscribe_store();
  return `${validate_component(Render, "Render").$$render($$result, Object.assign({}, components), {}, {})}`;
});
const SSR = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id, initialPage } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.initialPage === void 0 && $$bindings.initialPage && initialPage !== void 0) $$bindings.initialPage(initialPage);
  return `<div data-server-rendered="true"${add_attribute("id", id, 0)}${add_attribute("data-page", JSON.stringify(initialPage), 0)}>${validate_component(App, "App").$$render($$result, {}, {}, {})}</div>`;
});
async function createInertiaApp({ id = "app", resolve, setup, progress = {}, page }) {
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage = page || JSON.parse(el.dataset.page);
  const resolveComponent = (name) => Promise.resolve(resolve(name));
  await resolveComponent(initialPage.component).then((initialComponent) => {
    store.set({
      component: initialComponent,
      page: initialPage
    });
  });
  if (!isServer) {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page: page2, preserveState }) => {
        store.update((current) => ({
          component,
          page: page2,
          key: preserveState ? current.key : Date.now()
        }));
      }
    });
    if (progress) {
      setupProgress(progress);
    }
    return setup({
      el,
      App,
      props: {
        initialPage,
        resolveComponent
      }
    });
  }
  if (isServer) {
    const { html, head } = SSR.render({ id, initialPage });
    return {
      body: html,
      head: [head]
    };
  }
}
derived(store, ($store) => $store.page);
const me = "/build/assets/es-Dw7IKtbF.png";
const instaClone = "/build/assets/instaclone-D7gDWD_S.png";
const go = "/build/assets/go-DH1cYRDu.png";
const raylib = "/build/assets/raylib-DJIxC82B.png";
const laravel = "/build/assets/laravel-Dzuxxbhj.png";
const vue = "/build/assets/vue-SEvxau62.png";
const svelteLogo = "/build/assets/svelte-B-38neb5.png";
const sqla = "/build/assets/sqla-2x-9A05j.png";
const flask = "/build/assets/flask-ClLd4NZj.png";
const react = "/build/assets/react-3RfWxYGv.png";
const python = "/build/assets/python-Dt3X4VJT.svg";
const tailwind = "/build/assets/tailwind-C8IuzUlg.svg";
const protobuf = "/build/assets/protobuf-BIbtIiJR.png";
const godot = "/build/assets/godot-BCiG-gvD.png";
const javascript = "/build/assets/javascript-D1F_QaA6.png";
const inertiaLogo = "/build/assets/inertia-B49GEMjm.png";
const php = "/build/assets/php-DqWFmFbC.png";
const mysql = "/build/assets/mysql-BQqVCOl5.svg";
const sqlite = "/build/assets/sqlite-BSkv2rJd.png";
const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');.svelte-x8cd4v{font-family:"Poppins", sans-serif;font-style:normal;color:"#e0fafe";box-sizing:border-box}.fancy-text.svelte-x8cd4v{position:fixed;max-width:fit-content;z-index:1}.text-outline.svelte-x8cd4v{background-clip:text;background-image:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke-color:#e0fafe;-webkit-text-stroke-width:0.1rem}.fancy-text.svelte-x8cd4v::before{content:attr(data-text);position:absolute;background-clip:text;margin-top:0.5rem;margin-left:0.5rem;background-image:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke-color:#e0fafe;-webkit-text-stroke-width:0.1rem}.sky-bg.svelte-x8cd4v{background-image:url("../assets/bg-medium.png");background-size:cover}@keyframes svelte-x8cd4v-scroll-anim{to{opacity:1}}@media(prefers-reduced-motion: no-preference){.animated.svelte-x8cd4v{opacity:0;transition:all 0.5s ease}.animate-fade-in.svelte-x8cd4v{opacity:1}}`,
  map: `{"version":3,"file":"Index.svelte","sources":["Index.svelte"],"sourcesContent":["<script defer>\\n    import { onMount } from \\"svelte\\";\\n    import axios from \\"axios\\";\\n    import ProjectCard from \\"../Components/ProjectCard.svelte\\";\\n    import CollapsableThingy from \\"../Components/CollapsableThingy.svelte\\";\\n    import Star from \\"../Components/Star.svelte\\";\\n    import Review from \\"../Components/Review.svelte\\";\\n    import ContactForm from \\"../Components/ContactForm.svelte\\";\\n    import me from \\"../assets/es.png\\"\\n    import instaClone from \\"../assets/instaclone.png\\"\\n\\n    import go from \\"../assets/go.png\\"\\n    import raylib from \\"../assets/raylib.png\\"\\n    import laravel from \\"../assets/laravel.png\\"\\n    import vue from \\"../assets/vue.png\\"\\n    import svelteLogo from \\"../assets/svelte.png\\"\\n    import sqla from \\"../assets/sqla.png\\"\\n    import flask from \\"../assets/flask.png\\"\\n    import react from \\"../assets/react.png\\"\\n    import python from \\"../assets/python.svg\\"\\n    import tailwind from \\"../assets/tailwind.svg\\"\\n    import protobuf from \\"../assets/protobuf.png\\"\\n    import godot from \\"../assets/godot.png\\"\\n    import javascript from \\"../assets/javascript.png\\"\\n    import inertiaLogo from \\"../assets/inertia.png\\"\\n    import php from \\"../assets/php.png\\"\\n    import mysql from \\"../assets/mysql.svg\\"\\n    import sqlite from \\"../assets/sqlite.png\\"\\n\\n    const stars = [\\n        go,\\n        raylib,\\n        laravel,\\n        vue,\\n        svelteLogo,\\n        sqla,\\n        flask,\\n        react,\\n        python,\\n        tailwind,\\n        protobuf,\\n        godot,\\n        javascript,\\n        inertiaLogo,\\n        php,\\n        mysql,\\n        sqlite\\n    ];\\n\\n    // const apiKey = import.meta.env.VITE_GITHUB_API_KEY;\\n\\n    function getRandIntRange(min, max) {\\n        return Math.random() * (max - min) + min;\\n    }\\n\\n    onMount(async () => {\\n        // all animated sections\\n        const observer = new IntersectionObserver((entries) => {\\n            entries.forEach((entry) => {\\n                if (entry.isIntersecting) {\\n                    // entered on screen\\n                    // console.log(document.documentElement.scrollTop / document.documentElement.scrollHeight - document.documentElement.clientHeight);\\n                    // console.log(b);\\n                    entry.target.classList.add(\\"animate-fade-in\\");\\n                } else {\\n                    // left screen\\n                    entry.target.classList.remove(\\"animate-fade-in\\");\\n\\n                }\\n            })\\n        })\\n    \\n        const animatedElements = document.querySelectorAll(\\".s-_3yNjIecwZ-L\\");\\n        animatedElements.forEach((el) => observer.observe(el));\\n\\n        // title animation\\n        const ligma = document.querySelectorAll(\\".t1\\")[0];\\n        // console.log(ligma.classList);\\n        const titleObserver = new IntersectionObserver((entries) => {\\n            entries.forEach((entry) => {\\n                if (entry.isIntersecting) {\\n                    ligma.classList.add(\\"animate-fade-in\\");\\n                    // entry.target.classList.add(\\"animate-fade-in\\");\\n                } else {\\n                    if (ligma) {\\n                        // ligma.classList.add(\\"opacity-0\\")\\n                        ligma.classList.remove(\\"animate-fade-in\\");\\n                    }\\n                    // entry.target.classList.remove(\\".animate-fade-in\\");\\n                }\\n            })\\n        })\\n    \\n        const animatedTitle = document.querySelectorAll(\\".title-animation-trigger\\");\\n        animatedTitle.forEach((el) => titleObserver.observe(el));\\n        \\n    })\\n\\n<\/script>\\n\\n<link rel=\\"stylesheet\\" href=\\"https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,400,0,0\\" />\\n\\n<main class=\\"bg-background\\">\\n\\n    <article class=\\"sky-bg min-w-screen min-h-screen flex justify-center items-center \\">\\n        <p class=\\"title-animation-trigger flex absolute top-[10%]\\" hidden></p>\\n        {#each stars as star}   \\n            <Star image={star} x={Math.floor(Math.random() * 100)} y={Math.floor(Math.random() * 100)} rot={Math.random() * 360} animlen={getRandIntRange(3, 7)}/>\\n        {/each}\\n        <p class=\\"sm:text-8xl text-5xl font-bold w-min uppercase fancy-text text-text animated t1 text-outline pointer-events-none\\">Silvestrs Lignickis</p>\\n\\n    </article>\\n\\n    <article class=\\"animated h-screen flex justify-center flex-col w-[min(64rem,100%)] mx-auto\\">\\n        <p class=\\"sm:text-6xl text-4xl font-bold text-text mb-12 ml-8 h-min\\">About Me:</p>\\n        <div class=\\"flex sm:flex-row flex-col justify-center items-center gap-12\\">\\n            <img src={me} alt=\\"\\" srcset=\\"\\" class=\\"w-1/3 max-h-max rounded-lg\\">\\n            <div class=\\"flex justify-center flex-col\\">\\n                <p class=\\"text-text text-outline font-bold uppercase sm:text-6xl text-5xl h-[0.75em]\\">Visionary</p>\\n                <p class=\\"text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[2.8rem] h-[0.75em]\\">Entrepreneur</p>\\n                <p class=\\"text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[4.8rem] h-[0.75em]\\">Backend -</p>\\n                <p class=\\"text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[7.15rem] h-[0.75em]\\">Enthusiast</p>\\n            </div>\\n        </div>\\n    </article>\\n\\n    <!-- <article class=\\"animated h-screen\\">\\n        <h1 class=\\"text-3xl font-bold text-text\\">Project list</h1>\\n    </article>\\n\\n    <article class=\\"animated h-screen\\">\\n        <h1 class=\\"text-3xl font-bold text-text\\">Skills list</h1>\\n    </article> -->\\n\\n    <article class=\\"animated h-screen w-[min(64rem,100%)] mx-auto\\">\\n        <p class=\\"sm:text-6xl text-4xl font-bold text-text mb-12 ml-8\\">Education & Certificates:</p>\\n        <div class=\\"flex flex-col items-center\\">\\n            <CollapsableThingy title=\\"Ulbrokas middleschool\\" content=\\"Primary Education - 2012-2021\\"/>\\n            <CollapsableThingy title=\\"Datorium Certificate\\" content=\\"Certificate from Datorium programming courses.\\"/>\\n            <CollapsableThingy title=\\"Cyber Security Challenge\\" content=\\"Certificate from Latvia Cyber Security Challenge.\\"/>\\n        </div>\\n    </article>\\n\\n    <article class=\\"animated h-screen w-[min(64rem,100%)] mx-auto\\">\\n        <p class=\\"sm:text-6xl text-4xl font-bold text-text mb-12 ml-8\\">My Work Experience @:</p>\\n        <div class=\\"flex flex-col items-center\\">\\n            <CollapsableThingy title=\\"SIA EMJ Metāls\\" content=\\"My job included managing the incoming and outgoing warehouse orders.\\" />\\n            <CollapsableThingy title=\\"B/N Kurši\\" content=\\"My responsibilities were restocking the shelves.\\" />\\n            <CollapsableThingy title=\\"Ulbrokas Middleschool\\" content=\\"Just cleaning in general. And various other stuff.\\" />\\n        </div>\\n    </article>\\n\\n    <article class=\\"animated h-screen w-[min(64rem,100%)] mx-auto\\">\\n        <p class=\\"sm:text-6xl text-4xl font-bold text-text mb-12 ml-8\\">My projects:</p>\\n        <div class=\\"flex flex-col items-center\\">\\n            <CollapsableThingy title=\\"InstaClone\\" content=\\"My first ever semi-serious project. Written using Python3, Flask, SQLAlchemy\\" images={[instaClone]}/>\\n            <CollapsableThingy title=\\"Spaceful\\" content=\\"A simple warehouse managing app. The technologies used are PHP, Laravel, MySQL, React\\"/>\\n            <CollapsableThingy title=\\"TicketTrade\\" content=\\"My Biggest project to date. The technologies used are PHP, Laravel, Tailwind, MySQL, GoLang\\"/>\\n            <CollapsableThingy title=\\"Memquest\\" content=\\"A web based memory game. The technologies used are PHP, Laravel, Tailwind, MySQL, Vue, Inertia, JavaScript\\"/>\\n            <CollapsableThingy title=\\"Goquic\\" content=\\"A small 2D multiplayer game. The technologies used are Go QUIC, Protobuf, Raylib\\"/>\\n            <CollapsableThingy title=\\"MinimumWage\\" content=\\"My most educational project. The technologies used are Godot Game Engine, SQLite\\" project/>\\n        </div>\\n    </article>\\n\\n    <!-- <article class=\\"animated h-screen\\">\\n        <p class=\\"sm:text-8xl text-5xl mb-12 ml-8 font-bold text-text\\">Reviews:</p>\\n    </article> -->\\n\\n    <!-- <footer class=\\"animate-fade-in h-screen\\"> -->\\n    <footer class=\\"animate-fade-in h-[0px]\\">\\n        <!-- <p class=\\"sm:text-8xl text-6xl font-bold text-text mb-12 ml-8\\">Contact Info:</p> -->\\n        <!-- <div class=\\"grid place-items-center mt-28\\"> -->\\n            <!-- <ContactForm/> -->\\n        <!-- </div> -->\\n    </footer>\\n\\n    <!-- <div>\\n        {#if loading}\\n            <div class=\\"skeleton\\">\\n            <div class=\\"skeleton-line rounded-sm\\"></div>\\n            <div class=\\"skeleton-line rounded-sm\\"></div>\\n            <div class=\\"skeleton-line rounded-sm\\"></div>\\n            </div>\\n        {:else if error}\\n            <p class=\\"text-red text-xl\\">{error}</p>\\n        {:else}\\n            <div>\\n            {#each repos as item}\\n                <ProjectCard url='repos/SilvisPilvis/{item.name}'/>\\n            {/each}\\n            </div>\\n        {/if}\\n    </div> -->\\n\\n\\n</main>\\n\\n<style>\\n    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');\\n    \\n\\n    *{\\n        font-family: \\"Poppins\\", sans-serif;\\n        font-style: normal;\\n        color: \\"#e0fafe\\";\\n        box-sizing: border-box;\\n        /* text-wrap: wrap; */\\n    }\\n\\n    /* article {\\n        width: 99vw;\\n    } */\\n\\n    .fancy-text {\\n        position: fixed;\\n        max-width: fit-content;\\n        z-index: 1;\\n\\n    }\\n\\n    .text-outline {\\n        background-clip: text;\\n        background-image: transparent;\\n        -webkit-text-fill-color: transparent;\\n        -webkit-text-stroke-color: #e0fafe;\\n        -webkit-text-stroke-width: 0.1rem;\\n    }\\n\\n    .fancy-text::before{\\n        content: attr(data-text);\\n        position: absolute;\\n        background-clip: text;\\n        margin-top: 0.5rem;\\n        margin-left: 0.5rem;\\n        /* background: transparent; */\\n        /* background-image: linear-gradient(to right, #e0fafe, #e0fafe, #e0fafe, #e0fafe); */\\n        /* background-image: url(\\"../assets/bg-medium.png\\"); */\\n        background-image: transparent;\\n        -webkit-text-fill-color: transparent;\\n        -webkit-text-stroke-color: #e0fafe;\\n        -webkit-text-stroke-width: 0.1rem;\\n\\n        /* color: \\"#e0fafe\\";\\n        -webkit-text-stroke-color: \\"#e0fafe\\";\\n        -webkit-text-fill-color: \\"#e0fafe\\";\\n        -webkit-background-clip: text;\\n        -webkit-text-stroke-width: 5px; */\\n    }\\n\\n    /* .fancy-text::before {\\n        content: attr(data-text);\\n        position: absolute;\\n        top: 5px;\\n        left: 5px;\\n        text-shadow:\\n                -1px -1px 0 cornflowerblue,\\n                1px -1px 0 cornflowerblue,\\n                -1px 1px 0 cornflowerblue,\\n                1px 1px 0 cornflowerblue;\\n        z-index: -1;\\n\\n        -webkit-text-stroke-color: \\"#e0fafe\\";\\n        -webkit-text-fill-color: \\"#e0fafe\\";\\n        -webkit-background-clip: text;\\n        -webkit-text-stroke-width: 5px;\\n        background-clip: text;\\n\\n    } */\\n\\n    .skeleton {\\n      padding: 1rem;\\n      background-color: #f5f5f5;\\n    }\\n\\n    .skeleton-line {\\n      height: 1rem;\\n      background-color: #e0e0e0;\\n      margin-bottom: 0.5rem;\\n    }\\n\\n    .sky-bg{\\n        background-image: url(\\"../assets/bg-medium.png\\");\\n        background-size: cover;\\n    }\\n\\n    @keyframes scroll-anim {\\n        to {\\n            opacity: 1;\\n        }\\n    }\\n\\n    @media (prefers-reduced-motion: no-preference) {\\n        .animated{\\n            /* animation: scroll-anim 0.5s ease-in-out;\\n            animation-timeline: scroll(); */\\n            opacity: 0;\\n            transition: all 0.5s ease;\\n        }\\n\\n        .animate-fade-in {\\n            opacity: 1;\\n            /* animation: fade-in 0.5s ease-in-out; */\\n            /* animation: fade-in 1s ease-in-out; */\\n        }\\n    }\\n\\n</style>\\n"],"names":[],"mappings":"AAsMI,QAAQ,0LAA0L,CAGlM,cAAC,CACG,WAAW,CAAE,SAAS,CAAC,CAAC,UAAU,CAClC,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,SAAS,CAChB,UAAU,CAAE,UAEhB,CAMA,yBAAY,CACR,QAAQ,CAAE,KAAK,CACf,SAAS,CAAE,WAAW,CACtB,OAAO,CAAE,CAEb,CAEA,2BAAc,CACV,eAAe,CAAE,IAAI,CACrB,gBAAgB,CAAE,WAAW,CAC7B,uBAAuB,CAAE,WAAW,CACpC,yBAAyB,CAAE,OAAO,CAClC,yBAAyB,CAAE,MAC/B,CAEA,yBAAW,QAAQ,CACf,OAAO,CAAE,KAAK,SAAS,CAAC,CACxB,QAAQ,CAAE,QAAQ,CAClB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CAInB,gBAAgB,CAAE,WAAW,CAC7B,uBAAuB,CAAE,WAAW,CACpC,yBAAyB,CAAE,OAAO,CAClC,yBAAyB,CAAE,MAO/B,CAiCA,qBAAO,CACH,gBAAgB,CAAE,8BAA8B,CAChD,eAAe,CAAE,KACrB,CAEA,WAAW,yBAAY,CACnB,EAAG,CACC,OAAO,CAAE,CACb,CACJ,CAEA,MAAO,yBAAyB,aAAa,CAAE,CAC3C,uBAAS,CAGL,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACzB,CAEA,8BAAiB,CACb,OAAO,CAAE,CAGb,CACJ"}`
};
function getRandIntRange(min, max) {
  return Math.random() * (max - min) + min;
}
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const stars = [
    go,
    raylib,
    laravel,
    vue,
    svelteLogo,
    sqla,
    flask,
    react,
    python,
    tailwind,
    protobuf,
    godot,
    javascript,
    inertiaLogo,
    php,
    mysql,
    sqlite
  ];
  $$result.css.add(css);
  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,400,0,0" class="svelte-x8cd4v"> <main class="bg-background svelte-x8cd4v"><article class="sky-bg min-w-screen min-h-screen flex justify-center items-center  svelte-x8cd4v"><p class="title-animation-trigger flex absolute top-[10%] svelte-x8cd4v" hidden></p> ${each(stars, (star) => {
    return `${validate_component(Star, "Star").$$render(
      $$result,
      {
        image: star,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        rot: Math.random() * 360,
        animlen: getRandIntRange(3, 7)
      },
      {},
      {}
    )}`;
  })} <p class="sm:text-8xl text-5xl font-bold w-min uppercase fancy-text text-text animated t1 text-outline pointer-events-none svelte-x8cd4v" data-svelte-h="svelte-17a963h">Silvestrs Lignickis</p></article> <article class="animated h-screen flex justify-center flex-col w-[min(64rem,100%)] mx-auto svelte-x8cd4v" data-svelte-h="svelte-11szmdw"><p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8 h-min svelte-x8cd4v">About Me:</p> <div class="flex sm:flex-row flex-col justify-center items-center gap-12 svelte-x8cd4v"><img${add_attribute("src", me, 0)} alt="" srcset="" class="w-1/3 max-h-max rounded-lg svelte-x8cd4v"> <div class="flex justify-center flex-col svelte-x8cd4v"><p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl h-[0.75em] svelte-x8cd4v">Visionary</p> <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[2.8rem] h-[0.75em] svelte-x8cd4v">Entrepreneur</p> <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[4.8rem] h-[0.75em] svelte-x8cd4v">Backend -</p> <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[7.15rem] h-[0.75em] svelte-x8cd4v">Enthusiast</p></div></div></article>  <article class="animated h-screen w-[min(64rem,100%)] mx-auto svelte-x8cd4v"><p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8 svelte-x8cd4v" data-svelte-h="svelte-3xp9qk">Education &amp; Certificates:</p> <div class="flex flex-col items-center svelte-x8cd4v">${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Ulbrokas middleschool",
      content: "Primary Education - 2012-2021"
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Datorium Certificate",
      content: "Certificate from Datorium programming courses."
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Cyber Security Challenge",
      content: "Certificate from Latvia Cyber Security Challenge."
    },
    {},
    {}
  )}</div></article> <article class="animated h-screen w-[min(64rem,100%)] mx-auto svelte-x8cd4v"><p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8 svelte-x8cd4v" data-svelte-h="svelte-1y01jpz">My Work Experience @:</p> <div class="flex flex-col items-center svelte-x8cd4v">${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "SIA EMJ Metāls",
      content: "My job included managing the incoming and outgoing warehouse orders."
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "B/N Kurši",
      content: "My responsibilities were restocking the shelves."
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Ulbrokas Middleschool",
      content: "Just cleaning in general. And various other stuff."
    },
    {},
    {}
  )}</div></article> <article class="animated h-screen w-[min(64rem,100%)] mx-auto svelte-x8cd4v"><p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8 svelte-x8cd4v" data-svelte-h="svelte-knc7zk">My projects:</p> <div class="flex flex-col items-center svelte-x8cd4v">${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "InstaClone",
      content: "My first ever semi-serious project. Written using Python3, Flask, SQLAlchemy",
      images: [instaClone]
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Spaceful",
      content: "A simple warehouse managing app. The technologies used are PHP, Laravel, MySQL, React"
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "TicketTrade",
      content: "My Biggest project to date. The technologies used are PHP, Laravel, Tailwind, MySQL, GoLang"
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Memquest",
      content: "A web based memory game. The technologies used are PHP, Laravel, Tailwind, MySQL, Vue, Inertia, JavaScript"
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "Goquic",
      content: "A small 2D multiplayer game. The technologies used are Go QUIC, Protobuf, Raylib"
    },
    {},
    {}
  )} ${validate_component(CollapsableThingy, "CollapsableThingy").$$render(
    $$result,
    {
      title: "MinimumWage",
      content: "My most educational project. The technologies used are Godot Game Engine, SQLite",
      project: true
    },
    {},
    {}
  )}</div></article>   <footer class="animate-fade-in h-[0px] svelte-x8cd4v" data-svelte-h="svelte-1dmtg9u">   </footer>  </main>`;
});
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Index.svelte": __vite_glob_0_0 });
      return pages[`./Pages/${name}.svelte`];
    }
  })
);
