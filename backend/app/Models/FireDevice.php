<?php

namespace App\Models;

use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FireDevice extends Model
{
	use HasFactory, HasValidator;
	
	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];

	protected static $rules = [
		'id'	=> 'nullable|numeric',
		'brand'	=> 'string|max:32',
		'type'	=> 'string|max:49',
		'loop_zone_count'	=> 'numeric',
		'device_count'		=> 'numeric',
		'battery_type'		=> 'string|max:128',
		'battery_count'		=> 'numeric',
		'wire_type'			=> 'string|max:128',
		'executed_by'		=> 'string|max:128',
		'executed_year'		=> 'numeric',
	];
}
