<script>
    import { page } from "@inertiajs/svelte";
    // console.log($page.props);
// import axios from "axios";
// let content;

// const sendEmail = async () => {
//   try {
//     const response = await axios.get("/send", {
//         data: {
//             content: content,
//         }
//     });
//   } catch (error) {
//     // Handle error
//     console.error(error);
//   }
// };
</script>
<form action="/send" method="post" class="gap-4 items-start w-full grid place-items-center">
    <!-- @csrf -->
    <input type="hidden" name="_token" bind:value={$page.props.csrf_token}>
    <label class="flex flex-col text-text sm:text-2xl text-2xl font-bold">
        Your Email:
        <input name="sender" type="text" class="cursor-text text-text sm:text-2xl text-2xl">
    </label>
     <label class="flex flex-col text-text sm:text-2xl text-2xl font-bold">
         Write a message for me:
         <textarea name="content" id="" class="cursor-text text-text sm:text-2xl text-2xl"></textarea>
     </label>
    <button class="text-text text-3xl font-bold cursor-pointer">Contact Me</button>
</form>

<style>
    input, textarea, button {
        background-image: url("../assets/bg-medium.png");
        background-size: cover;
        box-shadow: 0px 0px 4px rgba(179, 206, 209, 0.5);
        border-radius: 0.3rem;
        width: 80vw;
        font-weight: 600;
    }
    input, button{
        height: 4rem;
    }
    input {
        border: none;
        padding: 1rem 2rem 1rem 2rem;
    }
    textarea{
        resize: none;
        height: 25rem;
    }
    button{
        padding: 1rem 2rem 1rem 2rem;
    }
</style>