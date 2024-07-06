<?php

use App\Models\Module;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModuleConfigsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('module_configs', function (Blueprint $table) {
			// $table->id();
			$table->foreignIdFor(Module::class);
			$table->string('name', 32);
			$table->string('type', 32)->nullable();
			$table->string('value', 32)->nullable();
			$table->timestamps();

			$table->primary(['module_id', 'name']);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('module_configs');
	}
}
