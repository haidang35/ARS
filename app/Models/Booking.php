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
        "ticket_id",
        "checkin_bag",
        "contact_name",
        "contact_phone",
        "contact_email",
        "status",
        "into_money",
        "user_id"
    ];

    public function Ticket() {
        return $this->belongsTo(Ticket::class);
    }

    public function Passenger() {
        return $this->hasMany(Passenger::class);
    }
}
