<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableBooking extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments("id");
            $table->string("booking_code");
            $table->tinyInteger("trip_type");
            $table->dateTime("booking_date");
            $table->string("contact_name");
            $table->string("contact_phone");
            $table->string("contact_email")->nullable();
            $table->tinyInteger("status")->default(0);
            $table->double("into_money", 20);
            $table->tinyInteger("payment_method");
            $table->unsignedBigInteger("user_id")->nullable();
            $table->timestamps();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
