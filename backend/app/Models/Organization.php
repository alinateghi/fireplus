<?php

namespace App\Models;

use App\Models\Traits\HasLinks;
use App\Models\Traits\HasLocation;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
	use HasFactory,
		HasValidator,
		HasLocation,
		HasLinks;

	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];

	/**
	 * Validation Rules
	 * 
	 * @var array
	 */
	protected static $rules = [
		'id'	=> 'nullable|numeric',
		'name'	=> 'required_without:id|string|max:255',
		'type'	=> 'nullable|string|max:128',
	];
}
