<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $table = "bookings";
    protected $fillable = [
        "booking_date",
        "trip_type",
        "contact_name",
        "vocative",
        "contact_phone",
        "contact_email",
        "address",
        "note",
        "payment_method",
        "status",
        "into_money",
        "user_id"
    ];


    public function Passenger()
    {
        return $this->hasMany(BookingTicket::class);
    }
}
