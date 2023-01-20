<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\PatientInformationController;
use App\Http\Controllers\API\PurokController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AccountsController;
use App\Http\Controllers\API\IllnessController;
use App\Http\Controllers\API\CheckUpController;
use App\Http\Controllers\API\SmsController;
use App\Http\Controllers\API\MedicineController;

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
Route::prefix('/dashboard')->group(function () {
    Route::get('', [DashboardController::class, 'index']);
 
});


//setting
Route::prefix('/settings')->group(function () {
    Route::get('', [SettingController::class, 'index']);
    Route::post('/update/{id}', [SettingController::class, 'update']);
});

//barangay record
Route::prefix('/patient_information')->group(function () {
    Route::get('', [PatientInformationController::class, 'index']);
    Route::post('/insert', [PatientInformationController::class, 'store']);
    Route::get('/view/{id}', [PatientInformationController::class, 'view']);
    Route::get('/edit/{id}', [PatientInformationController::class, 'edit']);
    Route::put('/update/{id}', [PatientInformationController::class, 'update']);
    Route::delete('/delete/{id}', [PatientInformationController::class, 'delete']);
    Route::get('/search', [PatientInformationController::class, 'search']);
});

//check-up record
Route::prefix('/check_up')->group(function () {
    Route::get('/check/{id}', [CheckUpController::class, 'index']);
    Route::post('/insert', [CheckUpController::class, 'store']);
    Route::get('/edit/{id}', [CheckUpController::class, 'edit']);
    Route::put('/update/{id}', [CheckUpController::class, 'update']);
    Route::delete('/delete/{id}', [CheckUpController::class, 'destroy']);
    Route::get('/report', [CheckUpController::class, 'report']);
});

//illness record
Route::prefix('/illness')->group(function () {
    Route::get('', [IllnessController::class, 'index']);
    Route::post('/insert', [IllnessController::class, 'store']);
    Route::get('/edit/{id}', [IllnessController::class, 'edit']);
    Route::put('/update/{id}', [IllnessController::class, 'update']);
    Route::delete('/delete/{id}', [IllnessController::class, 'delete']);
    Route::get('/report', [IllnessController::class, 'report']);
});

//purok
Route::prefix('/purok')->group(function () {
    Route::get('', [PurokController::class, 'index']);
    Route::post('/insert', [PurokController::class, 'store']);
    Route::put('/update/{id}', [PurokController::class, 'update']);
    Route::delete('/delete/{id}', [PurokController::class, 'delete']);
});

//accounts
Route::prefix('/account')->group(function () {
    Route::get('', [AccountsController::class, 'index']);
    Route::post('/insert', [AccountsController::class, 'store']);
    Route::get('/edit/{id}', [AccountsController::class, 'edit']);
    Route::put('/update/{id}', [AccountsController::class, 'update']);
    Route::delete('/delete/{id}', [AccountsController::class, 'delete']);
});

//sms
Route::prefix('/sms')->group(function () {
    Route::get('', [SmsController::class, 'index']);
    Route::get('/view/{id}', [SmsController::class, 'show']);
    Route::post('/insert', [SmsController::class, 'store']);
    Route::put('/send/{id}', [SmsController::class, 'send']);
    Route::get('/edit/{id}', [SmsController::class, 'edit']);
    Route::put('/update/{id}', [SmsController::class, 'update']);
    Route::delete('/delete/{id}', [SmsController::class, 'delete']);
});

//medicine
Route::prefix('/medicine')->group(function () {
    Route::get('', [MedicineController::class, 'index']);
    Route::get('/stocks/{id}', [MedicineController::class, 'show']);
    Route::post('/insert', [MedicineController::class, 'store']);
    Route::put('/add/{id}', [MedicineController::class, 'add']);
    Route::get('/edit/{id}', [MedicineController::class, 'edit']);
    Route::put('/update/{id}', [MedicineController::class, 'update']);
    Route::delete('/delete/{id}', [MedicineController::class, 'delete']);
    Route::delete('/deleteStock/{id}', [MedicineController::class, 'deleteStock']);
});

Route::middleware('auth:sanctum')->prefix('/user')->group(function () {
    Route::post('/update', [AuthController::class, 'update']);
});

Route::post('/login', [AuthController::class, 'login']);
//Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->get('/currentuser', [AuthController::class, 'currentuser']);
Route::post('/logout', [AuthController::class, 'logout']);