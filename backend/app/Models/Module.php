<?php

namespace App\Models;

use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
	use HasFactory, HasValidator;
	
	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = [];

	protected static $rules = [
		'id'					=> 'required|numeric',
		'project_id'			=> 'integer|exists:projects,id',
		'fire_device_id'		=> 'nullable|integer|exists:fire_devices,id',
		'title'					=> 'required_without:id|string|max:128',
		'firefighting_distance'	=> 'numeric',
	];

	public function project()
	{
		return $this->belongsTo(Project::class);
	}

	public function packets()
	{
		return $this->hasMany(Packet::class);
	}

	public function lastPacket()
	{
		return $this->hasMany(Packet::class)->orderBy("received_at", 'desc')->limit(1);
	}

	public function configs()
	{
		return $this->hasMany(ModuleConfig::class);
	}
}
