<?php

use App\Models\StructBlock;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStructSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('struct_sections', function (Blueprint $table) {
			$table->id();
			$table->foreignIdFor(StructBlock::class);
			$table->string('name');
			$table->smallInteger('floors')->default(0);
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
        Schema::dropIfExists('struct_sections');
    }
}
