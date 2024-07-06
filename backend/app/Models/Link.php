<?php

namespace App\Models;

use App\Models\Traits\HasOwner;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Link extends Model
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
		// '*'			=> 'array',
		'*.id'		=> 'nullable|numeric',
		'*.type'	=> 'required_without:*.id|in:phone,website,social',
		'*.value'	=> 'required_without:*.id',
	];
}
