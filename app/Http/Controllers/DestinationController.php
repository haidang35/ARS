<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;
use App\Models\Image;

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
    public function addNewDestination(Request $request)
    {
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

    public function updateFavouriteDestination($id, Request $request)
    {
        $destination = Destination::find($id);
        $destination->update([
            "favourite" => $request->favourite
        ]);
        return response()->json($destination);
    }

    public function getFavouriteDestinations()
    {
        $destinations = Destination::withCount("Flight")->with("Image")->get();
        collect($destinations)->sortBy('flight_count')->reverse()->toArray();
        return  response()->json($destinations->take(5));
    }

    public function uploadImageDestination($id, Request $request)
    {
        $request->validate([
            "image" => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $imageName = time() . "." . $request->image->extension();
        $request->image->move(public_path("images/destination"), $imageName);
        $newImg = Image::create([
            "destination_id" => $id,
            "image_name" => $imageName
        ]);

        return $newImg;
    }

    public function deleteDestination($id)
    {
        $destination = Destination::find($id);
        $destination->delete();
        return response()->json($destination);
    }

    public function getImageList($destinationId)
    {
        $images = Image::where("destination_id", $destinationId)->get();
        return response()->json($images);
    }
}
