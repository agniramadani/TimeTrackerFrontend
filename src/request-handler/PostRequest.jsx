import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig.jsx";

export const PostRequest = (endpoint, data, headers, redirect) => {
    axios.post(`${API_BASE_URL}/${endpoint}`, data, {headers})
        .then(response => {
            if(response.status === 201){
                alert('Created successfully!');
                window.location.href = redirect
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
