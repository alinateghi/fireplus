<?php

namespace App\Foundations;

use Illuminate\Support\Facades\Log;

class EventAnalyzer
{
	const PATTERNS = [
		// 0	=> "/Time.+\r?\nFire Reset ?\r?\n/",
		0	=> "/Time.+\r\nFire Reset ?\r?\n((?<address>[a-zA-Z ]+)\r\n)?\r?[^T]?/",
		10	=> "/Time.+\r?\nFire ?\r?\n(?<address>.+)\r?\nNumber (?<number>\d+) on Loop (?<loop>\d+)\r?\nZone (?<zone>\d+)\r?\n/",
		11	=> "/Time.+\r?\nCall Point Operated ?\r?\n(?<address>.+)\r?\nNumber (?<number>\d+) on Loop (?<loop>\d+)\r?\nZone (?<zone>\d+)\r?\n/",
		12	=> "/Time.+\r?\nInterface Input Fire ?\r?\n(?<address>.+)\r?\nNumber (?<number>\d+) on Loop (?<loop>\d+)\r?\nZone (?<zone>\d+)\r?\n/",
	];

	protected $data;

	public function __construct(string $data)
	{
		$this->data = $data;
	}

	public function analyze()
	{
		$result = [];
		$matches = [];
		foreach (static::PATTERNS as $code => $pattern) {
			if (preg_match_all($pattern, $this->data, $matches, PREG_SET_ORDER)) {
				foreach ($matches as $match) {
					$result[] = [
						'type'		=> $code,
						'number'	=> $match['number'] ?? null,
						'loop_num'	=> $match['loop'] ?? null,
						'zone'		=> $match['zone'] ?? null,
						'address'	=> $match['address'] ?? null,
					];
				}
				return $result;
			}
		}
		return null;
	}
}
