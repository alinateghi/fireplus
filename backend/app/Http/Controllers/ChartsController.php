<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartsController extends Controller
{
    public function charge(Module $module)
	{
		$now = Carbon::now();
		$time = Carbon::now()->addHour(-23)->minute(0)->second(0);
		$data = $module->packets()->where("received_at", ">", $time)->orderBy("received_at", "DESC")->get();
		// $time->addHour(1);
		// return [
		// 	$time,
		// 	$data->first(),
		// 	$data->where("received_at", "<=", $time)->first(),
		// ];
		$labels = [];
		$amounts = [];
		$threshold = [];
		for (; $time < $now ; $time->addHour(1)){
			array_push($amounts, $data->where("received_at", "<=", $time)->first()->data["sc"] ?? 0);
			array_push($threshold, 2000);
			array_push($labels, $time->format("H:i"));
		}
		return [
			'data' => [
				"amounts" => $amounts,
				"threshold" => $threshold,
			],
			'labels' => $labels,
		];
	}

	public function signal(Module $module)
	{
		$now = Carbon::now();
		$time = Carbon::now()->addHour(-23)->minute(0)->second(0);
		$data = $module->packets()->whereDate("received_at", ">", $time)->orderBy("received_at", "DESC")->get();
		$labels = [];
		$strength = [];
		for (; $time < $now ; $time->addHour(1)){
			array_push($strength, $data->where("received_at", "<=", $time)->first()->data["ANT"] ?? 0);
			array_push($labels, $time->format("H:i"));
		}
		return [
			'data' => [
				"strength" => $strength,
			],
			'labels' => $labels,
		];
	}
}
