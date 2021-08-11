import axios from "axios";
import { BASE_URL } from "../../Constances/const";

const API_ENPOINT = {
    USER_LOGIN: "user/login",
    USER_REGISTER: "user/register",
    GET_USER_INFO: "user/my-info",
};

class AuthService {
    constructor() {
        if (AuthService._instance) {
            return AuthService._instance;
        }
        AuthService._instance = this;
    }

    userId = JSON.parse(window.localStorage.getItem("userId" || ""));
    userInfo = {};

    async userLogin(data) {
        return await axios.post(BASE_URL + API_ENPOINT.USER_LOGIN, data);
    }

    async userRegister(data) {
        return await axios.post(BASE_URL + API_ENPOINT.USER_REGISTER, data);
    }

    async getUserInfo() {
        let userInfo = (await axios.get(BASE_URL + API_ENPOINT.GET_USER_INFO))
            .data;
        this.userInfo = userInfo;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
}

const constance = new AuthService();
export default constance;
