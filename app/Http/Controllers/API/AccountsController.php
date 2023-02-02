<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AccountsController extends Controller
{
    public function index(){
        $Accounts = User::all();

        return response()->json([
            "account"=> $Accounts,
        ]);
    }
    public function store(Request $request){

        $request->validate([
            'name' => ['required'],
            'username' => ['required'],
            'role' => ['required'],
            'password' => ['required']
        ]);


        $newAccount = User::create([
            'name' =>  $request->name,
            'gender' =>  $request->gender,
            'username' => $request->username,
            'email_verified_at'=>  date('Y-m-d H:i:s'),
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);


        return response()->json([
            "success"=> true,
            "data"=> $newAccount,
            "message"=> 'New account successfully added!'
        ]);

    }

    public function edit($id){ 
        $editAccount = User::find($id);
        if($editAccount){
            return response()->json([
                "success"=> true,
                "data"=> $editAccount,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    public function update(Request $request, $id){

        $request->validate([
            'name' => ['required'],
            'username' => ['required'],
            'role' => ['required'],
        ]);

        $updateAccount = User::find($id);
        if($updateAccount){

            $updateAccount->name =$request->name;
            $updateAccount->username = $request->username;
            $updateAccount->role = $request->role;
            $updateAccount->save();

            return response()->json([
                "success"=> true,
                "data"=> $updateAccount,
                "message"=> 'Account successfully updated!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }
    public function delete($id){
        $DeleteAccount = User::find($id);
        if($DeleteAccount){
            $DeleteAccount->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Account successfully deleted!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "message"=> 'Data not found!'
        ]);
    }

    public function reset_password($id) {
        $user = User::find($id);
        if($user){
            $user->password =  Hash::make('user@2023');
            $user->save();
            return response()->json([
                "success"=> true,
                "message"=> 'Password successfully reset!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "message"=> 'Password reset unsuccessfull!'
        ]);
    }
    
}
