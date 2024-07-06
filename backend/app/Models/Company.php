<?php

namespace App\Models;

use App\Models\Traits\HasLinks;
use App\Models\Traits\HasLocation;
use App\Models\Traits\HasProfileImage as TraitsHasProfileImage;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
	use HasFactory,
		HasValidator,
		TraitsHasProfileImage,
		HasLocation,
		HasLinks;

	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = ['profileImage'];

	/**
	 * Validation rules.
	 *
	 * @var array
	 */
	protected static $rules = [
		'id'				=> 'nullable|numeric',
		'name'				=> 'required_without:id|string|max:255',
		'activity_type'		=> 'string|max:255',
		'activity_field'	=> 'string|max:255',
		'established_at'	=> 'numeric|min:1300|max:1450', //TODO: this year is max
	];

	/**
	 * Get the managing director Person model.
	 */
	public function director()
	{
		return $this->belongsTo(Person::class, 'director_id');
	}
}
