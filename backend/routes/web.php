<?php

use App\Http\Controllers\DebugController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/showTest', function () {
	$file = storage_path("logs/test-".Carbon::today()->format("Y-m-d").".log");
	if (file_exists($file))
    	return nl2br(file_get_contents($file));
	return $file . " not exists!";
});

Route::get('/activeResult', function () {
	$file = storage_path("logs/active.log");
	if (file_exists($file))
    	return nl2br(file_get_contents($file) . "\n" . 'Actived at ' . Storage::get("active.log"));
	return $file . " not exists!";
});

Route::get('/debug/log/today', [DebugController::class, 'showToday']);