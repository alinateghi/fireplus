<?php

namespace App\Models\Traits;

trait HasOwner
{
	/**
	 * Get the owning model.
	 */
	public function ownerable()
	{
		return $this->morphTo();
	}
}
