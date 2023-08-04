import React, {useState} from "react";
import {AuthRequest} from "../request-handler/AuthRequest.jsx";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginHandler = () => {
        AuthRequest('login/', {username, password}, 'Invalid username or password');
    }

    return (<div style={{margin: '50px auto', marginTop: '150px', width: '50%'}}>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Username</span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                   aria-describedby="basic-addon1"
                   onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input type="password" className="form-control" placeholder="Password" aria-label="Password"
                   aria-describedby="basic-addon1"
                   onChange={(event) => setPassword(event.target.value)} />
        </div>
        {/* Display errorMessage if login fails */}
        <div style={{textAlign: 'center'}}>
            <button
                disabled={username === '' || password === ''}
                className='btn btn-success' onClick={loginHandler}> Login </button>
        </div>
        <hr />
        <div style={{textAlign: 'center'}}>
            <button className='btn btn-primary'
                    onClick={()=> window.location.href = '/auth/signup'}> Signup </button>
        </div>
    </div>)
}

export default Login;
