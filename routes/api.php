<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [\App\Http\Controllers\AdminController::class, 'login']);
Route::post('/logout', [\App\Http\Controllers\AdminController::class, 'logout']);
Route::get('/getall-yolcu', [\App\Http\Controllers\AdminController::class, 'getallYolcu']);
Route::get('/getall-yolcutipi', [\App\Http\Controllers\AdminController::class, 'getallYolcuTipi']);
Route::get('/getall-arac', [\App\Http\Controllers\AdminController::class, 'getallArac']);
Route::get('/getall-transfer', [\App\Http\Controllers\AdminController::class, 'getallTransfer']);
Route::post('/add-yolcu', [\App\Http\Controllers\AdminController::class, 'addYolcu']);
Route::post('/add-arac', [\App\Http\Controllers\AdminController::class, 'addArac']);
Route::post('/add-transfer', [\App\Http\Controllers\AdminController::class, 'addTransfer']);
Route::get('/get-yolcu/{id}', [\App\Http\Controllers\AdminController::class, 'getYolcu']);
Route::get('/get-transfer/{id}', [\App\Http\Controllers\AdminController::class, 'getTransfer']);
Route::get('/get-arac/{id}', [\App\Http\Controllers\AdminController::class, 'getArac']);
Route::put('/put-yolcu', [\App\Http\Controllers\AdminController::class, 'putYolcu']);
Route::put('/put-arac', [\App\Http\Controllers\AdminController::class, 'putArac']);
Route::put('/put-transfer', [\App\Http\Controllers\AdminController::class, 'putTransfer']);
Route::delete('/delete-yolcu/{id}', [\App\Http\Controllers\AdminController::class, 'deleteYolcu']);
Route::delete('/delete-arac/{id}', [\App\Http\Controllers\AdminController::class, 'deleteArac']);
