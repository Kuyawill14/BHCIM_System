<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CheckUpRecord;
use App\Models\Illness;
use App\Models\Medicine;
use App\Models\HealthInformation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CheckUpController extends Controller
{
    
    public function index($id)
    {
        $CheckUpRecord = CheckUpRecord::with(['info'])
        ->where('patient_id', $id)
        ->orderBy('created_at', 'DESC')
        ->get();

        foreach($CheckUpRecord as $check){
            if(isset($check['illness_id'])){
                $check->Illness = Illness::select('id', 'name')
                ->whereIn('id', $check['illness_id'])->get();
            }

            if(isset($check['medicine_given'])){
                $check->medicine = Medicine::select('name')
                ->whereIn('id', $check->medicine_given)->get();
            }
        }

        return $CheckUpRecord;
    }

    
    public function report(Request $request)
    {
        $CheckUpRecord = CheckUpRecord::
        when($request->input('date_from'), function ($query) use ($request) {
            $query->whereDate('created_at','>=',$request->input('date_from'));
        })
        ->when($request->input('date_to'), function ($query) use ($request) {
            $query->whereDate('created_at','<=', $request->input('date_to'));
        })
        ->with(['info' =>  function ($query){
            $query->with(['purok']);
        }])
        ->wherehas('info')
        ->get();

        foreach($CheckUpRecord as $check){
            $check->Illness = Illness::select('id', 'name')
            ->whereIn('id', $check['illness_id'])->get();

            $check->medicine = Medicine::select('id', 'name')
            ->whereIn('id', $check['medicine_given'])->get();
        }

        return $CheckUpRecord;
    }

    public function store(Request $request)
    {

        DB::beginTransaction();
        try {

            $newCheckUp = new CheckUpRecord;
            $newCheckUp->patient_id = $request->patient_id;
            $newCheckUp->blood_pressure = $request->b_pressure_up.'/'.$request->b_pressure_down;
            $newCheckUp->temperature = $request->temperature;
            
            if($request->gender == 2){
                $newCheckUp->pregnant = $request->pregnant == true ? 1 : 0;
                if($request->pregnant == true){
                    $newCheckUp->last_mensturation = $request->last_mensturation;
                    $newCheckUp->month_of_pregnancy = $request->month_of_pregnancy;
                }
            }
           
            $newCheckUp->medicine_given = $request->medicine_given;
            $newCheckUp->illness_id = $request->illness_id;
            $newCheckUp->consultation_notes = $request->consultation_notes;
            $newCheckUp->height = $request->height;
            $newCheckUp->weight = $request->weight;
            $newCheckUp->save();

            $healthRecord = HealthInformation::find($request->health_record_id);
            if($healthRecord){
                $healthRecord->hepa_b = $request->hepa_b;
                $healthRecord->bcg = $request->bcg;
                $healthRecord->dptv = $request->dptv;
                $healthRecord->opv = $request->opv;
                $healthRecord->mv = $request->mv;
                $healthRecord->save();
            }
            

            DB::commit();
            return response()->json([
                "success"=> true,
                "data"=> $newCheckUp,
                "message"=> 'Check-up record successfully added!'
            ]);
           
        }catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "message"=> 'Adding check-up record failed!'
            ]);
        }
       
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $editCheckup = CheckUpRecord::with(['info'])->find($id);
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

        DB::beginTransaction();
        try {
            $updateCheckUp = CheckUpRecord::find($id);
            if($updateCheckUp){
                $updateCheckUp->blood_pressure = $request->b_pressure_up.'/'.$request->b_pressure_down;
                $updateCheckUp->temperature = $request->temperature;

                if($request->gender == 2){
                    $updateCheckUp->pregnant = $request->pregnant == true ? 1 : 0;
                    if($request->pregnant == true){
                        $updateCheckUp->last_mensturation = $request->last_mensturation;
                        $updateCheckUp->month_of_pregnancy = $request->month_of_pregnancy;
                    }
                }
                $updateCheckUp->illness_id = $request->illness_id;
                $updateCheckUp->medicine_given = $request->medicine_given;
                $updateCheckUp->consultation_notes = $request->consultation_notes;
                $updateCheckUp->height = $request->height;
                $updateCheckUp->weight = $request->weight;
                $updateCheckUp->save();

                $healthRecord = HealthInformation::find($request->health_record_id);
                if($healthRecord){
                    $healthRecord->hepa_b = $request->hepa_b;
                    $healthRecord->bcg = $request->bcg;
                    $healthRecord->dptv = $request->dptv;
                    $healthRecord->opv = $request->opv;
                    $healthRecord->mv = $request->mv;
                    $healthRecord->save();
                }

                DB::commit();
                return response()->json([
                    "success"=> true,
                    "data"=> $updateCheckUp,
                    "message"=> 'Check-up record successfully updated!'
                ]);
            }

        }catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "data"=> [],
                "message"=> 'Updating check-up record failed!'
            ]);
        }
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
