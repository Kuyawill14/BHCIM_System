<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Medicine;
use App\Models\MedicineStock;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicine = Medicine::with(['total_stocks' => function($query){
            $query->select('medicine_id', DB::raw("SUM(quantity) as qty"))
            ->groupBy('medicine_id');
        }])->get();
        return $medicine;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request, $id)
    {
            $newStock = new MedicineStock;
            $newStock->medicine_id = $id;
            $newStock->quantity = $request->quantity;
            $newStock->expiration_date = $request->expiration_date;
            $newStock->save();
            
            if($newStock){
                return response()->json([
                    "success"=> true,
                    "message"=> 'New medicine stock successfully added!'
                ]);
            }   

            return response()->json([
                "success"=> true,
                "message"=> 'adding medicine stock unsuccessful!'
            ]);
           
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            $newMedicine = new Medicine;
            $newMedicine->name = $request->name;
            $newMedicine->description = $request->description;
            $newMedicine->save();
            
            $newStock = new MedicineStock;
            $newStock->medicine_id = $newMedicine->id;
            $newStock->quantity = $request->quantity;
            $newStock->expiration_date = $request->expiration_date;
            $newStock->save();
            
            DB::commit();
            return response()->json([
                "success"=> true,
                "data"=> $newMedicine,
                "message"=> 'New medicine successfully added!'
            ]);

        }catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success"=> false,
                "message"=> 'Adding medicine failed!'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $delete = Medicine::find($id);
        if($delete){
            $delete->stocks()->delete();
            $delete->delete();
            return response()->json([
                "success"=> true,
                "message"=> 'Medicine successfully delete!'
            ]);
        }
        return response()->json([
            "success"=> false,
            "message"=> 'Data not found!'
        ]);
    }
}
