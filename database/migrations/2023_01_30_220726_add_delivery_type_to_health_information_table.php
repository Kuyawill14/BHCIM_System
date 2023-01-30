<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeliveryTypeToHealthInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('health_information', function (Blueprint $table) {
            $table->string('delivery_type')->nullable();
            $table->string('delivery_time')->nullable();
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
            $table->dropColumn('delivery_type');
            $table->dropColumn('delivery_time');
        });
    }
}
