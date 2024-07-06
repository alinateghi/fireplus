<?php

use App\Models\Contact;
use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNoticesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notices', function (Blueprint $table) {
			$table->id();
			$table->foreignIdFor(Contact::class);
			$table->foreignIdFor(Project::class);
			$table->string('event', 16);
			$table->string('type', 16);
			$table->integer('reminder')->unsigned()->nullable();
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notices');
    }
}
