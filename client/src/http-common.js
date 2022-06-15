import axios from "axios";

export const houseHttp = axios.create({
    baseURL: "http://localhost:3000/housingAPI",
    headers: {
        "Content-type": "application/json"
    }
});

export const userHttp = axios.create({
    baseURL: "http://localhost:3000/userAPI",
    headers: {
        "Content-type": "application/json"
    }
});
