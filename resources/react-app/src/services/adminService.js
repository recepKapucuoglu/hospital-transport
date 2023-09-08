import axiosAdmin from "../utils/axiosAdmin";
const logOutAdmin = (value) => {
    return axiosAdmin
        .post("/logout", {
            serial_no: value,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getAllYolcu = (value) => {
    return axiosAdmin
        .get(`/getall-yolcu?page=${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getAllYolcuTipi = (value) => {
    return axiosAdmin
        .get(`/getall-yolcutipi`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getAllArac = (value) => {
    return axiosAdmin
        .get(`/getall-arac?page=${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getAllTransfer = (value) => {
    return axiosAdmin
        .get(`/getall-transfer?page=${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};

const addYolcuAdmin = (value) => {
    return axiosAdmin
        .post(`/add-yolcu`,value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const addAracAdmin = (value) => {
    return axiosAdmin
        .post(`/add-arac`,value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const addTransferAdmin = (value) => {
    return axiosAdmin
        .post(`/add-transfer`,value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getYolcuAdmin = (value) => {
    return axiosAdmin
        .get(`/get-yolcu/${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getTransferAdmin = (value) => {
    return axiosAdmin
        .get(`/get-transfer/${value}`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const putYolcuAdmin = (value) => {
    return axiosAdmin
        .put(`/put-yolcu`,value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const putTransferAdmin = (value) => {
    return axiosAdmin
        .put(`/put-transfer`,value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const deleteYolcu = (value) => {
    return axiosAdmin
        .delete(`/delete-yolcu/${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const deleteArac = (value) => {
    return axiosAdmin
        .delete(`/delete-arac/${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const getAracAdmin = (value) => {
    return axiosAdmin
        .get(`/get-arac/${value}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};
const putAracAdmin = (value) => {
    return axiosAdmin
        .put(`/put-arac`,value)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });
};


const salesPointService = {
    logOutAdmin,
    getAllYolcu,
    getAllYolcuTipi,
    getAllArac,
    getAllTransfer,
    addYolcuAdmin,
    addAracAdmin,
    addTransferAdmin,
    getYolcuAdmin,
    getTransferAdmin,
    putYolcuAdmin,
    putTransferAdmin,
    deleteYolcu,
    deleteArac,
    getAracAdmin,
    putAracAdmin,
};
export default salesPointService;
