import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../apiConfig.jsx";


export const DeleteRequest = (endpoint, headers, redirect) => {
    axios.delete(`${API_BASE_URL}/${endpoint}`, {headers})
        .then(response => {
            alert('Deleted Successfully!');
            window.location.href = redirect;
        })
        .catch(error => {
            console.error('Error:', error);
            // Inform the user
            alert('Failed to delete!');
        });
}
