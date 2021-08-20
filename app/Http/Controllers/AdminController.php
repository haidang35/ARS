<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use App\Models\Destination;
use App\Models\Flight;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getOverviewInfo()
    {
        $overview = [];
        $destinations = Destination::all();
        $airlines = Airline::all();
        $flights = Flight::all();
        $tickets = Flight::all();
        $bookings = Flight::all();
        $overview["destinations"] = $destinations;
        $overview["airlines"] = $airlines;
        $overview["flights"] = $flights;
        $overview["bookings"] = $bookings;
        $overview["tickets"] = $tickets;
        return response()->json($overview);
    }
}
