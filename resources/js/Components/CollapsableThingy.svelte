<script defer>
  import { onMount } from "svelte";
  export let title;
  export let content;
  let collapsed = true;
  import arrowUp from "../assets/arrow-up.svg";

  const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)
  const id = generateRandomString(6)
  // console.log(id);
function toggle(ct, ca) {
  // console.log(ct);
  if (!collapsed) {

    ct.classList.add("collapse-anim");
    // ct.classList.add("visible");
    ca.classList.remove("invert-rot");
    } else {
      ct.classList.remove("collapse-anim");
      // ct.classList.remove("visible");
      ca.classList.add("invert-rot");
  }
  collapsed = !collapsed
}

function toggleBool(){
  collapsed = !collapsed;
  if(!collapsed){
    document.querySelector(`#arrow${id}`).classList.remove("invert-rot");
  } else {
    document.querySelector(`#arrow${id}`).classList.add("invert-rot");
  }
}
</script>

<div class="sm:text-6xl text-2xl font-bold text-text w-[90%]">
  <div class="flex flex-row justify-between items-center min-h-[1.5rem] max-h-[5rem]">
    <p class="mb-4">{title}</p>
    <img src={arrowUp} alt="" srcset="" id={"arrow" + id} on:click={toggleBool} class="mb-4 sm:mb-0 invert-rot sm:w-40 sm:h-40 w-12 h-12" type="button">
  </div>
  <!-- <hr class="my-8">
  <p id={"thing" + id} class="text-4xl font-normal collapse-anim">{content}</p>
  <hr class="my-8"> -->
  {#if !collapsed}
  <p id={"thing" + id} class="text-4xl font-normal collapse-anim mb-4">{content}</p>
  <!-- <p id={"thing" + id} class="text-4xl font-normal collapse-anim">{content}</p> -->
  <!-- <hr class="my-8"> -->
  {:else}
  <!-- <hr class="my-8"> -->
  {/if}
</div>

<style>
  @keyframes showElement {
    from {
      opacity: 0;
      height: 0;
    }
    to {
      opacity: 1;
      height: 100%;
    }
  }

 img{
  transform: rotateX(0deg);
  transition: all 0.1s ease-in-out;
  fill: #e0fafe;
  stroke: #e0fafe;
  color: #e0fafe;
 }

 .collapse-anim{
    animation: showElement cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
 }

 .invert-rot{
  transform: rotateX(180deg);
 }
</style>