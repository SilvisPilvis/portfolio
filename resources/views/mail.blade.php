<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    

    *{
        font-family: "Poppins", sans-serif;
        font-style: normal;
        color: "#e0fafe";
        box-sizing: border-box;
    }
</style>

<p>
    {{ $content }}
</p>

<footer>
    Contact Me at {{ $sender }}
    Sent via {{ config('app.name') }}
    Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
</footer>