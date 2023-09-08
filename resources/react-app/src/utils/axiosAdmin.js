import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // API'nizin temel URL'si
});

// Axios instance'ınızı kullanarak bir istek yaparken JWT'yi eklemek için bir interceptor ekleyebilirsiniz
axiosInstance.interceptors.request.use(
    function (request) {
        const token = Cookies.get("jwt");
        if (token) {
            request.headers["Authorization"] = "Bearer " + token;
        }
        return request;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;
