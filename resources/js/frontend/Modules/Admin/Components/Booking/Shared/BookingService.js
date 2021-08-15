import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_BOOKING: "bookings",
    GET_BOOKING_DETAILS: "bookings/",
    UPDATE_BOOKING: "bookings/update/",
    UPDATE_STATUS: "bookings/confirm/",
};

class BookingService {
    constructor() {
        if (BookingService._instance) {
            return BookingService._instance;
        }
        BookingService._instance = this;
    }

    async getAllBooking() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_BOOKING);
    }

    async getBookingDetails(bookingId) {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_BOOKING_DETAILS + bookingId
        );
    }

    async updateBooking(bookingId, data) {
        return await axios.patch(
            BASE_URL + API_ENPOINT.UPDATE_BOOKING + bookingId,
            data
        );
    }

    async updateStatus(bookingId, status) {
        return await axios.put(
            BASE_URL + API_ENPOINT.UPDATE_STATUS + bookingId,
            status
        );
    }
}

const instance = new BookingService();
export default instance;
