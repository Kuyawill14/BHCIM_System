<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sms;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SmsController extends Controller
{
    public function index()
    {
        return Sms::with(['information'])
        ->with(['messages'])
        ->get();
    }

    public function sendSmsMessage($number, $from, $message_content)
    {
        $basic  = new \Vonage\Client\Credentials\Basic("55cf0945", "LJnDPPDYu0sYQkYa");
        $client = new \Vonage\Client($basic);

        $response = $client->sms()->send(
            new \Vonage\SMS\Message\SMS($number, $from, $message_content)
        );        
        $message = $response->current();
    }

    public function store(Request $request)
    {
       
        
        DB::beginTransaction();
        try {
           
            $id = auth("sanctum")->id();

            $number = "639852394030";
            $from = "BHW";
            $message_content = $request->message;
            //$this->sendSmsMessage($number, $from, $message_content);

            $newSms = new Sms;
            $newSms->patient_id = $request->patient_id;;
            $newSms->number = $request->number;
            $newSms->save();

            $newMessage = new Message;
            $newMessage->sms_id = $newSms->id;
            $newMessage->from = $request->sender_id;
            $newMessage->message = $request->message;
            $newMessage->save();
        
            DB::commit();
            return response()->json([
                "success"=> true,
                "message"=> 'The message was sent successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "message"=> 'Message sent failed!'
            ]);
        }
    }

    public function send(Request $request, $id)
    {   
        DB::beginTransaction();
        try {

            $number = "639852394030";
            $from = "BHW";
            $message_content = $request->message;
            //$this->sendSmsMessage($number, $from, $message_content);
    
            $newMessage = new Message;
            $newMessage->sms_id = $id;
            $newMessage->from = $request->sender_id;
            $newMessage->message = $request->message;
            $newMessage->save();

            DB::commit();
            return response()->json([
                "success"=> true,
                "data"=> $newMessage,
                "message"=> 'The message was sent successfully'
            ]);

        }catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "message"=> 'Message sent failed!'
            ]);
        }
    }

    public function show($id)
    {
        $userId = auth("sanctum")->user()->patient_id;
        $userSms = Sms::with(['information'])
        ->with(['messages'])
        ->where('patient_id', $userId)->first();

        if($userSms){
            return response()->json([
                "success"=> true,
                "data"=> $userSms,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function delete($id)
    {
        $delete = Sms::find($id);
        if($delete){
            $delete->messages()->delete();
            $delete->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'SMS successfully delete!'
            ]);
        }
    }
}
