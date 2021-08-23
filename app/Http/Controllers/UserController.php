<?php

namespace App\Http\Controllers;

use App\Events\NotificationEvent;
use App\Mail\MailCheckout;
use App\Models\Booking;
use App\Models\BookingTicket;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Notification as ModelsNotification;
use App\Models\Passenger;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\OffersNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class UserController extends Controller
{

    public function searchTickets(Request $request)
    {
        $tripType = $request->trip_type;
        $passenger = $request->passenger;
        $departureTime = $request->departure_time;
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flights = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
            ->departure($departureId)->destination($destinationId)->departuretime($departureTime)
            ->get();
        $tickets = [];
        $departureTimeConvert = new Carbon($departureTime);
        if ($departureTimeConvert->isToday() || $departureTimeConvert->isFuture()) {
            $passengerQuantity = 0;
            foreach ($passenger as $item) {
                $passengerQuantity += $item["quantity"];
            }
            foreach ($flights as $flight) {
                if ($flight["seats_available"] >= $passengerQuantity) {
                    $ticketFlight = Ticket::where("flight_id", $flight->id)->get();
                    foreach ($ticketFlight as $item) {
                        $item["trip_type"] = $tripType;
                        $item["passenger"] = $passenger;
                        $item["flight"] = $flight;
                        $item["total_price"] = $item->price + $item->tax;
                        $item["into_money"] = $this->calcIntoMoney($passenger, $item->price, $item->tax);
                        $tickets[] = $item;
                    }
                }
            }
        }

        return $tickets;
    }

    private function calcIntoMoney($passengers, $price, $tax)
    {
        $intoMoney = 0;
        foreach ($passengers as $item) {
            if ($item["quantity"] > 0) {
                $intoMoney += $item["quantity"] * ($price + $tax);
            }
        }
        return $intoMoney;
    }


    public function getDestinationInfo($id)
    {
        $destination = Destination::find($id);
        return response()->json($destination);
    }

    public function searchTicketsWithoutDate(Request $request)
    {
        $tripType = $request->trip_type;
        $passenger = $request->passenger;
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flights = [];
        $flights = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
            ->departure($departureId)->destination($destinationId)
            ->get();
        $tickets = [];
        $passengerQuantity = 0;
        foreach ($passenger as $item) {
            $passengerQuantity += $item["quantity"];
        }
        foreach ($flights as $flight) {
            $departureTime = new Carbon($flight["departure_datetime"]);
            if ($flight["seats_available"] >= $passengerQuantity && !$departureTime->isPast()) {
                $ticketFlight = Ticket::where("flight_id", $flight->id)->get();
                foreach ($ticketFlight as $item) {
                    $item["trip_type"] = $tripType;
                    $item["passenger"] = $passenger;
                    $item["flight"] = $flight;
                    $item["total_price"] = $item->price + $item->tax;
                    $item["into_money"] = $this->calcIntoMoney($passenger, $item->price, $item->tax);
                    $tickets[] = $item;
                }
            }
        }

        return $tickets;
    }

    public function getFlightTicket($id, Request $request)
    {
        $tripType = $request->trip_type;
        $passenger = $request->passenger;
        $ticket = Ticket::findOrFail($id);
        $flight = Flight::with("Departure")->with("Destination")->with("Airline")->find($ticket->flight_id);
        $ticket["trip_type"] = $tripType;
        $ticket["passenger"] = $passenger;
        $ticket["total_price"] = $ticket->price + $ticket->tax;
        $ticket["into_money"] = $this->calcIntoMoney($passenger, $ticket->price, $ticket->tax);
        $ticket["flight"] = $flight;
        return response()->json($ticket);
    }

    public function bookingFlightTicket(Request $request)
    {
        $bookingInfo = [
            "booking_date" => $request->booking_date,
            "trip_type" => $request->trip_type,
            "contact_name" => $request->contact_name,
            "vocative" => $request->vocative,
            "contact_phone" => $request->contact_phone,
            "contact_email" => $request->contact_email,
            "address" => $request->address,
            "note" => $request->note,
            "payment_method" => $request->payment_method,
            "status" => 1,
            "into_money" => $request->into_money,
            "payment_status" => $request->payment_status,
            "user_id" => $request->user_id,
        ];
        $booking = Booking::create($bookingInfo);
        $ticket = Ticket::findOrFail($request->ticket_id);
        $booking["ticket"] = $ticket;
        $flight = Flight::with("Destination")->with("Departure")->with("Airline")->find($ticket->flight_id);
        $booking["flight"] = $flight;
        $passengers = [];
        $passengersBooking = [];
        $passengers = $request->passengers;
        $into_money = 0;
        foreach ($passengers as $item) {
            $bookingTicketInfo = [
                "booking_id" => $booking->id,
                "ticket_id" => $request->ticket_id,
                "passenger_name" => $item["passenger_name"],
                "gender" => $item["gender"],
                "birthday" => $item["birthday"],
                "passenger_type" => $item["passenger_type"],

            ];
            $into_money += $ticket->price + $ticket->tax;
            $bookingTicket = BookingTicket::create($bookingTicketInfo);
            $passengersBooking[] = $bookingTicket;
        }
        $booking["passengers"] = $passengersBooking;
        $booking["into_money"] = $into_money;
        $this->sendNotification("Có yêu cầu đặt vé mới", $booking["contact_name"] . " đã đặt vé máy bay từ " . $flight["departure"]["city"] . " đến " . $flight["destination"]["city"]);
        return $booking;
    }

    public function findRouteFlight(Request $request)
    {
        $departureId = $request->departure_id;
        $destinationId = $request->destination_id;
        $departure = Destination::findOrFail($departureId);
        $destination = Destination::findOrFail($destinationId);
        $data = [];
        $data["destination"] = $destination;
        $data["departure"]  = $departure;
        return response()->json($data);
    }

    public function paymentBooking($bookingId, Request $request)
    {
        $booking = Booking::findOrFail($bookingId);
        $booking->update([
            "payment_status" => $request->payment_status
        ]);
        // if ($request->payment_status == 1) {

        //     $email = $booking["contact_email"];
        //     Mail::to($email)->send(new MailCheckout($booking));
        // }
        return response()->json($booking);
    }

    public function getBookingInfo($bookingId)
    {
        $booking = Booking::with("passenger")->findOrFail($bookingId);
        $bookingTicket = BookingTicket::where("booking_id", $booking["id"])->with("Ticket")->first();
        $ticket = Ticket::find($bookingTicket["ticket_id"]);
        $flight = Flight::with("Destination")->with("Departure")->with("Airline")->find($bookingTicket["ticket"]["flight_id"]);
        $booking["flight"] = $flight;
        $booking["ticket"] = $ticket;

        return $booking;
    }

    public function bookingPayment()
    {
        $message = "";
        return new MailCheckout($message);
    }

    public function cancelBooking($id)
    {
        $booking = Booking::findOrFail($id);
        $booking_ticket = BookingTicket::where("booking_id", $booking["id"])->first();
        $ticket = Ticket::findOrFail($booking_ticket["ticket_id"]);
        $flight = Flight::with("Departure")->with("Destination")->findOrFail($ticket["flight_id"]);
        $booking["flight"] = $flight;
        $passengers = BookingTicket::where('booking_id', $booking["id"])->get();
        foreach ($passengers as $item) {
            $item->delete();
        }
        $booking->delete();
        return response()->json($booking);
    }

    public function getBookingDetails($id)
    {
        $booking = Booking::find($id);
        $bookingTicket = BookingTicket::where("booking_id", $booking["id"])->first();
        $flight = Flight::with("Departure")->with("Destination")->with("Airline")->find($bookingTicket["flight_id"]);
        $booking["flight"] = $flight;
        return $booking;
    }

    // public function sendNotification()
    // {
    //     $users = User::where("roleId", 1)->get();
    //     $offerData = [
    //         'name' => 'BOGO',
    //         'body' => 'You received an offer.',
    //         'thanks' => 'Thank you',
    //         'offerText' => 'Check out the offer',
    //         'offerUrl' => url('/'),
    //         'offer_id' => 007
    //     ];
    //     foreach ($users as $item) {
    //         Notification::send($item, new OffersNotification($offerData));
    //     }
    //     return "Success";
    // }

    public function sendNotification($title, $content)
    {
        $notice = ModelsNotification::create([
            "title" => $title,
            "content" => $content
        ]);
        broadcast(new NotificationEvent($notice->load("User")))->toOthers();
    }
}
