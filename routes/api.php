<?php

use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\AuthController;
use \App\Http\Controllers\Api\ForgotPasswordController;
use \App\Http\Controllers\Api\ResetPasswordController;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['middleware' => 'auth:api'], function (){
   Route::get('user', [UsersController::class, 'user']);
});
Route::post('register', [AuthController::class,'register']);
Route::post('login',    [AuthController::class,'login']);
Route::post('forgot-password',    [ForgotPasswordController::class,'sendResetLinkEmail']);
Route::post('reset-password',    [ResetPasswordController::class,'reset']);
