<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;
    protected $table = "flights";
    protected $fillable = [
        "flight_code",
        "departure_datetime",
        "arrival_datetime",
        "aircraft",
        "airline_id",
        "departure_id",
        "destination_id",
        "capacity",
        "seats_reserved",
        "seats_available"

    ];

    public function Destination() {
        return $this->belongsTo(Destination::class);
    }

    public function Ticket() {
        return $this->hasMany(Ticket::class);
    }

    public function Departure() {
        return $this->belongsTo(Destination::class);
    }

    public function Airline() {
        return $this->belongsTo(Airline::class);
    }

    public function scopeDepartureTime($query, $departureTime) {
        $time = new Carbon($departureTime);
        return $query->whereDate("departure_datetime", $time->toDateString());
    }

    public function scopeDeparture($query, $departureId) {
        return $query->where("departure_id", $departureId);
    }

    public function scopeDestination($query, $destinationId) {
        return $query->where("destination_id", $destinationId);
    }

    
}
