<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Services;
use App\Models\PatientInformation;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Services::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function active_events()
    {
        $active_events = Services::where('active', 1)->get();
        return $active_events;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newService = new Services;
        $newService->name = $request->name;
        $newService->description =$request->description;
        $newService->date = $request->date;
        $newService->save();

        if(!$newService){
            return response()->json([
                "success"=> false,
                "data"=> [],
                "message"=> 'Adding service unsuccessfully!'
            ]);
        }

        return response()->json([
            "success"=> true,
            "data"=> $newService,
            "message"=> 'New service successfully added!'
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $editService = Services::find($id);
        if($editService){
            return response()->json([
                "success"=> true,
                "data"=> $editService,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $updateService = Services::find($id);
        if($updateService){
            $updateService->name = $request->name;
            $updateService->description = $request->description;
            $updateService->date = $request->date;
            $updateService->save();

            return response()->json([
                "success"=> true,
                "data"=> $updateService,
                "message"=> 'Service successfully updated!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $DeleteService = Services::find($id);
        if($DeleteService){
            $DeleteService->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Service successfully deleted!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "message"=> 'Data not found!'
        ]);
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function activate(Request $request, $id)
    {
        $Service = Services::find($id);
        if($Service){
            $Service->active = $request->active;
            $Service->save();
            $message = $request->active ? 'activate' : 'deactivated';
            return response()->json([
                "success"=> true,
                "data"=> $Service,
                "message"=> 'Event successfully '.$message,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }
    
     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function send_notification(Request $request, $id)
    {
        $Service = Services::find($id);
        return response()->json([
            "success"=> true,
            "data"=> $Service,
            "message"=> 'Message notification sent to all patient!',
        ]);

        if($Service){
            $Service->active = $request->active;
            $Service->save();
            $message = $request->active ? 'activate' : 'deactivated';

            $allPatient = PatientInformation::all();
            $from = 'Suerte Healt Center';
            foreach($allPatient as $patient){
               // $this->sendSmsMessage($patient->number,  $from, $Service->description);
            }
           
        }   

       

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
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

}
