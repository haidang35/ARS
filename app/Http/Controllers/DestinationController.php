<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

class DestinationController extends Controller
{
    public function getAllDestination() {
        $destinations = Destination::all();
        return response()->json($destinations);
    }
}
