<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DebugController extends Controller
{
	public function log(Request $request)
	{
		$data = [
			'headers' => collect($request->headers),
			'content' => $request->getContent(),
			'data'	  => $request->all(),
		];
		// Log::channel('debug')->debug(collect($data));
		// Log::channel('debug')->debug('{"headers":{},"content":"","data":[]}');
		$file = storage_path("logs/debug-" . Carbon::today()->format("Y-m-d") . ".log");
		file_put_contents($file, collect($data)->toJson() . ",\n", FILE_APPEND);
	}

	public function showToday()
	{
		$file = storage_path("logs/debug-" . Carbon::today()->format("Y-m-d") . ".log");
		if (file_exists($file)) {
			// return nl2br(file_get_contents($file));
			$content = file_get_contents($file);
			$content = trim($content, " \n\r,");
			// $content = str_replace("\n", ',', $content);
			// return response("[$content]");
			// return response(json_decode("[$content]"));
			// return response()->json("[$content]");
			return response()->json(json_decode("[$content]"));
		}
		return $file . " not exists!";
	}
}
