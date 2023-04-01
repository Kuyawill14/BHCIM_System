<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Illness;
use App\Models\CheckUpRecord;

class IllnessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Illness::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newIllness = new Illness;
        $newIllness->name = strtoupper($request->name);
        $newIllness->description =$request->description;
        $newIllness->save();

        return response()->json([
            "success"=> true,
            "data"=> $newIllness,
            "message"=> 'New illness successfully added!'
        ]);

    }

    public function report(Request $request)
    {
        $illness = Illness::get();
        foreach($illness as $item){
            $count = CheckUpRecord::where('illness_id', 'LIKE', '%'.$item->id.'%')
            ->when($request->input('date_from'), function ($query) use ($request) {
                $query->whereDate('created_at','>=',$request->input('date_from'));
            })
            ->when($request->input('date_to'), function ($query) use ($request) {
                $query->whereDate('created_at','<=', $request->input('date_to'));
            })
            ->count();
            $item->check_up_record_count = $count;
        }
        return $illness;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $editIllness = Illness::find($id);
        if($editIllness){
            return response()->json([
                "success"=> true,
                "data"=> $editIllness,
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $updateIllness = Illness::find($id);
        if($updateIllness){
            $updateIllness->name = strtoupper($request->name);
            $updateIllness->description =$request->description;
            $updateIllness->save();

            return response()->json([
                "success"=> true,
                "data"=> $updateIllness,
                "message"=> 'Illness successfully updated!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "data"=> [],
            "message"=> 'Data not found!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $DeleteIllness = Illness::find($id);
        if($DeleteIllness){
            $DeleteIllness->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Illness successfully deleted!'
            ]);
        }

        return response()->json([
            "success"=> false,
            "message"=> 'Data not found!'
        ]);
    }
}
