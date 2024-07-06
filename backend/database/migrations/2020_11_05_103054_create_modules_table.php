<?php

use App\Models\FireDevice;
use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
			$table->bigInteger('id')->primary();
			$table->foreignIdFor(Project::class);
			$table->foreignIdFor(FireDevice::class)->nullable();
			// $table->uuid('uuid')->nullable()->default(null);
			$table->string('title', 128);
			$table->integer('firefighting_distance')->unsigned()->nullable();
			$table->tinyInteger("is_addressable")->default(0);
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
        Schema::dropIfExists('modules');
    }
}
