import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_AIRLINE: "airlines",
    GET_AIRLINE_DETAILS: "airlines/",
    UPDATE_AIRLINE_INFO: "airlines/update/",
    ADD_NEW_AIRLINE: "airlines",
};

class AirlineService {
    constructor() {
        if (AirlineService._instance) {
            return AirlineService._instance;
        }
        AirlineService._instance = this;
    }

    async getAirlineList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_AIRLINE);
    }
    async getAirlineDetails(id) {
        return await axios.get(BASE_URL + API_ENPOINT.GET_AIRLINE_DETAILS + id);
    }
    async updateAirlineInfo(id, data) {
        return await axios.patch(
            BASE_URL + API_ENPOINT.UPDATE_AIRLINE_INFO + id,
            data
        );
    }
    async addNewAirline(data) {
        return await axios.post(BASE_URL + API_ENPOINT.ADD_NEW_AIRLINE, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }
}

const instance = new AirlineService();
export default instance;
