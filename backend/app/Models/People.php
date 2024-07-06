<?php

namespace App\Models;

use App\Models\Traits\HasOwner;
use App\Models\Traits\HasValidator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class People extends Model
{
	use HasFactory, HasValidator, HasOwner;

	/**
	 * The attributes that aren't mass assignable.
	 *
	 * @var string[]|bool
	 */
	protected $guarded = ['id'];

	protected $appends = ['name'];

	/**
	 * Validation rules.
	 *
	 * @var array
	 */
	protected static $rules = [
		'id'			=> 'nullable|numeric',
		'first_name'	=> 'required_without:id|string|max:128',
		'last_name'		=> 'string|max:128',
		'gender'		=> 'nullable|integer|in:0,1',
		'national_code'	=> 'string|max:10',
	];

	/**
	 * Get the Link model(s).
	 */
	public function links()
	{
		return $this->morphMany(Link::class, 'ownerable');
	}


	public function getNameAttribute()
	{
		return trim($this->first_name . ' ' . $this->last_name);
	}

	public static function validateWithLinks($data)
	{
		$people = static::validate($data);
		return isset($people) ? [
			'people' => $people,
			'links' => Link::validate($data['links'] ?? null),
		] : null;
	}

	public static function createWithLinks($data)
	{
		if (isset($data['people'])) {
			$p = People::create($data['people']);
		}
		if ($p && isset($data['links'])) {
			foreach ($data['links'] as $linkData) {
				//TODO: use 'firstOrCreate' and notify the people who own this link
				$p->links()->create($linkData);
			}
		}
		return $p;
	}
}
