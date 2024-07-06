<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\HasProfileController;
use App\Models\Company;
use App\Models\Link;
use App\Models\Location;
use App\Models\Person;
use Illuminate\Http\Request;


class CompanyController extends Controller
{
	use HasProfileController;

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		return Company::with('director')->get();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// Validate
		$companyValidated = Company::validate($request->all());
		$locationValidated = Location::validate($request->location);
		$linksValidated = Link::validate($request->links);
		$directorValidated = Person::validate($request->director);
		$directorLinkValidated = Link::validate($request->director['links'] ?? null);

		// Save Manging Director models and sub models
		$director = null;
		if (isset($directorValidated)) {
			$director = Person::create($directorValidated);
		}
		if (isset($directorLinkValidated)) {
			// preg_match_all('/(0|98|\+98|)9\d{9}/', $directorValidated['director']['phone'], $matches);
			foreach ($directorLinkValidated as $linkData) {
				//TODO: use 'firstOrCreate' and notify the person who own this link
				$director->links()->create($linkData);
			}
		}

		// Save Company model and attach its relation
		$company = new Company($companyValidated);
		if ($director)
			$company->director()->associate($director);
		$company->save();

		// Save Location model
		if (isset($locationValidated))
			$company->location()->create($locationValidated);

		// Save Link model(s)
		if (isset($linksValidated))
			$company->links()->createMany($linksValidated);

		$this->storeProfileImage($request->profileImage, $company);
		return $company;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Company  $company
	 * @return \Illuminate\Http\Response
	 */
	public function show(Company $company)
	{
		$company->load(['links', 'location', 'director', 'director.links']);
		return $company;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Company  $company
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Company $company)
	{
		// Validate
		$companyValidated = Company::validate($request->all());
		$locationValidated = Location::validate($request->location);
		$linksValidated = Link::validate($request->links);
		$directorValidated = Person::validate($request->director);
		$directorLinkValidated = Link::validate($request->director['links'] ?? null);

		// Update Director model and sub link
		$director = isset($directorValidated) ?
			Person::updateOrCreate(['id' => $directorValidated['id'] ?? null], $directorValidated) : 
			$company->director;
		$company->director()->associate($director);

		// Sync Director Links
		if (isset($directorLinkValidated) && $director !== null)
		{
			$director->links()->sync($directorLinkValidated);
		}

		//Update Location or Create if validated
		if (isset($locationValidated))
			$company->location()->updateOrCreate(['id' => $locationValidated['id'] ?? null], $locationValidated);

		// Sync Links
		if (isset($linksValidated))
			$company->links()->sync($linksValidated);

		$company->update($companyValidated);
		// $company->refresh();
		if ($request->exists("profileImage"))
			$this->updateProfileImage($request->profileImage, $company);
		return $company;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Company  $company
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Company $company)
	{
		//
	}
}
