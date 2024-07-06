<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFireDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fire_devices', function (Blueprint $table) {
			$table->id();
			$table->string('brand', 32)->nullable();
			$table->string('type', 16)->nullable();
			$table->smallInteger('loop_zone_count')->nullable();
			$table->smallInteger('device_count')->nullable();
			$table->string('battery_type', 128)->nullable();
			$table->smallInteger('battery_count')->nullable();
			$table->string('wire_type', 128)->nullable();
			$table->string('executed_by', 128)->nullable();
			$table->smallInteger('executed_year')->nullable();
			// $table->date('executed_at', 128)->nullable();
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
        Schema::dropIfExists('fire_devices');
    }
}
