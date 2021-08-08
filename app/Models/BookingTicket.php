<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingTicket extends Model
{
    use HasFactory;
    protected $table = "bookings_tickets";
    protected $fillable = [
        "booking_id",
        "ticket_id",
        "passenger_name",
        "gender",
        "birthday",
        "passenger_type"
    ];
}
