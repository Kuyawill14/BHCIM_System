<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientInformation;
use App\Models\HealthInformation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PatientInformationController extends Controller
{
    public function index(){
        return PatientInformation::with(['purok'])
        ->with(['healthRecord'])
        ->get();
    }

    public function store(Request $request){

        DB::beginTransaction();
        try {

            $newPatient = new PatientInformation;
            $newPatient->l_name = $request->l_name;
            $newPatient->f_name = $request->f_name;
            $newPatient->m_name = $request->m_name;
            $newPatient->name_ext = $request->name_ext;
            $newPatient->gender = $request->gender;
            $newPatient->status = $request->status;
            $newPatient->b_date = $request->b_date;
            $newPatient->age = $request->age;
            $newPatient->b_place = $request->b_place;
            $newPatient->occupation = $request->occupation;
            $newPatient->cell_number = $request->cell_number;
            $newPatient->purok_id = $request->purok_id;
            $newPatient->guardian = $request->guardian;
            $newPatient->save();

            $newHealthRecord = new HealthInformation;
            $newHealthRecord->patient_id = $newPatient->id;
            $newHealthRecord->weight = $request->weight;
            $newHealthRecord->height = $request->height;
            $newHealthRecord->blood_type = $request->b_type;
            //$newHealthRecord->blood_pressure = $request->b_pressure_up.'/'.$request->b_pressure_down;
            /* if($request->gender == 2){
                $newHealthRecord->isPregnant = $request->pregnant;
                if($request->pregnant){
                    $newHealthRecord->month_of_pregnant = $request->months_pregnant;
                }
            } */
            
            $newHealthRecord->sickness = $request->sickness;
            $newHealthRecord->medication = $request->medication;
            $newHealthRecord->save();

            $newAccount = User::create([
                'name' =>  $request->f_name.' '.$request->l_name,
                'gender' =>  $request->gender,
                'username' => 'patient'.strtolower($request->l_name),
                'email_verified_at'=>  date('Y-m-d H:i:s'),
                'password' => Hash::make('123123'),
                'patient_id' => $newPatient->id,
                'role' => 'patient',
            ]);

            DB::commit();
            return response()->json([
                "success"=> true,
                "data"=> $newPatient,
                "message"=> 'New patient successfully added!'
            ]);

        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "message"=> 'Adding patient failed!'
            ]);
        }
    }
    public function view($id){
        $viewPatient = PatientInformation::with(['purok'])->find($id);
        if($viewPatient){
            return response()->json([
                "success"=> true,
                "data"=> $viewPatient,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    public function edit($id){
        $editPatient = PatientInformation::with(['healthRecord'])->find($id);
        if($editPatient){
            return response()->json([
                "success"=> true,
                "data"=> $editPatient,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    public function update(Request $request, $id){

        DB::beginTransaction();
        try {
 
            $updatePatient = PatientInformation::find($id);
            if($updatePatient){

                $updatePatient->l_name = $request->l_name;
                $updatePatient->f_name = $request->f_name;
                $updatePatient->m_name = $request->m_name;
                $updatePatient->name_ext = $request->name_ext;
                $updatePatient->gender = $request->gender;
                $updatePatient->status = $request->status;
                $updatePatient->b_date = $request->b_date;
                $updatePatient->age = $request->age;
                $updatePatient->b_place = $request->b_place;
                $updatePatient->occupation = $request->occupation;
                $updatePatient->cell_number = $request->cell_number;
                $updatePatient->purok_id = $request->purok_id;
                $updatePatient->guardian = $request->guardian;
                $updatePatient->save();

                $UpdateHealthRecord = HealthInformation::find($request->health_record_id);
                if($UpdateHealthRecord){
                    $UpdateHealthRecord->weight = $request->weight;
                    $UpdateHealthRecord->height = $request->height;
                    $UpdateHealthRecord->blood_type = $request->b_type;
                    //$UpdateHealthRecord->blood_pressure = $request->b_pressure_up.'/'.$request->b_pressure_down;
                   /*  if($request->gender == 2){
                        $UpdateHealthRecord->isPregnant = $request->pregnant;
                        if($request->pregnant){
                            $UpdateHealthRecord->month_of_pregnant = $request->months_pregnant;
                        }
                    } */
                    
                    $UpdateHealthRecord->sickness = $request->sickness;
                    $UpdateHealthRecord->medication = $request->medication;
                    $UpdateHealthRecord->save();
                }
            
                DB::commit();
                return response()->json([
                    "success"=> true,
                    "data"=> $updatePatient,
                    "message"=> 'Patient details successfully updated!'
                ]);
            }

            return response()->json([
                "success"=> false,
                "data"=> [],
                "message"=> 'Data not found!'
            ]);

        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "message"=> 'Update patient details failed!'
            ]);
        }
       
    }

    public function delete($id){
        $delete = PatientInformation::find($id);
        if($delete){
            $delete->healthRecord()->delete();
            $delete->account()->delete();
            $delete->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Patient information successfully delete!'
            ]);
        }
    }

    public function search(Request $request){
        $search = PatientInformation::select('id','cell_number',
        DB::raw("CONCAT(f_name,' ',m_name,' ',l_name) AS name"))
        ->where(DB::raw("lower(CONCAT(f_name,' ',l_name))"), 'LIKE', '%'.strtolower($request->input('search')).'%')
        ->get();
        return $search;
    }
    
}
