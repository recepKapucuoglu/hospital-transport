import axiosClient from "../utils/axiosClient";
const loginAdmin = (value) => {
    return axiosClient
        .post("/login", value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};

const salesPointService = {
    loginAdmin,
};
export default salesPointService;