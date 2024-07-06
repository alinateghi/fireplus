<?php

namespace App\Http\Requests;

use App\Events\NewModuleEvent;
use App\Events\NewPacketEvent;
use App\Foundations\EventAnalyzer;
use App\Models\Event;
use App\Models\Packet;
use Carbon\Carbon;
use DateTimeZone;
use Exception;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class AdPacketRequest extends FormRequest
{

	protected $response = [];

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			//
		];
	}

	public function handle()
	{
		$this->headers->set('Content-Type', 'application/json');

		$this->checkForEvents();
		// $this->checkForInfo();
		try {
			$this->savePacket();
		} catch (Exception $e) {
			Log::debug($this->all());
			Log::info($this->content);
		}
	}

	public function response()
	{
		// Log::debug($this->response);
		return response()->json($this->response);
	}

	public function savePacket()
	{
		// Log::debug($this->all());
		$packet = Packet::create([
			'module_id'	=> $this->ID,
			'type'		=> 1,
			'data'		=> $this->content,
		]);
		event(new NewPacketEvent($packet));
	}

	public function checkForEvents()
	{
		$str = $this->string ?? "";
		if (strlen($str) > 0)
			Log::channel('test')->debug($str);
		// $matches = [];
		// if (preg_match("/Time.+\nFire ?\n(.+)\nNumber (\d+) on Loop (\d+)\nZone (\d+)\n/", $str, $matches)) {
		// 	// if (preg_match("/Fire/", $str, $matches)) {
		// 	Log::debug($matches);
		// 	$event = Event::create([
		// 		'module_id'	=> $this->ID,
		// 		'type'		=> "fire",
		// 		'zone'		=> $matches[4],
		// 	]);
		// 	event(new NewModuleEvent($event));
		// }

		$eventData = (new EventAnalyzer($str))->analyze();
		if ($eventData) {
			foreach ($eventData as $e) {
				$e['module_id'] = $this->ID;
				$e['occurred_at'] = Date::now()->toDateTimeLocalString();
				$event = Event::create($e);
				event(new NewModuleEvent($event));
			}
		}
	}
}
