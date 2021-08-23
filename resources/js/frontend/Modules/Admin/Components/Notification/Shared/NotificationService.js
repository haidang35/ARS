import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENDPOINT = {
    GET_NOTIFICATION_LIST: "notifications",
    GET_NEW_NOTIFICATION: "notifications/new",
    UPDATE_READ_NOTIFICATION: "notifications/update",
};

class NotificationService {
    constructor() {
        if (NotificationService._instance) {
            return NotificationService._instance;
        }
        NotificationService._instance = this;
    }

    async getNotificationList() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_NOTIFICATION_LIST);
    }

    async getNewNotifications() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_NEW_NOTIFICATION);
    }

    async updateNotification() {
        return await axios.patch(
            BASE_URL + API_ENDPOINT.UPDATE_READ_NOTIFICATION
        );
    }
}

const instance = new NotificationService();
export default instance;
