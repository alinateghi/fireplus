<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Validator;

trait HasValidator
{
	/**
	 * Make validator for input data.
	 *
	 * @return Illuminate\Support\Facades\Validator;
	 *
	 */
	public static function getValidator($data)
	{
		return Validator::make($data ?? [], static::$rules ?? []);
	}

	/**
	 * Run the validator's rules against its data.
	 *
	 * @return array | null
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public static function validate($data, $required = false)
	{
		return $data || $required ? static::getValidator($data)->validate() : null;
	}
}
