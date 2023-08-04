import React, {useState, useEffect} from "react";
import {API_BASE_URL} from "../apiConfig.jsx";
import { useSelector, useDispatch } from 'react-redux'
import {setUserId} from '../redux-related/userSlice.js'
import axios from "axios";
import {GetRequest} from "../request-handler/GetRequest.jsx";
import {PutRequest} from "../request-handler/PutRequest.jsx";


const UserList = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const isSuperuser = localStorage.getItem('is_superuser');
    const currentUser = parseInt(useSelector(state => state.user_id.value));
    const dispatch = useDispatch();
    const [manageUser, setManageUser] = useState({
        'id': null,
        'username': null,
        'first_name': null,
        'last_name': null,
        'is_superuser': null
    });
    const headers = { Authorization: `token ${token}`, };

    useEffect(() => {
        // Make the API call
        GetRequest('user/', headers, setData);
    }, []);

    const manageHandler = () => {
        PutRequest(`user/${manageUser['id']}`, manageUser, headers, '/');
    }

    const deleteHandler = () => {
        axios.delete(`${API_BASE_URL}/user/${manageUser['id']}`, {headers}).then(response => {
            if(response.status === 204){
                alert('The user has been successfully deleted.')
                window.location.href = '/';
            }
        }).catch(error => {
            console.error('Error:', error);
            // Inform the user
            alert('Failed to delete!');
        });
    }

    const handleChange = (key, value) => {
        setManageUser({
            ...manageUser,
            [key]: value,
        })
    };

    return(
        <>
            <h3 style={{textAlign: 'center'}}> User List </h3> <br />
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">IsSuperuser</th>
                    <th scope="col">Select</th>
                    {/* The action button for users can only be accessed by superuser. */}
                    { isSuperuser === 'true' ? <th scope="col">Action</th> : null}
                </tr>
                </thead>
                <tbody>
                {data.map(user => (
                    <tr key={user['id']}
                        className={user['id'] === currentUser ? 'table-light': null}>
                        <td>{user['username']}</td>
                        <td>{user['first_name']}</td>
                        <td>{user['last_name']}</td>
                        <td>{user['is_superuser'] ? "Yes" : "No"}</td>
                        <td>
                            <button
                                onClick={() => dispatch(setUserId(user['id']))}
                                disabled={user['id'] === currentUser}
                                className="btn btn-sm btn-primary">
                                Select
                            </button>
                        </td>
                        {/* Only the superuser has the authority to perform the actions. */}
                        {
                            isSuperuser === 'true' ?
                                <td>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-info btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            Action
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item"
                                                   onClick={()=> setManageUser({
                                                       'id': user['id'],
                                                       'username': user['username'],
                                                       'first_name': user['first_name'],
                                                       'last_name': user['last_name'],
                                                       'is_superuser': user['is_superuser']
                                                   })}
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#manage"
                                                   style={{cursor: 'pointer'}}
                                            > Manage </a>
                                            </li>
                                            {/*Current user cannot delete themselves.*/}
                                            {
                                                currentUser !== user['id'] ? <>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li><a style={{cursor: 'pointer'}} className="dropdown-item"
                                                           onClick={()=> setManageUser({
                                                               ...manageUser,
                                                               'id': user['id'],
                                                               'username': user['username']
                                                           })}
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#delete"
                                                    > Delete </a></li>
                                                </> : null
                                            }
                                        </ul>
                                    </div>
                                </td> : null
                        }
                    </tr>
                ))}
                </tbody>
            </table>
            {/* This modal appears on "action->manage" button click. */}
            <div className="modal fade" id="manage" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label> Username: </label>
                            <input style={{margin: '10px'}} type="text" placeholder={manageUser['username']}
                                   onChange={(event) => handleChange('username',
                                       event.target.value)} /> <br />
                            <label> First Name: </label>
                            <input style={{margin: '10px'}} type="text" placeholder={manageUser['first_name']}
                                   onChange={(event) => handleChange('first_name',
                                       event.target.value)} /> <br />
                            <label> Last Name: </label>
                            <input style={{margin: '10px'}} type="text" placeholder={manageUser['last_name']}
                                   onChange={(event) => handleChange('last_name',
                                       event.target.value)} /> <br />
                            {/* Only other superusers can change is_superuser status. */}
                            {
                                currentUser !== manageUser['id'] ? <div className="form-check"
                                                                        style={{marginTop: '10px'}}>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                           checked={manageUser['is_superuser']}
                                           onChange={(event) => handleChange(
                                               'is_superuser', event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault" >
                                        Make {manageUser['username']} superuser
                                    </label>
                                </div> : null
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={()=> manageHandler()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* This modal appears on "action->delete" button click. */}
            <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p style={{fontSize: '20px'}}>
                                You are about to delete the user "{manageUser['username']}". </p>
                            <p style={{color: 'red'}}>This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <p>Are you sure you want to proceed?</p>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-danger"
                                    onClick={() => deleteHandler()}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList;
