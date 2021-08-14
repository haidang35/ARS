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
    public function getAirlineDetails($id){
        $airline = Airline::find($id);
        return response()->json($airline);
    }
    public function updateAirlineInfo($id,Request $request){
        $data = [
            "airline_name"=>$request->airline_name,
            "code"=>$request->code,
            "country"=>$request->country,
            "website"=>$request->website,
            "hotline"=>$request->hotline,
        ];
        $airline = Airline::find($id);
        $airline->update($data);
        return response()->json($airline);
    }
    public function addNewAirline(Request $request){
        $data = [
            "airline_name" => $request->airline_name,
            "code" => $request->code,
            "country" => $request->country,
            "website" => $request->website,
            "hotline" => $request->hotline
        ];
        $airline = Airline::create($data);
        return response()->json($airline);
    }

 
}
