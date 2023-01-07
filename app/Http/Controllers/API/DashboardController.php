<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientInformation;
use App\Models\User;
use App\Models\Illness;
use App\Models\CheckUpRecord;

class DashboardController extends Controller
{
    public function index(){
        $totalPatient = PatientInformation::count();
        $totalAccount = User::count();
        $illness = Illness::get();
        foreach($illness as $item){
            $count = CheckUpRecord::where('illness_id', 'LIKE', '%'.$item->id.'%')->count();
            $item->check_up_record_count = $count;
        }
        $totalCheckUp = CheckUpRecord::count();

        return response()->json([
            "patient"=> $totalPatient,
            "account"=> $totalAccount,
            "illness"=> $illness,
            "checkUp"=> $totalCheckUp
        ]);
    }
}
