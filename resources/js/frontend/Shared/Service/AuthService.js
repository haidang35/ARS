

class AuthService {
    constructor() {
        if (AuthService._instance) {
            return AuthService._instance;
        }
        AuthService._instance = this;
    }

    userId = JSON.parse(window.localStorage.getItem("userId") || '');


}

const constance = new AuthService();
export default constance;