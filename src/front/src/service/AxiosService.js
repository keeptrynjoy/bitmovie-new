import React from "react";
import axios from "axios";

// 최초 작업자: 권능
// 2022-07-16
const AxiosService = axios.create({
    baseURL: "http://localhost:8282",
    timeout: 5000,
});

export default AxiosService;