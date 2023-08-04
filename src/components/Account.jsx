import React, {useEffect, useState} from "react";
import Navbar from "./Navbar.jsx";
import {FormatTime} from "./FormatTime.jsx";
import {GetRequest} from "../request-handler/GetRequest.jsx";
import {PutRequest} from "../request-handler/PutRequest.jsx";


const Account = () => {
    const [totalHours, setTotalHours] = useState([]);
    const [userData, setUserData] = useState([]);
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `token ${token}`, };
    const [edit, setEdit] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Make the API call
        GetRequest(`userTotalHours/${userId}`, headers, setTotalHours);
        GetRequest(`user/${userId}`, headers, setUserData);
    }, []);

    const saveHandler = () => {
        PutRequest(`user/${userId}`, userData, headers, '/account')
    }

    const changePasswordHandler = () => {
        PutRequest(`user/${userId}`, {'password': password}, headers, '/account')
    }

    const Profile = () => {
        return <div style={{margin: '50px auto', width: '50%'}}>
            <h5 style={{textAlign: 'center', marginTop: '100px'}}> User Profile </h5>
            <ul className="list-group list-group" style={{marginTop: '20px'}}>
                <li className="list-group-item">
                    <span style={{ fontWeight: 'bold' }}>Username: </span> {userData['username']}</li>
                <li className="list-group-item">
                    <span style={{ fontWeight: 'bold' }}>First Name: </span> {userData['first_name']}</li>
                <li className="list-group-item">
                    <span style={{ fontWeight: 'bold' }}>Last Name: </span> {userData['last_name']}</li>
                <li className="list-group-item">
                    <span style={{ fontWeight: 'bold' }}>Email: </span> {userData['email']}</li>
            </ul>
            <button onClick={()=> setEdit(true)}
                    className='btn btn-primary' style={{marginTop: '20px'}}> Edit Profile </button>
        </div>
    }

    const editProfile = () => {
        return(<div style={{margin: '50px auto', width: '50%'}}>
                <h5 style={{textAlign: 'center', marginTop: '100px'}}> Edit Profile </h5>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Username</span>
                    <input onChange={(event) => setUserData({
                            ...userData,
                            'username': event.target.value
                        })}
                        type="text" className="form-control"
                           placeholder={userData['username']} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">First Name</span>
                    <input onChange={(event) => setUserData({
                            ...userData,
                            'first_name': event.target.value
                        })}
                        type="text" className="form-control"
                           placeholder={userData['first_name']} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Last Name</span>
                    <input onChange={(event) => setUserData({
                        ...userData,
                        'last_name': event.target.value
                    })}
                           type="text" className="form-control"
                           placeholder={userData['last_name']} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input onChange={(event) => setUserData({
                            ...userData,
                            'email': event.target.value
                        })}
                        type="email" className="form-control"
                           placeholder={userData['email']} />
                </div>
                <div className="input-group mb-3">
                   <button type="button" data-bs-toggle="modal" data-bs-target="#password"
                           className='btn btn-danger btn-sm'> Change Password </button>
                </div>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <button onClick={() => setEdit(false)}
                            className='btn btn-secondary' style={{margin: '20px'}}> Cancel </button>

                    <button onClick={() => saveHandler()}
                            className='btn btn-primary' style={{margin: '20px'}}> Save </button>
                </div>
            </div>
        )
    }

    const passwordModal = () => {
        return(
            <div className="modal fade" id="password" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p style={{color: 'red'}}> Password can not be empty or less than four characters.</p>
                            <label> My new password: </label>
                            <input style={{margin: '10px'}} type='password' placeholder='password'
                                   onChange={(event) =>
                                       setPassword(event.target.value)} /> <br />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/*Minimum four characters required for the password; empty passwords not allowed.*/}
                            {
                                password !== '' && password.length > 3  ? <button type="button"
                                                          onClick={()=> changePasswordHandler()}
                                                            className="btn btn-primary"> Save </button> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            {Navbar('Account')}
            <div style={{margin: '50px auto', width: '50%', textAlign: 'center'}}
                 className="alert alert-success" role="alert">
                My total time: {FormatTime(totalHours['total'])}
            </div>
            {edit ? editProfile(): Profile()}
            {/*This modal is displayed when change password button is clicked*/}
            {passwordModal()}
        </div>
    )
}

export default Account;
