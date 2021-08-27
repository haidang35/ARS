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
        "business_seats",
        "economy_seats",
        "first_economy_seats",
        "exit_seats",
        "seats_reserved",
        "seats_available",
        "status"

    ];

    public function Destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function Ticket()
    {
        return $this->hasMany(Ticket::class);
    }

    public function Departure()
    {
        return $this->belongsTo(Destination::class);
    }

    public function Airline()
    {
        return $this->belongsTo(Airline::class);
    }

    public function Price()
    {
        return $this->hasMany(Price::class);
    }

    public function FlightSeat()
    {
        return $this->hasOne(FlightSeat::class);
    }

    public function scopeDepartureTime($query, $departureTime)
    {
        if ($departureTime == null && $departureTime == "") {
            return $query;
        }
        $time = new Carbon($departureTime);
        return $query->whereDate("departure_datetime", $time->toDateString());
    }

    public function scopeDeparture($query, $departureId)

    {
        if ($departureId == null && $departureId == "") {
            return $query;
        }
        return $query->where("departure_id", $departureId);
    }

    public function scopeDestination($query, $destinationId)
    {
        if ($destinationId == null && $destinationId == "") {
            return $query;
        }
        return $query->where("destination_id", $destinationId);
    }

    public function scopeSearchFlight($query, $searchValue)
    {
        if ($searchValue == "" || $searchValue == null) {
            return $query;
        }
        return $query->where("flight_code", 'LIKE', "%" . $searchValue . "%");
    }
}
