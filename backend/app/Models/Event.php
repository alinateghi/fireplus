<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
	use HasFactory;
	
	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];

	public $timestamps = false;

	public function module()
	{
		return $this->belongsTo(Module::class);
	}

	/**
	 * Get all of the notices for the Event
	 *
	 */
	public function getNoticesAttribute()
	{
		return $this->module->project->notices()->whereEvent($this->type)->get();
	}
}
