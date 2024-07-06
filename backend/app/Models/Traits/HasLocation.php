<?php

namespace App\Models\Traits;

use App\Models\Location;

trait HasLocation
{
	/**
	 * Get the Location model.
	 */
	public function location()
	{
		return $this->morphOne(Location::class, 'ownerable');
	}
}
