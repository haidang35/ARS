import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_BOOKING: "bookings"
}

class BookingService {
    constructor() {
        if(BookingService._instance) {
            return BookingService._instance;
        }
        BookingService._instance = this;
    }

    async getAllBooking() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_BOOKING);
    }
}

const instance = new BookingService();
export default instance;



