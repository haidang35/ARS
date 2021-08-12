import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_DESTINATIONS: "destinations",
    GET_DESTINATION_DETAILS: "destinations/",
    UPDATE_DESTINATION: "destinations/update/",
    ADD_NEW_DESTINATION: "destinations",
    DELETE_DESTINATION:"destinations/"
};


class DestinationService {
    constructor() {
        if (DestinationService._instance) {
            return DestinationService._instance;
        }
        DestinationService._instance = this;
    }

    async getDestinationList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_DESTINATIONS);
    }

    async getDestinationDetails(id) {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_DESTINATION_DETAILS + id
        );
    }

    async updateDestination(id, data) {
        return await axios.patch(
            BASE_URL + API_ENPOINT.UPDATE_DESTINATION + id,
            data
        );
    }

    async addNewDestination(data){
        return await axios.post(BASE_URL + API_ENPOINT.ADD_NEW_DESTINATION,data);
    }


}

const instance = new DestinationService();
export default instance;
