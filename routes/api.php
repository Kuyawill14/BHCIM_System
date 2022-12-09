<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\BarangayRecordController;
use App\Http\Controllers\API\HealthRecordController;
use App\Http\Controllers\API\PurokController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



//setting
Route::prefix('/settings')->group(function () {
    Route::get('', [SettingController::class, 'index']);
    Route::put('/update/{id}', [SettingController::class, 'update']);
});

//barangay record
Route::prefix('/barangay_record')->group(function () {
    Route::get('', [BarangayRecordController::class, 'index']);
    Route::post('/insert', [BarangayRecordController::class, 'store']);
    Route::put('/update/{id}', [BarangayRecordController::class, 'update']);
});

//health record
Route::prefix('/health_record')->group(function () {
    Route::get('', [HealthRecordController::class, 'index']);
    Route::post('/insert', [HealthRecordController::class, 'store']);
    Route::put('/update/{id}', [HealthRecordController::class, 'update']);
});

//health record
Route::prefix('/purok')->group(function () {
    Route::get('', [PurokController::class, 'index']);
    Route::post('/insert', [PurokController::class, 'store']);
    Route::put('/update/{id}', [PurokController::class, 'update']);
    Route::delete('/delete/{id}', [PurokController::class, 'delete']);
});

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 */