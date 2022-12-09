<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BarangayRecord;


class BarangayRecordController extends Controller
{
    public function index(){
        return BarangayRecord::all();
    }

    public function store(){
        return BarangayRecord::all();
    }

    public function update(){
        return BarangayRecord::all();
    }
}
