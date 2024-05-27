<script>
    import axios from "../Axios.js";
    // export let url: string;
    export let url;

    let data = null;
    let loading = true;
    let error = null;

    const getRepo = async () => {
        try {
            const response = await axios.get(url);
            data = response.data;
            console.log(`ProjectCard: ${JSON.stringify(data)}`);
        } catch (err) {
            error = err.message;
            console.log(error);
        } finally {
            loading = false;
        }
    }

    getRepo();
    
</script>

{#if loading}
<div class="skeleton flex flex-row">
    <div class="w-24 h-24 skeleton-color rounded-md"></div>
    <div class="flex flex-col w-full skeleton">
        <div class="skeleton-line rounded-md w-full"></div>
        <div class="skeleton-line rounded-md w-full"></div>
        <div class="skeleton-line rounded-md w-full"></div>
    </div>
</div>
{:else if error}
  <p class="text-red text-xl">{error}</p>
{:else}
    <div class="flex flex-row bg-sky-800 min-w-16 max-w-[35%] min-h-80 rounded-md">
        <div class="flex flex-row justify-center items-end gap-2 bg-secondary rounded-md">
            <img src="{data.owner.avatar_url}" alt="" class="w-20 h-20 rounded-md">
            <p class="text-text">{data.owner.login}</p>
            <a class="text-text" href="{data.html_url}">{data.name}</a>
        </div>
    </div>
    <!-- <div class="skeleton flex flex-row">
        <div class="w-24 h-24 skeleton-color rounded-sm"></div>
        <div class="flex flex-col w-full skeleton">
            <div class="skeleton-line rounded-sm w-full"></div>
            <div class="skeleton-line rounded-sm w-full"></div>
            <div class="skeleton-line rounded-sm w-full"></div>
        </div>
    </div> -->
{/if}

<style>
    .skeleton {
        padding: 1rem;
        background-color: #f5f5f5;
    }
  
    .skeleton-line {
        height: 1rem;
        background-color: #e0e0e0;
        margin-bottom: 0.5rem;
    }

    .skeleton-color {
        background-color: #e0e0e0;
        margin-bottom: 0.5rem;
    }
</style>