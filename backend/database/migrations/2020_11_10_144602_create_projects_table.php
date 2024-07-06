<?php

use App\Models\Person;
use App\Models\Company;
use App\Models\Organization;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
			$table->id();
			$table->string('name');
			$table->string('application_type', 64)->nullable();
			$table->foreignIdFor(Person::class, "executor_id")->nullable();
			$table->foreignIdFor(Company::class)->nullable();
			$table->foreignIdFor(Organization::class)->nullable();
			$table->foreignIdFor(Person::class, "building_owner_id")->nullable();
			$table->integer('building_area')->nullable();
			$table->smallInteger('building_year')->nullable();
			// $table->string('building_owner')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
