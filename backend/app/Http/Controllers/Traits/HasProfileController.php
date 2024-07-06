<?php

namespace App\Http\Controllers\Traits;

use Exception;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

trait HasProfileController
{
	/**
	 * Store given image as owner profile pic.
	 * 
	 * @param * $data image data
	 * @param Illuminate\Database\Eloquent\Model $owner profile pic owner
	 */
	public function storeProfileImage($data, $owner)
	{
		if ($data === null)
			return;
			
		try {
			$img = Image::make($data);
			$img->fit(128, 128);
			$jpg = (string) $img->encode('jpg', 75);
			$name = uniqid();
			$r = Storage::put("public/profile/" . $name . '.jpg', $jpg);
			if ($r) {
				$owner->profileMedia()->create([
					'name' => 	$name,
					'type' => 	'profile',
					'mime' => 	'image/jpeg',
				]);
			}
		} catch (Exception $e) {
		}
	}

	/**
	 * Store, update or remove profile pic for owner.
	 * 
	 * @param $data image data
	 * @param Illuminate\Database\Eloquent\Model $owner profile pic owner
	 */
	public function updateProfileImage($data, $owner)
	{
		$this->removeProfileImage($owner);
		$this->storeProfileImage($data, $owner);
	}

	/**
	 * Remove profile pic for owner.
	 * 
	 * @param Illuminate\Database\Eloquent\Model $owner profile pic owner
	 */
	public function removeProfileImage($owner)
	{
		foreach ($owner->profileMedia()->get() as $m) {
			Storage::delete('public/profile/' . $m->name . '.jpg');
			$m->delete();
		}
	}
}
