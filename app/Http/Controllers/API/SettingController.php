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
        //return $request;
        $systemInfo = json_decode($request->system_setting, true);
        
        $setting = Setting::find($id);
        if($setting){

            if($request->system_logo != null && $request->system_logo != ''  && $request->system_logo != 'undefined') {
                $file_extension = $request->system_logo->extension();
                $file_mime_type = $request->system_logo->getClientMimeType();
                $original_file_name = $request->system_logo->getClientOriginalName();

                $filename =  'system_logo.'.$file_extension;

                $file = $request->system_logo->storeAs('public/upload/setting',$filename );
                $setting->logo = preg_replace('/\bpublic\/\b/', '', $file);;
            }


            if($request->system_bg != null && $request->system_bg != ''  && $request->system_bg != 'undefined') {
                $extension = $request->system_bg->extension();
                $TmpName =  'system_bg.'.$extension;

                $Tmpfile = $request->system_bg->storeAs('public/upload/setting',$TmpName);
                $setting->login_bg = preg_replace('/\bpublic\/\b/', '', $Tmpfile);
            }

            $setting->system_short_name = $systemInfo['system_short_name'];
            $setting->system_long_name = $systemInfo['system_long_name'];
            $setting->color = $systemInfo['color'];
            $setting->save();

            return response()->json([
                "success"=> true,
                "message"=> 'Settings successfully updated!'
            ]);
        }
    }
}
