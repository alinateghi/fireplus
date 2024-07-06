<?php

use App\Models\Location;
use App\Models\Person;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
			$table->id();
			$table->string('name');
			$table->foreignIdFor(Person::class, "director_id")->nullable();
			$table->smallInteger("established_at")->nullable();
			$table->string("activity_field")->nullable();
			$table->string("activity_type")->nullable();
			$table->text("description")->nullable();
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
        Schema::dropIfExists('companies');
    }
}
