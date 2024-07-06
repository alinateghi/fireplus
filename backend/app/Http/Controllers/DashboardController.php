<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Module;
use App\Models\Organization;
use App\Models\Project;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function info(Request $request)
	{
		// $user = $request->user();

		return [
			'companies_count'		=> Company::count(),
			'organizations_count'	=> Organization::count(),
			'projects_count'		=> Project::count(),
			'modules_count'			=> Module::count(),
		];
	}
}
