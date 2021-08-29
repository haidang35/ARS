import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_FLIGHT: "flights",
    GET_FLIGHT_DETAILS: "flights/",
    UPDATE_FLIGHT_INFO: "flights/update/",
    ADD_NEW_FLIGHT: "flights",
    DELETE_FLIGHT: "flights/",
    GET_CLASS_PRICE_FLIGHT: "flights/class/",
    GET_SEAT_RESERVED: "flights/seats-reserved/",
};

class FlightService {
    constructor() {
        if (FlightService._instance) {
            return FlightService._instance;
        }
        FlightService._instance = this;
    }

    async getFlightList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_FLIGHT);
    }

    async getFlightDetails(id) {
        return await axios.get(BASE_URL + API_ENPOINT.GET_FLIGHT_DETAILS + id);
    }

    async updateFlightInfo(id, data) {
        return await axios.patch(
            BASE_URL + API_ENPOINT.UPDATE_FLIGHT_INFO + id,
            data
        );
    }

    async addNewFlight(data) {
        return await axios.post(BASE_URL + API_ENPOINT.ADD_NEW_FLIGHT, data);
    }

    async deleteFlight(id) {
        return await axios.delete(BASE_URL + API_ENPOINT.DELETE_FLIGHT + id);
    }

    async getClassAndPrice(flightId) {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_CLASS_PRICE_FLIGHT + flightId
        );
    }

    async getSeatsReserved(flightId) {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_SEAT_RESERVED + flightId
        );
    }
}

const instance = new FlightService();
export default instance;
