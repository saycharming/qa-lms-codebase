<?php
use Illuminate\Support\Facades\Route;
Route::get('/', fn () => response()->json(['project' => 'PINTOP training API', 'framework' => 'Laravel']));
