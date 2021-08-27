<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightSeat extends Model
{
    use HasFactory;
    protected $table = "flights_seats";
    protected $fillable = [
        "flight_id",
        "seat_code_reserved",
    ];

    public function Flight()
    {
        return $this->belongsTo(Flight::class);
    }
}
