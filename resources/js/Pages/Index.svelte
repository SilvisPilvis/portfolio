<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import ProjectCard from "../Components/ProjectCard.svelte";

    const apiKey = import.meta.env.VITE_GITHUB_API_KEY;

    // let repos = null;
    // let loading = true;
    // let error = null;

    // onMount(async () => {
    //     try {
    //         const response = await axios.get("https://api.github.com/users/SilvisPilvis/repos", {
    //             headers: {
    //                 "Accept": "application/vnd.github.v3+json",
    //                 "Authorization": `Bearer ${apiKey}`,
    //                 "X-GitHub-Api-Version": "2022-11-28"
    //             },
    //         });
    //         repos = response.data;
    //         // console.log(`Index: ${repos}`);
    //     } catch (err) {
    //         error = err.message;
    //         console.log(error);
    //     } finally {
    //         loading = false;
    //     }
	// });

</script>

<main class="bg-background">

    <article class="sky-bg min-w-screen min-h-screen flex justify-center items-center">
        <!-- <div class="absolute -top-20 -left-20 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900"></div> -->
        <p class="text-8xl font-bold text-text w-fit uppercase fancy-text" data-text="Welcome to my portfolio">Welcome to my portfolio</p>
    </article>

    <h1 class="text-3xl font-bold text-text">Welcome to your Laravel+Inertia/SvelteKit app</h1>
    <p>Long paragraph text-balance or pretty.</p>

    <article>
        <h1 class="text-3xl font-bold text-text">Personal Info</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold text-text">Project list</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold text-text">Skills list</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold text-text">Education & Certificates</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold text-text">Work Experience</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold text-text">Reviews</h1>
    </article>

    <article class="prose lg:prose-xl bg-emerald-500 text-text">
    I'd just like to interject for a moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.

    Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.

    There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!
    </article>

    <footer>
        <h1 class="text-3xl font-bold text-text">Contact Info</h1>
    </footer>

    <!-- <div>
        {#if loading}
            <div class="skeleton">
            <div class="skeleton-line rounded-sm"></div>
            <div class="skeleton-line rounded-sm"></div>
            <div class="skeleton-line rounded-sm"></div>
            </div>
        {:else if error}
            <p class="text-red text-xl">{error}</p>
        {:else}
            <div>
            {#each repos as item}
                <ProjectCard url='repos/SilvisPilvis/{item.name}'/>
            {/each}
            </div>
        {/if}
    </div> -->


</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    *{
        font-family: "Poppins", sans-serif;
        font-style: normal;
        color: "#e0fafe";
    }

    .fancy-text {
        position: relative;
    }

    .fancy-text::after {
        content: attr(data-text);
        /* content:initial; */
        position: absolute;
        /* top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); */
        /* color: inherit; */
        color: transparent;
        /* stroke: inherit; */
        /* text-shadow: 0 0 10px currentColor; */
    }

    .fancy-text::before {
    content: attr(data-text);
    /* content:initial; */
    /* color: transparent; */
    position: absolute;
    top: 10px;
    left: 1px;
    /* left: 3px; */
    /* transform: translate(-50%, -50%); */
    /* outline: inherit; */
    /* color: currentColor; */
    /* text-shadow: 0 0 0px rgba(224,250,254, 0.5); */
    text-shadow: 0 0 0px inherit;
    opacity: 0.3;
    }

    .skeleton {
      padding: 1rem;
      background-color: #f5f5f5;
    }

    .skeleton-line {
      height: 1rem;
      background-color: #e0e0e0;
      margin-bottom: 0.5rem;
    }

    .sky-bg{
        background-image: url("../assets/bg-medium.png");
        background-size: cover;
    }
</style>
