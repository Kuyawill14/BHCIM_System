<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_information', function (Blueprint $table) {
            $table->id();
            $table->string('f_name')->nullable();
            $table->string("m_name")->nullable();
            $table->string("l_name")->nullable();
            $table->string("name_ext")->nullable();
            $table->integer("gender")->nullable();
            $table->string("status")->nullable();
            $table->string("occupation")->nullable();
            $table->date("b_date")->nullable();
            $table->integer("age")->nullable();
            $table->string("b_place")->nullable();
            $table->string("cell_number")->nullable();
            $table->integer("purok_id")->nullable();
            $table->string("guardian")->nullable();
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
        Schema::dropIfExists('patient_information');
    }
}
