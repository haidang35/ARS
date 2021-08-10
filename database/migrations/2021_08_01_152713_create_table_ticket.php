<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTicket extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments("id");
            $table->unsignedInteger("flight_id");
            $table->string("ticket_type");
            $table->string("available_class");
            $table->tinyInteger("status");
            $table->integer("carbin_bag");
            $table->integer("checkin_bag");
            $table->double("price", 20, 2);
            $table->double("tax", 20, 2);
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
        Schema::dropIfExists('tickets');
    }
}
