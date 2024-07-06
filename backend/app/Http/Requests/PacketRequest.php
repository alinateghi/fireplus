<?php

namespace App\Http\Requests;

use App\Events\NewModuleEvent;
use App\Events\NewPacketEvent;
use App\Foundations\ZoneState;
use App\Models\Event;
use App\Models\Module;
use App\Models\Packet;
use Exception;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use IPPanel\Client as IPPanelClient;

class PacketRequest extends FormRequest
{
	protected $module;

	protected $lastPacket;

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

	public function getModule()
	{
		if (!$this->module)
			$this->module = Module::findOrFail($this->ID);
		return $this->module;
	}

	public function getProject()
	{
		$module = $this->getModule();
		return $module->project;
	}

	public function lastPacket()
	{
		if (!$this->lastPacket) {
			// $this->lastPacket = $this->getModule()->lastPacket;
			$this->lastPacket = $this->getModule()->packets()->orderBy("received_at", 'desc')->first();
			if ($this->lastPacket == null) {
				$this->savePacket();
				abort(404, "Last Packet Not Found!");
			}
		}
		return $this->lastPacket;
	}

	public function handle()
	{
		$this->headers->set('Content-Type', 'application/json');
		Log::debug($this->all());
		$this->checkForEvents();
		$this->checkForInfo();
		$this->savePacket();
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
			'data'		=> $this->content,
		]);
		event(new NewPacketEvent($packet));
	}

	public function checkForEvents()
	{
		$this->checkZonesState();
	}

	public function checkZonesState()
	{
		$last = $this->lastPacket();
		for ($i = 1; $i <= 8; $i++) {
			if ($this->{'ZS' . $i} !== $last->data['ZS' . $i]) {
				$lastState = new ZoneState($last->data['ZS' . $i]);
				$newState = new ZoneState($this->{'ZS' . $i});
				$changes = $newState->getChanges($lastState);
				// Log::debug("changes");
				// Log::debug($changes);
				foreach ($changes as $ch) {
					$event = Event::create([
						'module_id'	=> $this->ID,
						'type'		=> $ch,
						'zone'		=> $i,
					]);
					event(new NewModuleEvent($event));
					$zoneName = $this->{'ZL' . $i};
					$projectName = $this->getModule()->title;
					$moduleName = $this->getProject()->name;
					$data = [
						"status"	=> $ch,
						"zone"		=> $i,
						"zone_name"	=> $zoneName,
						"project"	=> $projectName,
						"module"	=> $moduleName,
					];
					// Log::debug("send data:");
					// Log::debug($data);
					$smsNotices = $this->getProject()->notices()->whereEvent($ch)->whereType("sms")->get();
					$smsNotices->each(function ($notic) use ($data) {
						$contact = $notic->contact;

						try {
							$apiKey = "ZFBF6fw1iegZdMLmjqAkbnK6pc_JT0PUrp_OjpyoIBE=";
							$client = new IPPanelClient($apiKey);
							$bulkID = $client->sendPattern(
								"nepnbi3o8k",
								"+9810005542",	// originator
								"98" . ltrim($contact->links[0], "0"),	// recipients
								$data,
							);
							Log::debug("Bulk ID: " . $bulkID);
						} catch (Exception $e) {
							Log::error('Something went wrong!');
							Log::error($e->getMessage());
						}
					});
				}
			}
		}
	}

	public function checkForInfo()
	{
		$this->checkTime();
		$this->checkDistance();
		$this->checkLabels();
		// $this->checkAlgorithms();
		$this->checkPassword();
	}

	public function checkTime()
	{
		$epoch = time();
		if (abs($epoch - $this->T) > 300)
			$this->response['T'] = $epoch;
	}

	public function checkDistance()
	{
		if ($this->getModule()->firefighting_distance != $this->d)
			$this->response['d'] = $this->getModule()->firefighting_distance;
	}

	public function checkLabels()
	{
		$configs = $this->getModule()->configs;
		for ($i = 1; $i <= 8; $i++) {
			$server_value = $configs->firstWhere('name', 'ZL' . $i)["value"] ?? null;
			if ($server_value && $this->{'ZL' . $i} != $server_value) {
				$this->response['ZL' . $i] = $server_value;
			}
		}
	}

	public function checkAlgorithms()
	{
		$configs = $this->getModule()->configs;
		for ($i = 1; $i <= 4; $i++) {
			$server_value = $configs->firstWhere('name', 'Algh' . $i)["value"] ?? null;
			if ($server_value !== null && $this->{'ALGR' . $i} != $server_value) {
				$this->response['ALGR' . $i] = $server_value ? 1 : 0;
				// $this->response['ALGR' . $i] = boolval($server_value);
			}
		}
	}

	public function checkPassword()
	{
		$configs = $this->getModule()->configs;
		$password = $configs->firstWhere('name', 'password')["value"] ?? null;
		if ($password && $this->pass != $password) {
			$this->response['pass'] = $password;
		}
	}
}
