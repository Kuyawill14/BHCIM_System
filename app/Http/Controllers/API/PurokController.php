<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Purok;

class PurokController extends Controller
{
    public function index(){
        return Purok::all();
    }

    public function store(Request $request){
        $newPurok = new Purok;
        $newPurok->name = $request->name;
        $newPurok->number = $request->number;
        $newPurok->description = $request->description;
        $newPurok->save();

        return response()->json([
            "success"=> true,
            "data"=> $newPurok,
            "message"=> 'New purok successfully added!'
        ]);

    }

    public function update(Request $request, $id){
        $purok = Purok::find($id);
        if($purok){
            $purok->name = $request->name;
            $purok->number = $request->number;
            $purok->description = $request->description;
            $purok->save();

            return response()->json([
                "success"=> true,
                "data"=> $purok,
                "message"=> 'Purok details successfully updates!'
            ]);
        }
        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Update purok unsuccessfully!'
        ]);
    }

    public function delete($id){
        $delete = Purok::find($id);
        if($delete){
            $delete->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Purok successfully delete!'
            ]);
        }
    }

    
}
