<script defer>
    import { onMount } from "svelte";
    import axios from "axios";
    import ProjectCard from "../Components/ProjectCard.svelte";
    import me from "../assets/es.png"

    const apiKey = import.meta.env.VITE_GITHUB_API_KEY;

    onMount(async () => {
        // all animated sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // entered on screen
                    // console.log(document.documentElement.scrollTop / document.documentElement.scrollHeight - document.documentElement.clientHeight);
                    // console.log(b);
                    entry.target.classList.add("animate-fade-in");
                } else {
                    // left screen
                    entry.target.classList.remove("animate-fade-in");

                }
            })
        })
    
        const animatedElements = document.querySelectorAll(".s-_3yNjIecwZ-L");
        animatedElements.forEach((el) => observer.observe(el));

        // title animation
        const ligma = document.querySelectorAll(".t1")[0];
        // console.log(ligma.classList);
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    ligma.classList.add("animate-fade-in");
                    // entry.target.classList.add("animate-fade-in");
                } else {
                    if (ligma) {
                        // ligma.classList.add("opacity-0")
                        ligma.classList.remove("animate-fade-in");
                    }
                    // entry.target.classList.remove(".animate-fade-in");
                }
            })
        })
    
        const animatedTitle = document.querySelectorAll(".title-animation-trigger");
        animatedTitle.forEach((el) => titleObserver.observe(el));
        
    })

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

    <article class="sky-bg min-w-screen min-h-screen flex justify-center items-center ">
        <p class="title-animation-trigger flex absolute top-[10%]" hidden></p>
        <!-- <div class="absolute -top-20 -left-20 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900"></div> -->
        <!-- <p class="text-8xl font-bold w-fit uppercase fancy-text text-text animated t1" data-text="Welcome to my portfolio">Welcome to my portfolio</p> -->
        <p class="text-[7rem] font-bold w-[50%] uppercase fancy-text text-text animated t1 text-outline">Welcome to my portfolio</p>
        <!-- <p class="text-8xl font-bold w-fit uppercase fancy-bg">Welcome to my portfolio</p> -->
    </article>

    <article class="animated h-screen flex justify-center flex-col">
        <p class="text-8xl font-bold text-text uppercase mb-12 ml-8 h-min">About Me:</p>
        <div class="flex flex-row justify-center items-center gap-12">
            <img src={me} alt="" srcset="" class="w-1/3 max-h-max rounded-lg">
            <div class="flex justify-center flex-col">
                <p class="text-text text-outline font-bold uppercase text-[5rem] h-[0.75em]">Visionary</p>
                <p class="text-text text-outline font-bold uppercase text-[5rem] ml-[3.8rem] h-[0.75em]">Entrepreneur</p>
                <p class="text-text text-outline font-bold uppercase text-[5rem] ml-[6.6rem] h-[0.75em]">Backend -</p>
                <p class="text-text text-outline font-bold uppercase text-[5rem] ml-[9.7rem] h-[0.75em]">Enthusiast</p>
            </div>
        </div>
    </article>

    <!-- <article class="animated h-screen">
        <h1 class="text-3xl font-bold text-text">Project list</h1>
    </article>

    <article class="animated h-screen">
        <h1 class="text-3xl font-bold text-text">Skills list</h1>
    </article> -->

    <article class="animated h-screen">
        <h1 class="text-8xl font-bold text-text">Education & Certificates:</h1>
    </article>

    <article class="animated h-screen">
        <h1 class="text-8xl font-bold text-text">Work Experience:</h1>
    </article>

    <article class="animated h-screen">
        <h1 class="text-8xl font-bold text-text">Reviews:</h1>
    </article>

    <footer class="animate-fade-in h-screen">
        <h1 class="text-8xl font-bold text-text">Contact Info:</h1>
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
        box-sizing: border-box;
        /* text-wrap: wrap; */
    }

    .fancy-text {
        /* position: relative; */
        position: fixed;
        /* color: "#e0fafe"; */
        max-width: fit-content;
        /* text-wrap: none; */
        z-index: 1;
        /* text-wrap: nowrap; */

        /* -webkit-text-stroke-color: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text; */
    }

    .text-outline {
        background-clip: text;
        background-image: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke-color: #e0fafe;
        -webkit-text-stroke-width: 0.1rem;
    }

    .fancy-text::before{
        content: attr(data-text);
        position: absolute;
        background-clip: text;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        /* background: transparent; */
        /* background-image: linear-gradient(to right, #e0fafe, #e0fafe, #e0fafe, #e0fafe); */
        /* background-image: url("../assets/bg-medium.png"); */
        background-image: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke-color: #e0fafe;
        -webkit-text-stroke-width: 0.1rem;

        /* color: "#e0fafe";
        -webkit-text-stroke-color: "#e0fafe";
        -webkit-text-fill-color: "#e0fafe";
        -webkit-background-clip: text;
        -webkit-text-stroke-width: 5px; */
    }

    /* .fancy-text::before {
        content: attr(data-text);
        position: absolute;
        top: 5px;
        left: 5px;
        text-shadow:
                -1px -1px 0 cornflowerblue,
                1px -1px 0 cornflowerblue,
                -1px 1px 0 cornflowerblue,
                1px 1px 0 cornflowerblue;
        z-index: -1;

        -webkit-text-stroke-color: "#e0fafe";
        -webkit-text-fill-color: "#e0fafe";
        -webkit-background-clip: text;
        -webkit-text-stroke-width: 5px;
        background-clip: text;

    } */

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

    @media (prefers-reduced-motion: no-preference) {
        .animated{
            opacity: 0;
            /* transition: all 1s; */
            transition: all 0.4s ease;
        }

        .animate-fade-in {
            opacity: 1;
            /* animation: fade-in 0.5s ease-in-out; */
            /* animation: fade-in 1s ease-in-out; */
        }
    }

</style>
