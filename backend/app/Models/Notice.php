<?php

namespace App\Models;

use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
	use HasFactory, HasValidator;
	
	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];
	
	public $timestamps = false;

	/**
	 * Validation rules.
	 *
	 * @var array
	 */
	protected static $rules = [
		'*.id'			=> 'nullable|numeric',
		'*.contact_id'	=> 'nullable|numeric|exists:contacts,id',
		'*.project_id'	=> 'nullable|numeric|exists:projects,id',
		'*.event'		=> 'required_without:*.id|string|max:16',
		'*.type'		=> 'required_without:*.id|string|max:16',
		'*.reminder'	=> 'nullable|numeric',
	];

	public function project()
	{
		return $this->belongsTo(Project::class);
	}

	public function contact()
	{
		return $this->belongsTo(Contact::class);
	}
}
