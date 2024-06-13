<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMe;

$apiKey = "d8d8c39380adfd17a3a8cc55596ca855";

class MailController extends Controller
{
    
    function send(Request $request){
        // $request->validate([
        //     'content' => 'required|min:10|string',
        //     'sender' => 'required|email|string',
        // ]);
        // dd($request->content);
        // $sender = "silvestrsl47@gmail.com";
        $sender = $request->sender;
        $content = $request->content;
        // echo $content;
        // return $content;
        // $request->sender;
        // Mail::send('welcome', [], function($message) {
        //     $message->to('silvestrsl47@gmail.com', 'To Name')->subject('Test Mail');
        // });
        // $content = "This is a test message.";
        if(Mail::to('silvestrsl47@gmail.com')->send(new ContactMe($content, $sender))) {
            // return json_encode(["success" => true]);
            return redirect('/');
        }
        
        // sleep(1);
        // return json_encode(["success" => true]);
    }
}
