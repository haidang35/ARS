<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use Illuminate\Http\Request;

class AirlineController extends Controller
{
    public function getAllAirline()
    {
        $airlines = Airline::all();
        return response()->json($airlines);
    }
    public function getAirlineDetails($id)
    {
        $airline = Airline::find($id);
        return response()->json($airline);
    }
    public function updateAirlineInfo($id, Request $request)
    {
        $data = [
            "airline_name" => $request->airline_name,
            "code" => $request->code,
            "country" => $request->country,
            "website" => $request->website,
            "hotline" => $request->hotline,
        ];
        $airline = Airline::find($id);
        $airline->update($data);
        return response()->json($airline);
    }
    public function addNewAirline(Request $request)
    {
        $request->validate([
            "image" => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $imageName = time() . "." . $request->image->extension();
        $request->image->move(public_path("images/airline"), $imageName);
        $data = [
            "airline_name" => $request->airline_name,
            "code" => $request->code,
            "country" => $request->country,
            "website" => $request->website,
            "hotline" => $request->hotline,
            "logo" => $imageName
        ];
        $airline = Airline::create($data);
        return response()->json($airline);
    }

    public function deleteAirline($id)
    {
        $airline = Airline::findOrFail($id);
        $airline->delete();
        return $airline;
    }
}
