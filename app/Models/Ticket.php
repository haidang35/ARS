<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $table = "tickets";
    protected $fillable = [
        "flight_id",
        "ticket_type",
        "available_class",
        "status",
        "carbin_bag",
        "checkin_bag",
        "price",
        "tax",
        "business_seat_fee",
        "economy_seat_fee",
        "deluxe_seat_fee",
        "exit_seat_fee",
    ];

    public function Flight()
    {
        return $this->belongsTo(Flight::class);
    }
}
