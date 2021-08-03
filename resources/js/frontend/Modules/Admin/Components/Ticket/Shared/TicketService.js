import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_TICKET: "tickets"
}

class TicketService {
    constructor() {
        if(TicketService._instance) {
            return TicketService._instance;
        }
        TicketService._instance = this;
    }

    async getTicketList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_TICKET);
    }
}

const instance = new TicketService();
export default instance;



