<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sms;
use App\Models\Message;
use App\Models\PatientInformation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SmsController extends Controller
{
    public function index()
    {
        return Sms::with(['information' => function ($q) {
            $q->with(['account' => function ($qq) {
                $qq->select('patient_id', 'picture');
            }]);
        }])
        ->with(['messages'])
        ->orderby('created_at', 'DESC')
        ->get();
    }

    public function sendToAll($number, $from, $message_content)
    {
        $allPatient = PatientInformation::get();
        foreach($allPatient as $p) {
            if($p->cell_number) {
                $tmp_number = substr($p->cell_number, 1);
                $phone_number = '63'.$tmp_number;
                $this->sendSmsMessage($phone_number, $from, $message_content);
            }
        }
    }

    public function convertPhoneNumber($number)
    {
        $prefix = "63";
        $formattedNumber = "";

        $number = ltrim($number, '0');

        if (substr($number, 0, 2) === "63") {
            $formattedNumber = $number;
        } else {
            $formattedNumber = $prefix . $number;
        }

        return $formattedNumber;
    }


    public function sendSmsMessage($number, $from, $message_content)
    {
        $key = env('VONAGE_API_KEY');
        $secret = env('VONAGE_API_SECRET');

        $basic  = new \Vonage\Client\Credentials\Basic($key, $secret);
        $client = new \Vonage\Client($basic);
        $client_number =  $this->convertPhoneNumber($number);
        $response = $client->sms()->send(
            new \Vonage\SMS\Message\SMS($client_number, $from, $message_content)
        );
        $message = $response->current();

        return $message;
    }

    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            $id = auth("sanctum")->id();
            $from = "BHW";
            if($request->patient_id == 'all') {
                $this->sendToAll($request->number, $from, $request->message);
            } else {
                $this->sendSmsMessage($request->number, $from, $request->message);
            }

            $newSms = new Sms();
            $newSms->patient_id = $request->patient_id == 'all' ? 0 : $request->patient_id;
            $newSms->number = $request->number;
            $newSms->save();

            $newMessage = new Message();
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
            $checkSMS = Sms::find($id);
            $from = "BHW";
            if($checkSMS->patient_id == 0) {
                $this->sendToAll($request->number, $from, $request->message);
            } else {
                $this->sendSmsMessage($request->number, $from, $request->message);
            }

            $newMessage = new Message();
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

        } catch (\Exception $e) {
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

        if($userSms) {
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
        if($delete) {
            $delete->messages()->delete();
            $delete->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'SMS successfully delete!'
            ]);
        }
    }
}
