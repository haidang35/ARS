import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_PASSENGER: "passengers",

}

class PassengerService {
    constructor() {
        if(PassengerService._instance) {
            return PassengerService._instance;
        }
        PassengerService._instance = this;
    }

    async getAllPassenger() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_PASSENGER);
    }


}

const instance = new PassengerService();
export default instance;



