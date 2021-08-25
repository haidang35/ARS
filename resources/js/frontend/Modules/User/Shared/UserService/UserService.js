import axios from "axios";
import { BASE_URL } from "../../../../Constances/const";

const API_ENDPOINT = {
    GET_ALL_DESTINARION: "destinations",
    SEARCH_FLIGHT: "user/flights/search",
    GET_DESTINATION_INFO: "user/destinations/",
    GET_ALL_FLIGHT_FOLLOW_DATE: "user/flights",
    GET_FLIGHT_TICKET_INFO: "user/flights/ticket/",
    BOOKING_FLIGHT: "user/booking",
    GET_FLIGHT_ROUTE: "user/find-route",
    PAYMENT_BOOKING: "user/booking/payment/",
    GET_BOOKING_INFO: "user/booking/",
    GET_TICKET_LOCATION_DEPARTURE: "tickets/location/",
    GET_DISCOUNT_TICKET: "discount-tickets",
    CANCEL_BOOKING: "user/booking/",
    SEARCH_FLIGHT_INFO: "user/search/flight",
    GET_BOOKING_INFO_WITH_CODE: "user/booking-info/",
};

class UserService {
    constructor() {
        if (UserService._instance) {
            return UserService._instance;
        }
        UserService._instance = this;
    }

    async getAllDestination() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ALL_DESTINARION);
    }

    async searchFlight(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.SEARCH_FLIGHT, data);
    }

    async getDestinationInfo(destinationId) {
        return await axios.get(
            BASE_URL + API_ENDPOINT.GET_DESTINATION_INFO + destinationId
        );
    }

    async getFlightListWithoutDate(data) {
        return await axios.post(
            BASE_URL + API_ENDPOINT.GET_ALL_FLIGHT_FOLLOW_DATE,
            data
        );
    }

    async getFlightTicketInfo(ticketId, data = []) {
        return await axios.post(
            BASE_URL + API_ENDPOINT.GET_FLIGHT_TICKET_INFO + ticketId,
            data
        );
    }

    async bookingFlightTicket(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.BOOKING_FLIGHT, data);
    }

    async getFlightRoute(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.GET_FLIGHT_ROUTE, data);
    }

    async paymentBooking(bookingId, data) {
        return await axios.put(
            BASE_URL + API_ENDPOINT.PAYMENT_BOOKING + bookingId,
            data
        );
    }

    async getBookingInfo(bookingId) {
        return await axios.get(
            BASE_URL + API_ENDPOINT.GET_BOOKING_INFO + bookingId
        );
    }

    async getTicketsWithLocationDeparture(departureId) {
        return await axios.get(
            BASE_URL + API_ENDPOINT.GET_TICKET_LOCATION_DEPARTURE + departureId
        );
    }

    async getDiscountTicket() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_DISCOUNT_TICKET);
    }

    async cancelBooking(bookingId) {
        return await axios.delete(
            BASE_URL + API_ENDPOINT.CANCEL_BOOKING + bookingId
        );
    }

    async searchFlightInfo(data) {
        return await axios.post(
            BASE_URL + API_ENDPOINT.SEARCH_FLIGHT_INFO,
            data
        );
    }

    async getBookingInfoWithCode(bookingCode) {
        return await axios.get(
            BASE_URL + API_ENDPOINT.GET_BOOKING_INFO_WITH_CODE + bookingCode
        );
    }
}

const instance = new UserService();
export default instance;
