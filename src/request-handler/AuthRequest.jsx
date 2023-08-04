import {API_BASE_URL} from "../apiConfig.jsx";
import axios from "axios";

export const AuthRequest = (endpoint, data, errorMessage) => {
    axios.post(`${API_BASE_URL}/${endpoint}`, data)
        .then(response => {
            // Store user data
            localStorage.setItem("is_authenticated", 'true')
            localStorage.setItem("token", response.data['token']);
            localStorage.setItem("user_id", response.data['user']['id'].toString());
            localStorage.setItem("username", response.data['user']['username']);
            localStorage.setItem("is_superuser", response.data['user']['is_superuser']);
            // Redirect to the homepage
            window.location.href = '/';
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
            // Inform the user
            alert(errorMessage)
        });
}