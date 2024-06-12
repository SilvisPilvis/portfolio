<script>
  export let title;
  export let content;
  let collapsed = false;
  import arrowUp from "../assets/arrow-up.svg";
</script>

<div class="text-8xl font-bold text-text w-[90%]">
  <div class="flex flex-row justify-between items-center">
    <p class="ml-8">{title}</p>
    <img src={arrowUp} alt="" srcset="">
  </div>
  <hr class="my-8">
  {#if collapsed}
  <p>
    {content}
  </p>
  {:else}
  <hr class="my-8">
  {/if}
  <!-- <p class="flex justify-center">{title}</p> -->
</div>

<style>
 img{
  width: 10rem;
  height: 10rem;
  fill: #e0fafe;
  stroke: #e0fafe;
  color: #e0fafe;
 }
</style>