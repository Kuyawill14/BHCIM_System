<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index(){
        return Setting::first();
    }

    public function update(Request $request, $id){
        $setting = Setting::find($id);
        if($setting){
            $setting->system_short_name = $request->system_short_name;
            $setting->system_long_name = $request->system_long_name;
            $setting->save();

            return response()->json([
                "success"=> true,
                "message"=> 'Settings successfully updated!'
            ]);
        }
    }
}
