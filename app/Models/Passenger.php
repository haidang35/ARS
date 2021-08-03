<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    use HasFactory;
    protected $table = "passengers";
    protected $fillable = [
        "passenger_name",
        "vocative",
        "birthday",
        "address",
        "passenger_type",
        "booking_id"
    ];

    public function Booking() {
        return $this->belongsTo(Booking::class, "booking_id", "id");
    }
}
