<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableBookingSeat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights_seats', function (Blueprint $table) {
            $table->increments("id");
            $table->unsignedInteger("flight_id");
            $table->string("seat_code_reserved")->nullable();
            $table->timestamps();
            $table->foreign("flight_id")->references("id")->on("flights")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights_seats');
    }
}
