import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_TICKET: "tickets",
    GET_TICKET_DETAILS: "tickets/",
    UPDATE_TICKET_INFO:"tickets/update/",
    ADD_NEW_TICKET :  "tickets"
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

    async getTicketDetails (id){
        return await axios.get(BASE_URL + API_ENPOINT.GET_TICKET_DETAILS + id);
    }

    async updateTicketInfo(id,data){
        return await axios.patch(BASE_URL + API_ENPOINT.UPDATE_TICKET_INFO + id,data);
    }

    async addNewTicket(data){
        return await axios.post(BASE_URL + API_ENPOINT.ADD_NEW_TICKET,data);
    }
}

const instance = new TicketService();
export default instance;



