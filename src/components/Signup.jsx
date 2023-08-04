import React, {useState} from "react";
import {AuthRequest} from "../request-handler/AuthRequest.jsx";


const Signup = () => {
    const [userData, setUserData] = useState(
        {
            "username": '',
            "first_name": '',
            "last_name": '',
            "email": '',
            "password": ''
        }
    );
    const signupHandler = () => {
        AuthRequest('signup/', userData,
            'Signup failed. Please check the provided information and try again.');
    }


    return <div style={{margin: '50px auto', width: '50%'}}>
        <h5 style={{textAlign: 'center', marginTop: '100px'}}> Create New Account </h5>
        <div className="input-group mb-3" style={{marginTop: '30px'}}>
            <span className="input-group-text" id="basic-addon1">Username</span>
            <input onChange={(event) => setUserData({
                ...userData,
                'username': event.target.value
            })}
                   type="text" className="form-control"
                   placeholder='Username is lowercase, min 4 chars, not empty!' />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">First Name</span>
            <input onChange={(event) => setUserData({
                ...userData,
                'first_name': event.target.value
            })}
                   type="text" className="form-control" placeholder='Optional' />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Last Name</span>
            <input onChange={(event) => setUserData({
                ...userData,
                'last_name': event.target.value
            })}
                   type="text" className="form-control" placeholder='Optional' />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email</span>
            <input onChange={(event) => setUserData({
                ...userData,
                'email': event.target.value
            })}
                   type="email" className="form-control" id="exampleFormControlInput1"
                   placeholder='Optional ex: email@example.com' />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input onChange={(event) => setUserData({
                ...userData,
                'password': event.target.value
            })}
                   type="password" className="form-control"
                   placeholder='Password can not be empty or less than four characters' />
        </div>

        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <button onClick={() => window.location.href = '/auth'}
                    className='btn btn-secondary' style={{margin: '20px'}}> Cancel </button>

            <button onClick={() => signupHandler()}
                    disabled={userData['username'] === '' || userData['password'] === ''
                    || userData['username'].length < 4 || userData['password'].length < 4}
                    className='btn btn-primary' style={{margin: '20px'}}> Signup </button>
        </div>
    </div>
}

export default Signup;
