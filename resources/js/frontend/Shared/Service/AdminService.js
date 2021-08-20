const { default: axios } = require("axios");
const { BASE_URL } = require("../../Constances/const");

const API_ENDPOINT = {
    GET_OVERVIEW_INFO: "overview-info",
};
class AdminService {
    constructor() {
        if (AdminService._instance) {
            return AdminService._instance;
        }
        AdminService._instance = this;
    }

    async getOverView() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_OVERVIEW_INFO);
    }
}

const instance = new AdminService();
export default instance;
