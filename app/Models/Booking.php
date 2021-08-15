<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        "payment_status",
        "user_id"
    ];


    public function passenger(): HasMany
    {
        return $this->hasMany(BookingTicket::class);
    }
}
