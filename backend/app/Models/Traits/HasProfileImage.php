<?php

namespace App\Models\Traits;

use App\Models\Media;
use Illuminate\Support\Facades\Storage;

trait HasProfileImage
{
	/**
	 * Get the Profile Image Media.
	 */
	public function profileMedia()
	{
		return $this->morphOne(Media::class, 'ownerable');
	}

	/**
	 * Profile Image url attribute method.
	 */
	public function getProfileImageAttribute()
	{
		$m = $this->profileMedia()->first();
		return $m == null ? null : config("app.url") . Storage::url('public/profile/'.$m->name.'.jpg');
	}
}
