<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use Illuminate\Http\Request;

class AirlineController extends Controller
{
    public function getAllAirline() {
        $airlines = Airline::all();
        return response()->json($airlines);
    }
}
