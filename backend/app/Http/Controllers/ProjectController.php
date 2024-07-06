<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Location;
use App\Models\Person;
use App\Models\Project;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Project::with(['modules'])->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		// Validate input
		$validatedProject = Project::validate($request->all());
		$validatedLocation = Location::validate($request->location);
		$validatedLinks = Link::validate($request->links);
		$validatedExecutor = Person::validateWithLinks($request->executor);
		$validatedBuildingOwner = Person::validateWithLinks($request->building_owner);

		if (isset($validatedExecutor)){
			$executor = Person::createWithLinks($validatedExecutor);
			$validatedProject['executor_id'] = $executor->id;
		}
		if (isset($validatedBuildingOwner)){
			$buildingOwner = Person::createWithLinks($validatedBuildingOwner);
			$validatedProject['building_owner_id'] = $buildingOwner->id;
		}
		$project = Project::create($validatedProject);
		if ($validatedLocation)
			$project->location()->create($validatedLocation);
		if ($validatedLinks)
			$project->links()->createMany($validatedLinks);
		
		return $project;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
		// $project->load(['modules', 'modules.lastPacket', 'links', 'location', 'buildingOwner', 'buildingOwner.links', 'company', 'organization']);
		$project->load(['modules', 'links', 'location', 'buildingOwner', 'buildingOwner.links', 'company', 'organization']);
        return $project;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }
}
