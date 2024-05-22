<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import ProjectCard from "../Components/ProjectCard.svelte";

    const apiKey = import.meta.env.VITE_GITHUB_API_KEY;

    let repos = null;
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await axios.get("https://api.github.com/users/SilvisPilvis/repos", {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "Authorization": `Bearer ${apiKey}`,
                    "X-GitHub-Api-Version": "2022-11-28"
                },
            });
            repos = response.data;
            // console.log(`Index: ${repos}`);
        } catch (err) {
            error = err.message;
            console.log(error);
        } finally {
            loading = false;
        }
	});

</script>

<main>

    <h1>Welcome to your Laravel+Inertia/SvelteKit app</h1>
    <!-- Portfolio Icon -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="SVGCleanerId_0" style="fill:#FFC36E;" d="M183.295,123.586H55.05c-6.687,0-12.801-3.778-15.791-9.76l-12.776-25.55 l12.776-25.55c2.99-5.982,9.103-9.76,15.791-9.76h128.246c6.687,0,12.801,3.778,15.791,9.76l12.775,25.55l-12.776,25.55 C196.096,119.808,189.983,123.586,183.295,123.586z"></path> <g> <path id="SVGCleanerId_0_1_" style="fill:#FFC36E;" d="M183.295,123.586H55.05c-6.687,0-12.801-3.778-15.791-9.76l-12.776-25.55 l12.776-25.55c2.99-5.982,9.103-9.76,15.791-9.76h128.246c6.687,0,12.801,3.778,15.791,9.76l12.775,25.55l-12.776,25.55 C196.096,119.808,189.983,123.586,183.295,123.586z"></path> </g> <path style="fill:#EFF2FA;" d="M485.517,70.621H26.483c-4.875,0-8.828,3.953-8.828,8.828v44.138h476.69V79.448 C494.345,74.573,490.392,70.621,485.517,70.621z"></path> <rect x="17.655" y="105.931" style="fill:#E1E6F2;" width="476.69" height="17.655"></rect> <path style="fill:#FFD782;" d="M494.345,88.276H217.318c-3.343,0-6.4,1.889-7.895,4.879l-10.336,20.671 c-2.99,5.982-9.105,9.76-15.791,9.76H55.05c-6.687,0-12.801-3.778-15.791-9.76L28.922,93.155c-1.495-2.99-4.552-4.879-7.895-4.879 h-3.372C7.904,88.276,0,96.18,0,105.931v335.448c0,9.751,7.904,17.655,17.655,17.655h476.69c9.751,0,17.655-7.904,17.655-17.655 V105.931C512,96.18,504.096,88.276,494.345,88.276z"></path> <path style="fill:#FFC36E;" d="M485.517,441.379H26.483c-4.875,0-8.828-3.953-8.828-8.828l0,0c0-4.875,3.953-8.828,8.828-8.828 h459.034c4.875,0,8.828,3.953,8.828,8.828l0,0C494.345,437.427,490.392,441.379,485.517,441.379z"></path> <path style="fill:#EFF2FA;" d="M326.621,220.69h132.414c4.875,0,8.828-3.953,8.828-8.828v-70.621c0-4.875-3.953-8.828-8.828-8.828 H326.621c-4.875,0-8.828,3.953-8.828,8.828v70.621C317.793,216.737,321.746,220.69,326.621,220.69z"></path> <path style="fill:#C7CFE2;" d="M441.379,167.724h-97.103c-4.875,0-8.828-3.953-8.828-8.828l0,0c0-4.875,3.953-8.828,8.828-8.828 h97.103c4.875,0,8.828,3.953,8.828,8.828l0,0C450.207,163.772,446.254,167.724,441.379,167.724z"></path> <path style="fill:#D7DEED;" d="M441.379,203.034h-97.103c-4.875,0-8.828-3.953-8.828-8.828l0,0c0-4.875,3.953-8.828,8.828-8.828 h97.103c4.875,0,8.828,3.953,8.828,8.828l0,0C450.207,199.082,446.254,203.034,441.379,203.034z"></path> </g>
    </svg>

    <article>
        <h1 class="text-3xl font-bold">Personal Info</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold">Project list</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold">Skills list</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold">Education & Certificates</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold">Work Experience</h1>
    </article>

    <article>
        <h1 class="text-3xl font-bold">Reviews</h1>
    </article>

    <article class="prose lg:prose-xl bg-emerald-500">
    I'd just like to interject for a moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.

    Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.

    There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!
    </article>

    <footer>
        <h1 class="text-3xl font-bold">Contact Info</h1>
    </footer>

    <div>
        <!-- Display a skeleton while getting all repos -->
        <!-- Project Card Component -->
        <!-- <ProjectCard url='users/SilvisPilvis/repos'/> -->
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
                <!-- <ProjectCard url='repos/SilvisPilvis/Classes'/> -->
                <!-- <div>{item.name}</div> -->
            {/each}
            </div>
        {/if}
    </div>


</main>

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
</style>