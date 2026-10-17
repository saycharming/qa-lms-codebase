<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
Route::get('/api/health',fn()=>response()->json(['status'=>'ok','service'=>'shopdesk-api','framework'=>'Laravel 13']));
Route::prefix('api')->group(function(){
 Route::get('/products',[ProductController::class,'index']);
 Route::get('/products/{id}',[ProductController::class,'show']);
 Route::post('/auth/register',[AuthController::class,'register']);
 Route::post('/auth/login',[AuthController::class,'login']);
 Route::middleware('training.token')->group(function(){
  Route::get('/auth/me',[AuthController::class,'me']);
  Route::post('/auth/logout',[AuthController::class,'logout']);
  Route::get('/orders',[OrderController::class,'index']);
  Route::get('/orders/{id}',[OrderController::class,'show']);
  Route::post('/orders',[OrderController::class,'store']);
  Route::patch('/orders/{id}',[OrderController::class,'update']);
 });
});
