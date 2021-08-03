<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableFlight extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->increments("id");
            $table->string("flight_code");
            $table->dateTime("departure_datetime");
            $table->dateTime("arrival_datetime");
            $table->string("aircraft", 50);
            $table->unsignedInteger("airline_id");
            $table->unsignedInteger("departure_id");
            $table->unsignedInteger("destination_id");
            $table->integer("capacity");
            $table->integer("seats_reserved");
            $table->integer("seats_available");
            $table->timestamps();
            $table->foreign("airline_id")->references("id")->on("airlines")->onDelete("cascade");
            $table->foreign("destination_id")->references("id")->on("destinations")->onDelete("cascade");
            $table->foreign("departure_id")->references("id")->on("destinations")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
}
