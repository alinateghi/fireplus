<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\ModuleConfig;
use Illuminate\Http\Request;

class ModuleConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Module $module)
    {
        return $module->configs;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Module $module)
    {
		foreach ($request->all() as $key => $value) {
			$module->configs()->updateOrCreate(['module_id' => $module->id, 'name' => $key], ['value' => $value, 'type' => gettype($value)]);
		}
		return response($module->configs, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ModuleConfig  $moduleConfig
     * @return \Illuminate\Http\Response
     */
    public function show(ModuleConfig $moduleConfig)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ModuleConfig  $moduleConfig
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ModuleConfig $moduleConfig)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ModuleConfig  $moduleConfig
     * @return \Illuminate\Http\Response
     */
    public function destroy(ModuleConfig $moduleConfig)
    {
        //
    }
}
