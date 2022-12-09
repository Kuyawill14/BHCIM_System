<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HealthRecord;

class HealthRecordController extends Controller
{
    public function index(){
        return HealthRecord::all();
    }

    public function store(){
        return BarangayRecord::all();
    }

    public function update(){
        return BarangayRecord::all();
    }
}
