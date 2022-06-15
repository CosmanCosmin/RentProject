import { useNavigate } from "react-router-dom";
import { userHttp } from "../http-common";

const login = (data) => {
    return userHttp
        .post("/login", data)
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res.data;
        })
}

const register = (data) => {
    return userHttp
        .post("/register", data)
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res.data;
        })
}

const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const userService = {
    login,
    register,
    logOut,
    getCurrentUser
};

export default userService;