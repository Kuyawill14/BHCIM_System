<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBarangayRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('barangay_records', function (Blueprint $table) {
            $table->id();
            $table->string('f_name')->nullable();
            $table->string("m_name")->nullable();
            $table->string("l_name")->nullable();
            $table->integer("gender")->nullable();
            $table->string("status")->nullable();
            $table->string("occupation")->nullable();
            $table->date("b_date")->nullable();
            $table->string("b_place")->nullable();
            $table->integer("cell_number")->nullable();
            $table->string("purok_id")->nullable();
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
        Schema::dropIfExists('barangay_records');
    }
}
