<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Tzsk\Sms\Facades\Sms;
use IPPanel\Client as IPPanelClient;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('sms:test', function () {
	// try {
	// 	$id = Sms::send("این پیام تستی است. off>500020417", function($sms) {
	// 		$sms->to(['09365967648']); # The numbers to send to.
	// 	});
	// 	$this->info(print_r($id, true));
	// 	$this->info('The command was successful!');
	// } catch (Exception $e) {
	// 	$this->error('Something went wrong!');
	// 	return $e->getMessage();
	// }
	try {
		$apiKey = "ZFBF6fw1iegZdMLmjqAkbnK6pc_JT0PUrp_OjpyoIBE=";
		$client = new IPPanelClient($apiKey);
		$bulkID = $client->sendPattern(
			"rl6uutboxx",
			"+9810005542",	// originator old: +9810003816
			"989904489801",	// recipients
			[
				"status"	=> "حریق",
				"zone"		=> "2",
				"project"	=> "شهرداری",
			]
		);
		$this->info('The command was successful!');
		$this->info("Bulk ID: " . $bulkID);
	} catch (Exception $e) {
		$this->error('Something went wrong!');
		$this->error($e->getMessage());
	}
})->purpose('Send test sms to dev number');