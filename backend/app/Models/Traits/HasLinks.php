<?php

namespace App\Models\Traits;

use App\Models\Link;

trait HasLinks
{
	/**
	 * Get the Link model(s).
	 */
	public function links()
	{
		return $this->morphMany(Link::class, 'ownerable');
	}
}
