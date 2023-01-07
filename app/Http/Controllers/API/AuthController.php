<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){

        $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        if(Auth::attempt(['username' => $request->username, 'password' => $request->password])){
            $request->session()->regenerate();

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
}
