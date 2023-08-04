import React, {useEffect, useState} from "react";
import {GetRequest} from "../request-handler/GetRequest.jsx";
import {FormatTime} from "./FormatTime.jsx";
import {DeleteModal, UpdateModal} from "./Modal.jsx";
import {CurrentDate} from "./CurrentDate.jsx";
import {PutRequest} from "../request-handler/PutRequest.jsx";
import {DeleteRequest} from "../request-handler/DeleteRequest.jsx";


const Contribution = (endpoint, deps) => {
    const [data, setData] = useState([]);
    const [id, setId] = useState(null);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const isSuperuser = localStorage.getItem('is_superuser');
    const headers = { Authorization: `token ${token}`, };
    // The users will input the time they have contributed to a project.
    const [time, setTime] = useState(null);
    const [comment, setComment] = useState('');
    // By default, date is the current date "YYYY-MM-DD".
    const [date, setDate] = useState(CurrentDate());
    const redirect = window.location.pathname;
    useEffect(() => {
        // Make the API call
        if(endpoint !== null){
            GetRequest(`${endpoint}`, headers, setData);
        }
    }, [deps]);

    const updateHandler = () => {
        PutRequest(`contribute/${id}`,
            {"time": time, "comment": comment, "create_date": date}, headers,
            redirect);
    }

    const deleteHandler = () => {
        DeleteRequest(`contribute/${id}`, headers, redirect);
    }

    return(
        data.length > 0  ?
            <>
                <h3 style={{textAlign: 'center'}}> Contribution List </h3> <br />
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Contributor</th>
                        <th scope="col">ProjectTitle</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(contribution => (
                        <tr key={contribution['id']}>
                            <td>{contribution['username']}</td>
                            <td>{contribution['project_title']}</td>
                            <td>{FormatTime(contribution['time'])}</td>
                            <td>{contribution['create_date']}</td>
                            <td>{contribution['comment']}</td>
                            <td>
                                <div className="btn-group">
                                    <button type="button"
                                            disabled={isSuperuser === 'false' ?
                                                contribution['username'] !== username: false}
                                            className="btn btn-info btn-sm dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </button>
                                    <ul className="dropdown-menu">
                                        {/*only superuser can manage or the contributor*/}
                                        <li><a className="dropdown-item"
                                               onClick={() => {
                                                   setId(contribution['id']);
                                                   setTime(contribution['time']);
                                                   setComment(contribution['comment']);
                                                   setDate(contribution['create_date']);
                                               }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modifyContribution"
                                            style={{cursor: 'pointer'}}
                                        > Manage </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a style={{cursor: 'pointer'}} className="dropdown-item"
                                               onClick={()=> setId(contribution['id'])}
                                               data-bs-toggle="modal"
                                               data-bs-target="#deleteContribution"
                                        > Delete </a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/*This modal appears on "select" button click.*/}
                <UpdateModal
                    id="modifyContribution"
                    title="Modify Time Tracker"
                    time={time}
                    comment={comment}
                    date={date}
                    label1="Change Time: "
                    label2="Change Comment: "
                    label3="Change Date: "
                    buttonLabels={["Cancel", "Save"]}
                    actions={{
                        setTime: (value) => setTime(value),
                        setComment: (value) => setComment(value),
                        setDate: (value) => setDate(value),
                        handler: updateHandler
                    }}
                    footerMessage={`You have worked: ${FormatTime(time)}`}
                    button="btn btn-primary"
                />

                {/* This modal appears on "action->delete" button click. */}
                <DeleteModal
                    id='deleteContribution'
                    title="Delete Project"
                    buttonLabels={["No", "Yes"]}
                    actions={{
                        handler: deleteHandler
                    }}
                    footerMessage="Are you sure you want to proceed?"
                    button="btn btn-danger"
                />

            </> : null
    )
}
export default Contribution;
