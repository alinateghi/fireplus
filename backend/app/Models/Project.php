<?php

namespace App\Models;

use App\Models\Traits\HasLinks;
use App\Models\Traits\HasLocation;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
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
		// 'executor_id'		=> 'nullable|numeric|exists:people,id',
		'company_id'		=> 'nullable|numeric|exists:companies,id',
		'organization_id'	=> 'nullable|numeric|exists:organizations,id',
		'application_type'	=> 'nullable|string|max:64',
		'building_area'		=> 'nullable|numeric',
		'building_year'		=> 'nullable|numeric|min:1300|max:1500',	//TODO: max this year
		// 'building_owner'	=> 'nullable|string|max:255',
	];

	public function modules()
	{
		return $this->hasMany(Module::class);
	}

	public function company()
	{
		return $this->belongsTo(Company::class);
	}

	public function organization()
	{
		return $this->belongsTo(Organization::class);
	}

	/**
	 * Get the managing building owner Person model.
	 */
	public function buildingOwner()
	{
		return $this->belongsTo(Person::class, 'building_owner_id');
	}

	public function notices()
	{
		return $this->hasMany(Notice::class);
	}
}
