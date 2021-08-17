import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_DESTINATIONS: "destinations",
    GET_DESTINATION_DETAILS: "destinations/",
    UPDATE_DESTINATION: "destinations/update/",
    ADD_NEW_DESTINATION: "destinations",
    DELETE_DESTINATION: "destinations/",
    GET_FAVOURITE_DESTINATION: "destinations/favourite/get",
    UPLOAD_IMAGE_DESTINATION: "destinations/upload-image/",
    UPDATE_FAVOURITE: "destinations/favourite/",
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

    async addNewDestination(data) {
        return await axios.post(
            BASE_URL + API_ENPOINT.ADD_NEW_DESTINATION,
            data
        );
    }

    async getFavouriteDestinations() {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_FAVOURITE_DESTINATION
        );
    }

    async uploadImageDestination(id, data) {
        return await axios.post(
            BASE_URL + API_ENPOINT.UPLOAD_IMAGE_DESTINATION + id,
            data,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
    }
    async updateFavoriteDestination(id, data) {
        return await axios.put(
            BASE_URL + API_ENPOINT.UPDATE_FAVOURITE + id,
            data
        );
    }
}

const instance = new DestinationService();
export default instance;
