<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmMail;
use App\Models\Airline;
use App\Models\Booking;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Ticket;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Nexmo\Laravel\Facade\Nexmo;

class BookingController extends Controller
{
    public function getAllBooking()
    {
        $bookings = Booking::with("passenger")->get();
        foreach ($bookings as $item) {
            $ticket = $item["passenger"]->first();
            $item["ticket"] = Ticket::find($ticket->ticket_id);
            $item["flight"] = Flight::with("Airline")->with("Departure")->with("Destination")->find($item["ticket"]["flight_id"]);
        }
        return response()->json($bookings);
    }

    public function getBookingDetails($id)
    {
        $booking = Booking::with("passenger")->findOrFail($id);
        $ticket = $booking["passenger"]->first();
        $booking["ticket"] = Ticket::find($ticket->ticket_id);
        $booking["flight"] = Flight::with("Airline")->with("Departure")->with("Destination")->find($booking["ticket"]["flight_id"]);
        return response()->json($booking);
    }

    public function updateBooking($id, Request $request)
    {
        $booking = Booking::findOrFail($id);
        $booking->update([
            "vocative" => $request->vocative,
            "contact_name" => $request->contact_name,
            "contact_email" => $request->contact_email,
            "contact_phone" => $request->contact_phone,
            "address" => $request->address,
            "note" => $request->note,
        ]);
        return response()->json($booking);
    }

    public function updateBookingStatus($id, Request $request)
    {
        $booking = Booking::with("passenger")->findOrFail($id);
        $booking->update([
            "status" => $request->status
        ]);
        $ticket = $booking["passenger"]->first();
        $booking["ticket"] = Ticket::find($ticket->ticket_id);
        $flight = Flight::with("Airline")->with("Departure")->with("Destination")->find($booking["ticket"]["flight_id"]);
        $booking["flight"] = $flight;
        $departureTime = new DateTime($booking["flight"]["departure_datetime"]);
        $arrivalTime = new DateTime($booking["flight"]["arrival_datetime"]);
        // $time = (strtotime($arrivalTime->toTimeString()) - strtotime($departureTime->toTimeString())) / 60;
        $time = $arrivalTime->diff($departureTime);
        $offer = [
            'title' => 'Thông báo xác nhận yêu cầu đặt vé từ quý khách',
            'url' => 'http://127.0.0.1:8000/',
            'data' => $booking,
            "time" => $time->format('%h') . " Hours " . $time->format('%i') . " Minutes"
        ];
        $email = $booking["contact_email"];
        if ($booking["status"] == 3) {
            $flight->update([
                "seats_reserved" => $flight["seats_reserved"] - count($booking["passenger"]),
                "seats_available" => $flight["seats_available"] + count($booking["passenger"]),

            ]);
        } else if ($booking["status"] == 2) {
            $flight->update([
                "seats_reserved" => $flight["seats_reserved"] + count($booking["passenger"]),
                "seats_available" => $flight["seats_available"] - count($booking["passenger"]),

            ]);
        }
        Mail::to($email)->send(new ConfirmMail($offer));

        // Nexmo::message()->send([
        //     'to' => '84357446532',
        //     'from' => 'Dang Jinner',
        //     'text' => 'Hello Dang Jinner'
        // ]);


        // return new ConfirmMail($offer);

        return response()->json($booking);
    }
}
