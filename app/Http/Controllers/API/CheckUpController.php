<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CheckUpRecord;
use App\Models\Illness;

class CheckUpController extends Controller
{
    
    public function index($id)
    {
        $CheckUpRecord = CheckUpRecord::with(['picture'])
        ->where('patient_id', $id)->get();

        return $CheckUpRecord;
    }

    
    public function report(Request $request)
    {
        $CheckUpRecord = CheckUpRecord::
        when($request->input('date_from'), function ($query) use ($request) {
            $query->where('created_at','>=',$request->input('date_from'));
        })
        ->when($request->input('date_to'), function ($query) use ($request) {
            $query->where('created_at','<=',$request->input('date_to'));
        })
        ->with(['info' =>  function ($query){
            $query->with(['purok']);
        }])
        ->get();

        foreach($CheckUpRecord as $check){
            $check->Illness = Illness::select('id', 'name')
            ->whereIn('id', $check['illness_id'])->get();
        }

        return $CheckUpRecord;
    }

    public function store(Request $request)
    {

        $newCheckUp = new CheckUpRecord;
        $newCheckUp->patient_id = $request->patient_id;
        $newCheckUp->blood_pressure = $request->b_pressure_up.'/'.$request->b_pressure_down;
        $newCheckUp->temperature = $request->temperature;
        
        if($request->gender == 2){
            $newCheckUp->pregnant = $request->pregnant == true ? $request->pregnant : false;
            $newCheckUp->month_of_pregnancy = $request->month_of_pregnancy;
        }
       
        $newCheckUp->medicine_given = $request->medicine_given;
        $newCheckUp->illness_id = $request->illness_id;
        $newCheckUp->consultation_notes = $request->consultation_notes;
        $newCheckUp->save();

        return response()->json([
            "success"=> true,
            "data"=> $newCheckUp,
            "message"=> 'Check-up record successfully added!'
        ]);
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $editCheckup = CheckUpRecord::find($id);
        if($editCheckup){
            return response()->json([
                "success"=> true,
                "data"=> $editCheckup,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    public function update(Request $request, $id)
    {
        $updateCheckUp = CheckUpRecord::find($id);
        if($updateCheckUp){
            $updateCheckUp->patient_id = $request->patient_id;
            $updateCheckUp->blood_pressure = $request->b_pressure_up.'/'.$request->b_pressure_down;
            $updateCheckUp->temperature = $request->temperature;
            $updateCheckUp->pregnant = $request->pregnant;
            $updateCheckUp->month_of_pregnant = $request->month_of_pregnant;
            $updateCheckUp->illness_id = $request->illness_id;
            $updateCheckUp->medicine_given = $request->medicine_given;
            $updateCheckUp->consultation_notes = $request->consultation_notes;
            $updateCheckUp->save();

            return response()->json([
                "success"=> true,
                "data"=> $updateCheckUp,
                "message"=> 'Check-up record successfully updated!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    public function destroy($id)
    {
        $DeleteCheckUp = CheckUpRecord::find($id);
        if($DeleteCheckUp){
            $DeleteCheckUp->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Checkup record successfully deleted!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "message"=> 'Data not found!'
        ]);
    }
}
