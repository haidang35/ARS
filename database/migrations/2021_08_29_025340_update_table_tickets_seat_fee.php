<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTableTicketsSeatFee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->float("business_seat_fee", 15)->nullable()->after("tax");
            $table->float("economy_seat_fee", 15)->nullable()->after("business_seat_fee");
            $table->float("deluxe_seat_fee", 15)->nullable()->after("economy_seat_fee");
            $table->float("exit_seat_fee", 15)->nullable()->after("deluxe_seat_fee");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            //
        });
    }
}
