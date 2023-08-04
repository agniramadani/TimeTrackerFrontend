import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem("is_authenticated")

    return auth === "true" ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
