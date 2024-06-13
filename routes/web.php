<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MailController;

Route::get('/', function () {
    return Inertia::render('Index', []);
});

Route::get('/send', [MailController::class, 'send']);