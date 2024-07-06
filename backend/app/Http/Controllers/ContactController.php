<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\Contact;
use App\Models\Link;
use App\Models\Location;
use App\Models\Person;
use Illuminate\Http\Request;

class ContactController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		return Contact::with(["person", "project"])->get();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$validatedContact = Contact::validate($request->all());
		$validatedPerson = Person::validate($request->person, true);
		$validatedLocation = Location::validate($request->location);
		$validatedLinks = Link::validate($request->links);
		$validatedNotices = Notice::validate($request->notices);

		$person = Person::create($validatedPerson);
		$contact = new Contact($validatedContact);
		$contact->person()->associate($person);
		$contact->save();

		// Save Location model
		if (isset($validatedLocation))
			$contact->location()->create($validatedLocation);

		// Save Link model(s)
		if (isset($validatedLinks))
			$contact->links()->createMany($validatedLinks);

		foreach ($validatedNotices as $c) {
			$c["contact_id"] = $contact->id;
			$c["project_id"] = $contact->project_id;
			Notice::create($c);
		}

		$contact->load("project");
		return $contact;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Contact  $contact
	 * @return \Illuminate\Http\Response
	 */
	public function show(Contact $contact)
	{
		$contact->load(["person", "project", "location", "links", "notices"]);
		return $contact;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Contact  $contact
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Contact $contact)
	{
		$validatedContact = Contact::validate($request->all());
		$validatedPerson = Person::validate($request->person, true);
		$validatedLocation = Location::validate($request->location);
		$validatedLinks = Link::validate($request->links);
		$validatedNotices = Notice::validate($request->notices);

		//Update Location or Create if validated
		if (isset($validatedLocation))
			$contact->location()->updateOrCreate(['id' => $validatedLocation['id'] ?? null], $validatedLocation);

		// Sync Links
		if (isset($validatedLinks))
			$contact->links()->sync($validatedLinks);

		foreach ($validatedNotices as &$c) {
			$c["contact_id"] = $contact->id;
			$c["project_id"] = $contact->project_id;
		}
		$contact->notices()->sync($validatedNotices);

		$contact->person->update($validatedPerson);
		$contact->update($validatedContact);
		$contact->load("project");
		return $contact;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Contact  $contact
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Contact $contact)
	{
		//
	}
}
