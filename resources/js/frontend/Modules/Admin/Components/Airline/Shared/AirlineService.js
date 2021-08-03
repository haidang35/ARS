import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_AIRLINE: "airlines"
}

class AirlineService {
    constructor() {
        if(AirlineService._instance) {
            return AirlineService._instance;
        }
        AirlineService._instance = this;
    }

    async getAirlineList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_AIRLINE);
    }
}

const instance = new AirlineService();
export default instance;

