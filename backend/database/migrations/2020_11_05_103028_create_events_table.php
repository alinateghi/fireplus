<?php

use App\Models\Module;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
			$table->id();
			$table->foreignIdFor(Module::class);
			$table->tinyInteger('type');
			$table->tinyInteger('number')->nullable();
			$table->tinyInteger('loop_num')->nullable();
			$table->tinyInteger('zone')->nullable();
			$table->string('address', 128)->nullable();
            $table->timestamp('occurred_at')->useCurrent();;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
