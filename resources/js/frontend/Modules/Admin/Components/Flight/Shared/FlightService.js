import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_FLIGHT: "flights",
    GET_FLIGHT_DETAILS: "flights/",
    UPDATE_FLIGHT_INFO:"flights/update/",
    ADD_NEW_FLIGHT:"flights"
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

    async getFlightDetails(id){
        return await axios.get(BASE_URL + API_ENPOINT.GET_FLIGHT_DETAILS + id);
    }

    async updateFlightInfo(id,data){
        return await axios.patch(BASE_URL + API_ENPOINT.UPDATE_FLIGHT_INFO + id,data);
    }

    async addNewFlight(data){
        return await axios.post(BASE_URL + API_ENPOINT.ADD_NEW_FLIGHT, data);
    }

}

const instance = new FlightService();
export default instance;



