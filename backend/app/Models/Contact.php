<?php

namespace App\Models;

use App\Models\Traits\HasLinks;
use App\Models\Traits\HasLocation;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
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
	 * Validation rules.
	 *
	 * @var array
	 */
	protected static $rules = [
		'id'			=> 'nullable|numeric',
		'project_id'	=> 'required_without:id|numeric|exists:projects,id',
		'person_id'		=> 'numeric|exists:people,id',
		'position'		=> 'nullable|string|max:128',
	];

	public function person()
	{
		return $this->belongsTo(Person::class);
	}
	
	public function project()
	{
		return $this->belongsTo(Project::class);
	}

	public function notices()
	{
		return $this->hasMany(Notice::class);
	}
}
