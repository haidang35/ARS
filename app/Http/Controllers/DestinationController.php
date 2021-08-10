<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

class DestinationController extends Controller
{
    public function getAllDestination()
    {
        $destinations = Destination::all();
        return response()->json($destinations);
    }

    public function getDestinationDetails($id)
    {

        $destination = Destination::findOrFail($id);
        return response()->json($destination);
    }

    public function updateDestinationInfo($id, Request $request)
    {
        $data = [
            "city" => $request->city,
            "province" => $request->province,
            "airport_code" => $request->airport_code,
            "airport_name" => $request->airport_name,
            "country_code" => $request->country_code,
            "country" => $request->country

        ];
        $destination = Destination::findOrFail($id);
        $destination->update($data);
        return response()->json($destination);
    }
    public function addNewDestination(Request $request){
        $data = [
            "city" => $request->city,
            "province" => $request->province,
            "airport_code" => $request->airport_code,
            "airport_name" => $request->airport_name,
            "country_code" => $request->country_code,
            "country" => $request->country
        ];
        $destination = Destination::create($data);
        return response()->json($destination);
    }
}
