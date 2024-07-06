<?php

namespace App\Models;

use App\Models\Traits\HasOwner;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
	use HasFactory, HasValidator, HasOwner;

	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];

	/**
	 * Validation rules.
	 *
	 * @var array
	 */
	protected static $rules = [
		'id'		=> 'nullable|numeric',
		'province'	=> 'required_with:location.city|nullable|string|max:128',
		'city'		=> 'nullable|string|max:128',
		'region'	=> 'nullable|string|max:128',
		'area'		=> 'nullable|string|max:128',
		'address'	=> 'nullable|string',
		'geolat'	=> 'nullable|numeric',
		'geolong'	=> 'nullable|numeric',
	];
}
