import axios from "axios";
import { refreshTokenAPI } from "../api/api";

const instance = axios.create({
    baseURL: process.env.REACT_APP_REFRESHTOKEN_URL,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    // config.data = {
    //     "refreshToken": localStorage.getItem("refreshToken")
    // }
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
    config.headers["ngrok-skip-browser-warning"] = true;

    return config;
});

const maxRetryAttempts = 1;
let attemts = 0;

instance.interceptors.response.use(
    function (response) {
        if (response.config.url === "auth/refresh") {
            localStorage.setItem("accessToken", response.data.accessToken);
        }
        return response;
    },
    async function (error) {
        const config = error.config;
// console.log("Sa");
        if (error.response && error.response.status === 401 && error.response.data.message == "Access token expired" && !config._retry) {

            const intervalID = setInterval(function () {
                attemts++;
                if (attemts > maxRetryAttempts) {
                    clearInterval(intervalID);
                }
                else {
                    refreshTokenAPI();
                }
            }, 1000);

        } else if (error.response.status === 401 && error.response.data.message == "Refresh token expired") {
            // console.log("err");
            // localStorage.clear()t;
            // window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default instance;