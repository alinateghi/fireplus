<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChartsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\PacketController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\ModuleConfigController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Broadcasting\BroadcastController;
use Illuminate\Support\Facades\Log;

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

Route::post('/login', [AuthController::class, "login"])->name("login");

Route::group(['middleware' => ['auth:web']], function () {
	Route::post('/logout', [AuthController::class, "logout"])->name("logout");
});

Route::group(['middleware' => ['auth:sanctum']], function () {

	Route::post('/getMe', [AuthController::class, "getMe"]);
	Route::match(['get', 'post'], '/broadcasting/auth',	[BroadcastController::class, 'authenticate']);

	Route::get("/info", DashboardController::class . '@info');

	Route::apiResource("/companies", CompanyController::class);
	Route::apiResource("/organizations", OrganizationController::class);
	Route::apiResource("/projects", ProjectController::class);
	Route::apiResource("/modules", ModuleController::class);
	Route::apiResource("/events", EventController::class);
	Route::apiResource("/contacts", ContactController::class);

	// Charts Data
	Route::post("/chart/charge/{module}", [ChartsController::class, "charge"]);
	Route::post("/chart/signal/{module}", [ChartsController::class, "signal"]);


	// Route::apiResource("/configs/{module}/", ModuleConfigController::class);
	Route::get("/configs/{module}", [ModuleConfigController::class, "index"]);
	Route::post("/configs/{module}", [ModuleConfigController::class, "store"]);

	Route::get("/packets/{module}", [PacketController::class, "index"]);
});

// Route::post("/newPacket", function (Request $request) {
// 	Log::debug($request->getContent());
// });

Route::post("/newPacket", [PacketController::class, 'new']);
Route::post("/logPacket", [PacketController::class, 'test']);
Route::post("/activeTest", [PacketController::class, 'activeTest']);

Route::post("/debug/log", [DebugController::class, 'log']);