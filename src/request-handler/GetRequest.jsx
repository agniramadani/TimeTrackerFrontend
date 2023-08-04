import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig.jsx";

export const GetRequest = (endpoint, headers, setData) => {
    axios.get(`${API_BASE_URL}/${endpoint}`, {headers})
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
