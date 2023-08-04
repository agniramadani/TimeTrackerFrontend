import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/ProtectedRoute.jsx";
import Projects from "./components/Projects.jsx";
import Account from "./components/Account.jsx";
import Signup from "./components/Signup.jsx";
import Users from "./components/Users.jsx";
import Login from "./components/Login.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth">
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                <Route path="/*" element={
                    // The routes nested under PrivateRoute require user authentication.
                    <PrivateRoute>
                        <Routes>
                            <Route index element={<Users />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="account" element={<Account />}/>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
