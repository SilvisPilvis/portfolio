<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MailController;

Route::get('/', function () {
    return Inertia::render('Index', [
        'csrf_token' => csrf_token(),
    ]);
});

Route::post('/send', [MailController::class, 'send']);