<script>
    export let image = "";
    export let x = 0;
    export let y = 0;
    export let rot = 0;
    export let animlen = 3;
</script>

<img src={image} alt="" class={`w-12 h-12 absolute`} style={`top: ${y}%; left: ${x}%; animation-duration: ${animlen}s; transform: rotate(${rot}deg);`}>

<style>
    img {
        /* z-index: 1; */
        animation: fade-in ease-in-out infinite;
    }
    @keyframes fade-in {
        from {
            opacity: 0;
            scale: 0;
        }

        50% {
            opacity: 1;
            scale: 1;
        }

        to, 80% {
            opacity: 0;
            scale: 0;
        }
    }
</style>
