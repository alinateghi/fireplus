<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
			$table->id();
			$table->morphs("ownerable");
			$table->string("province", 128)->nullable();
			$table->string('city', 128)->nullable();
			$table->string('region', 128)->nullable();
			$table->string('area', 128)->nullable();
			$table->mediumText('address')->nullable();
			$table->float("geolat", 10, 6)->nullable();
			$table->float("geolong", 10, 6)->nullable();
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
        Schema::dropIfExists('locations');
    }
}
