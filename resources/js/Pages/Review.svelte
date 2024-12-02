<script>
    export let review;
</script>

<article class="text-text">
{#if review}
{review}
{/if}
</article>

<style>
    article {
        padding: 1rem 2rem 1rem 2rem;
        background-color: #05c5b580;
        /* width: 99vw; */
    }
</style>