/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.svelte",
  ],
  theme: {
    extend: {},
    colors: {
      text: '#e0fafe',
      background: '#090d0e',
      primary: '#69dffc',
      secondary: '#a9032f',
      accent: '#fbb325',
      red:"#ff0000",
     },
  },
  plugins: [],
  // test
  // colors: {
  //   'text': '#eaecf2',
  //   'background': '#0e0f16',
  //   'primary': '#afb4cd',
  //   'secondary': '#63633e',
  //   'accent': '#79aa77',
  //  },
  // bussin v1
  // colors: {
  //   'text': '#d8f0f6',
  //   'background': '#090d0e',
  //   'primary': '#88cde4',
  //   'secondary': '#871e2c',
  //   'accent': '#d3af3d',
  //  },
}

