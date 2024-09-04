<script defer>
    import { onMount } from "svelte";
    import axios from "axios";
    import ProjectCard from "../Components/ProjectCard.svelte";
    import CollapsableThingy from "../Components/CollapsableThingy.svelte";
    import Star from "../Components/Star.svelte";
    import Review from "../Components/Review.svelte";
    import ContactForm from "../Components/ContactForm.svelte";
    import me from "../assets/es.png"
    import instaClone from "../assets/instaclone.png"
    import go from "../assets/go.png"

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

</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,400,0,0" />

<main class="bg-background">

    <article class="sky-bg min-w-screen min-h-screen flex justify-center items-center ">
        <p class="title-animation-trigger flex absolute top-[10%]" hidden></p>
        <Star image={go} x="10" y="10" rot="10" animlen="5"/>
        <p class="sm:text-8xl text-5xl font-bold w-min uppercase fancy-text text-text animated t1 text-outline pointer-events-none">Silvestrs Lignickis</p>

    </article>

    <article class="animated h-screen flex justify-center flex-col w-[min(64rem,100%)] mx-auto">
        <p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8 h-min">About Me:</p>
        <div class="flex sm:flex-row flex-col justify-center items-center gap-12">
            <img src={me} alt="" srcset="" class="w-1/3 max-h-max rounded-lg">
            <div class="flex justify-center flex-col">
                <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl h-[0.75em]">Visionary</p>
                <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[2.8rem] h-[0.75em]">Entrepreneur</p>
                <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[4.8rem] h-[0.75em]">Backend -</p>
                <p class="text-text text-outline font-bold uppercase sm:text-6xl text-5xl ml-[7.15rem] h-[0.75em]">Enthusiast</p>
            </div>
        </div>
    </article>

    <!-- <article class="animated h-screen">
        <h1 class="text-3xl font-bold text-text">Project list</h1>
    </article>

    <article class="animated h-screen">
        <h1 class="text-3xl font-bold text-text">Skills list</h1>
    </article> -->

    <article class="animated h-screen w-[min(64rem,100%)] mx-auto">
        <p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8">Education & Certificates:</p>
        <div class="flex flex-col items-center">
            <CollapsableThingy title="Ulbrokas middleschool" content="Primary Education - 2012-2021"/>
            <CollapsableThingy title="Datorium Certificate" content="Certificate from Datorium programming courses."/>
            <CollapsableThingy title="Cyber Security Challenge" content="Certificate from Latvia Cyber Security Challenge."/>
        </div>
    </article>

    <article class="animated h-screen w-[min(64rem,100%)] mx-auto">
        <p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8">My Work Experience @:</p>
        <div class="flex flex-col items-center">
            <CollapsableThingy title="SIA EMJ Metāls" content="My job included managing the incoming and outgoing warehouse orders." />
            <CollapsableThingy title="B/N Kurši" content="My responsibilities were restocking the shelves." />
            <CollapsableThingy title="Ulbrokas Middleschool" content="Just cleaning in general. And various other stuff." />
        </div>
    </article>

    <article class="animated h-screen w-[min(64rem,100%)] mx-auto">
        <p class="sm:text-6xl text-4xl font-bold text-text mb-12 ml-8">My projects:</p>
        <div class="flex flex-col items-center">
            <CollapsableThingy title="InstaClone" content="My first ever semi-serious project. Written using Python3, Flask, SQLAlchemy" images={[instaClone]}/>
            <CollapsableThingy title="Spaceful" content="A simple warehouse managing app. The technologies used are PHP, Laravel, MySQL, React"/>
            <CollapsableThingy title="TicketTrade" content="My Biggest project to date. The technologies used are PHP, Laravel, Tailwind, MySQL, GoLang"/>
            <CollapsableThingy title="Memquest" content="A web based memory game. The technologies used are PHP, Laravel, Tailwind, MySQL, Vue, Inertia, JavaScript"/>
            <CollapsableThingy title="Goquic" content="A small 2D multiplayer game. The technologies used are Go QUIC, Protobuf, Raylib"/>
            <CollapsableThingy title="MinimumWage" content="My most educational project. The technologies used are Godot Game Engine, SQLite" project/>
        </div>
    </article>

    <!-- <article class="animated h-screen">
        <p class="sm:text-8xl text-5xl mb-12 ml-8 font-bold text-text">Reviews:</p>
    </article> -->

    <!-- <footer class="animate-fade-in h-screen"> -->
    <footer class="animate-fade-in h-[0px]">
        <!-- <p class="sm:text-8xl text-6xl font-bold text-text mb-12 ml-8">Contact Info:</p> -->
        <!-- <div class="grid place-items-center mt-28"> -->
            <!-- <ContactForm/> -->
        <!-- </div> -->
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

    /* article {
        width: 99vw;
    } */

    .fancy-text {
        position: fixed;
        max-width: fit-content;
        z-index: 1;

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

    @keyframes scroll-anim {
        to {
            opacity: 1;
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        .animated{
            /* animation: scroll-anim 0.5s ease-in-out;
            animation-timeline: scroll(); */
            opacity: 0;
            transition: all 0.5s ease;
        }

        .animate-fade-in {
            opacity: 1;
            /* animation: fade-in 0.5s ease-in-out; */
            /* animation: fade-in 1s ease-in-out; */
        }
    }

</style>
