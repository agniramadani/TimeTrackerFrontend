import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig.jsx";


export const PutRequest = (endpoint, data, headers, redirect) => {
    axios.put(`${API_BASE_URL}/${endpoint}`, data, {headers})
        .then(response => {
            alert('Updated Successfully!');
            window.location.href = redirect;
        })
        .catch(error => {
            console.error('Error:', error);
            // Inform the user
            alert('Failed to update!');
        });
}
