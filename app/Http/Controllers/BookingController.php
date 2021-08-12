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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        $booking["flight"] = Flight::with("Airline")->with("Departure")->with("Destination")->find($booking["ticket"]["flight_id"]);
        $departureTime = new Carbon($booking["flight"]["departure-datetime"]);
        $arrivalTime = new Carbon($booking["flight"]["arrival_datetime"]);
        $time = (strtotime($arrivalTime->toTimeString()) - strtotime($departureTime->toTimeString())) / 60;
        $offer = [
            'title' => 'Thông báo xác nhận yêu cầu đặt vé từ quý khách',
            'url' => 'http://127.0.0.1:8000/',
            'data' => $booking,
            "flight_duration" => $time
        ];
        $email = $booking["contact_email"];
        Mail::to($email)->send(new ConfirmMail($offer));

        // return new ConfirmMail($offer);

        return response()->json($booking);
    }
}
