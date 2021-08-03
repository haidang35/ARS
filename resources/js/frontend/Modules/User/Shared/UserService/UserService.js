import axios from "axios";
import { BASE_URL } from "../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_DESTINARION: "destinations",
    SEARCH_FLIGHT: "user/flights/search"
}

class UserService {
    constructor() {
        if(UserService._instance) {
            return UserService._instance;
        }
        UserService._instance = this;
    }

    async getAllDestination() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_DESTINARION);
    }

    async searchFlight(data) {
        return await axios.post(BASE_URL + API_ENPOINT.SEARCH_FLIGHT, data);
    }
}

const instance = new UserService();
export default instance;



