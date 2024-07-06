<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdPacketRequest;
use App\Http\Requests\PacketRequest;
use App\Models\Module;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use IPPanel\Client as IPPanelClient;

class PacketController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Module $module)
	{
		return $module->packets()->orderBy("received_at", 'desc')->paginate(20);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \App\Http\Requests  $request
	 * @return \Illuminate\Http\Response
	 */
	public function new(PacketRequest $request)
	{
		$request->handle();
		return $request->response();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \App\Http\Requests  $request
	 * @return \Illuminate\Http\Response
	 */
	public function test(AdPacketRequest $request)
	{
		$request->handle();
		return $request->response();
	}

	/**
	 * Log a newly created packet in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function test2(Request $request)
	{
		$request->headers->set('Content-Type', 'application/json');
		if ($request->exists("string") && $request->string) {
			Log::driver("test")->debug($request->all());
			if (Str::contains(Str::lower($request->string), 'fire')) {
				$data = [
					"project"	=> "برج پاژ",
					"info"	=> $request->string,
				];
				try {
					$apiKey = "ZFBF6fw1iegZdMLmjqAkbnK6pc_JT0PUrp_OjpyoIBE=";
					$client = new IPPanelClient($apiKey);
					$bulkID = $client->sendPattern(
						"3mdi3s6y32",
						"+9810005542",	// originator old: +9810003816
						"989379053352",	// recipients
						$data,
					);
					Log::debug("Bulk ID: " . $bulkID);
					$bulkID = $client->sendPattern(
						"3mdi3s6y32",
						"+9810005542",	// originator old: +9810003816
						"989337601917",	// recipients
						$data,
					);
					Log::debug("Bulk ID: " . $bulkID);
					$bulkID = $client->sendPattern(
						"3mdi3s6y32",
						"+9810005542",	// originator old: +9810003816
						"989151140221",	// recipients
						$data,
					);
					Log::debug("Bulk ID: " . $bulkID);
				} catch (Exception $e) {
					Log::error('Something went wrong!');
					Log::error($e->getMessage());
				}
			}
		} else {
			//Log::debug($request->all());
		}
		return response([]);
	}

	/**
	 * Log a newly created packet in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function activeTest(Request $request)
	{
		$now = Carbon::now();
		try {
			$last = Carbon::parse(Storage::get("active.log"));
		} catch (Exception $e) {
			$last = Carbon::yesterday();
		}
		$diff = $now->timestamp - $last->timestamp;
		if ($diff > 15) {
			$data = "Disconnected at {$last}\nConnected at {$now}\n";
			file_put_contents(storage_path("logs/active.log"), $data, FILE_APPEND);
		}
		Storage::put("active.log", $now);
		return [];
	}
}
