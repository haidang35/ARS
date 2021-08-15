<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableBookingTicket extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings_tickets', function (Blueprint $table) {
            $table->increments("id");
            $table->unsignedInteger("booking_id");
            $table->unsignedInteger("ticket_id");
            $table->string("passenger_name");
            $table->string("gender");
            $table->date("birthday");
            $table->tinyInteger("passenger_type");
            $table->timestamps();
            $table->foreign("booking_id")->references("id")->on("bookings");
            $table->foreign("ticket_id")->references("id")->on("tickets");
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings-tickets');
    }
}
