import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_FLIGHT: "flights"
}

class FlightService {
    constructor() {
        if(FlightService._instance) {
            return FlightService._instance;
        }
        FlightService._instance = this;
    }

    async getFlightList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_FLIGHT);
    }
}

const instance = new FlightService();
export default instance;



