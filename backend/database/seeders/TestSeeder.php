<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Link;
use App\Models\Location;
use App\Models\Module;
use App\Models\Organization;
use App\Models\Person;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		User::create([
			"name"		=> "admin",
			"username"	=> "admin",
			"password"	=> Hash::make("admin"),
			"level"		=> "admin",
			"role"		=> "admin",
		]);
		
		$reza = Person::create([
			'first_name'	=> 'رضا',
			'last_name'		=> 'امینی',
			'gender'		=> '1',
			'national_code'	=> '0920000000',
		]);

		$rezaPhone = new Link([
			'type'	=> 'phone',
			'value'	=> '09152401402',
		]);
		$reza->links()->save($rezaPhone);

        $comp = Company::create([
			'name'				=> 'پژواک',
			'activity_type'		=> 'تجهیزات آتش نشانی',
			'activity_field'	=> 'پنل هوشمند',
			'established_at'	=> '1360',
			'director_id'		=> $reza->id,
		]);

		$loc = new Location([
			'province'	=> 'خراسان رضوی',
			'city'		=> 'مشهد',
			'region'	=> '8',
			'area'		=> '3',
			'address'	=> 'کوهسنگی 28',
			'geolat'	=> 36.283746,
			'geolong'	=> 59.566380,
		]);
		$comp->location()->save($loc);

		$org = Organization::create([
			'name'	=> 'شهرداری منطقه 8',
			'type'	=> 'دولتی',
		]);

		$proj = Project::create([
			'name'				=> 'شهرداری 8',
			'company_id'		=> $comp->id,
			'organization_id'	=> $org->id,
			'application_type'	=> 'اداری',
			'building_area'		=> '500',
			'building_year'		=> '1355',
		]);

		$module = Module::create([
			'id'					=> 861230046005972,
			'project_id'			=> $proj->id,
			// 'fire_device_id'		=> ,
			'title'					=> 'ماژول طبقه همکف - اصلی',
			'firefighting_distance'	=> '7',
		]);

		Module::create([
			'id'					=> 123456789,
			'project_id'			=> $proj->id,
			// 'fire_device_id'		=> ,
			'title'					=> 'ماژول تست',
			'firefighting_distance'	=> '3',
		]);
    }
}
