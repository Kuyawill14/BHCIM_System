<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckUpRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('check_up_records', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_id');
            $table->string('blood_pressure')->nullable();
            $table->string('temperature')->nullable();
            $table->boolean('pregnant')->default(0);
            $table->integer('month_of_pregnancy')->nullable();
            $table->string('illness_id')->nullable();
            $table->string('medicine_given')->nullable();
            $table->string('consultation_notes')->nullable();
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
        Schema::dropIfExists('check_up_records');
    }
}
