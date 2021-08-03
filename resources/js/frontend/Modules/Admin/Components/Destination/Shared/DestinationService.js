import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_DESTINATIONS: "destinations"
}

class DestinationService {
    constructor() {
        if(DestinationService._instance) {
            return DestinationService._instance;
        }
        DestinationService._instance = this;
    }

    async getDestinationList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_DESTINATIONS);
    }
}

const instance = new DestinationService();
export default instance;

