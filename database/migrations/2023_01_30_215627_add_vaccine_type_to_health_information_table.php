<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVaccineTypeToHealthInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('health_information', function (Blueprint $table) {
            $table->boolean('hepa_b')->nullable();
            $table->boolean('bcg')->nullable();
            $table->boolean('dptv')->nullable();
            $table->boolean('opv')->nullable();
            $table->boolean('mv')->nullable();
            $table->boolean('covid')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('health_information', function (Blueprint $table) {
            $table->dropColumn('hepa_b');
            $table->dropColumn('bcg');
            $table->dropColumn('dptv');
            $table->dropColumn('opv');
            $table->dropColumn('mv');
            $table->dropColumn('covid');
        });
    }
}
