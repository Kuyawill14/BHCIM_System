<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Rules\OldPass;

class AuthController extends Controller
{
    public function login(Request $request){

        $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        if(Auth::attempt(['username' => $request->username, 'password' => $request->password])){
            //$request->session()->regenerate();

            $id = auth("sanctum")->id();
            $user = User::find($id);
            $user->isActive = 1;
            $user->save();


            return response()->json([
                "message" => "Login Success",
                "success" => true,
                "details"=>auth("sanctum")->user()
            ]); 
        }
        else{
            return response()->json([
                "message" => "Incorrect Email or Password. Please try again",
                "success" => false
            ]);
        }
    }


    public function register(Request $request){
     
        $New = User::create([
            'name' =>  $request->name,
            'username' =>  $request->username,
            'password' => Hash::make($request->password),
        ]);

    }

    public function currentuser(Request $request){
        $id = auth("sanctum")->id();
        $user = User::with('patient_details')->find($id);
        return $user;
    }

    public function update(Request $request){
        $id = auth("sanctum")->id();
        $user = User::find($id);
        $userDetails = json_decode($request->userDetails, true);

        if($user){
            $user->name = $userDetails['name'];
            $user->username = $userDetails['username'];
            $user->gender = $userDetails['gender'];
            if($request->profile != null && $request->profile != ''  && $request->profile != 'undefined') {
         
                Storage::delete(public_path($user->picture));
                $file_extension = $request->profile->extension();
                $filename =  trim($userDetails['name']).'_'.$id.'.'.$file_extension;
                $file = $request->profile->storeAs('public/upload/profiles',$filename);
                $user->picture = preg_replace('/\bpublic\/\b/', '', $file);
            }
            $user->save();
            return response()->json([
                "success"=> true,
                "data"=> $user->picture,
                "message"=> 'Settings successfully updated!'
            ]);
        }
    }

    public function logout(Request $request) {
        $id = auth("sanctum")->id();
        $user = User::find($id);
        if($user){
            $user->isActive = 0;
            $user->save();
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
    }    

    public function update_password(Request $request) {

        $request->validate([
            'current_password' => ['required', new OldPass],
            'new_password' => ['required','min:6','max:30'],
            'new_confirm_password' => ['same:new_password'],
        ]);

        $newpass = User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);

        if($newpass){
            return response()->json([
                "success"=> true,
                "message"=> 'password successfully updated!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "message"=> 'password updated unsuccessfull!'
        ]);
    }
}
