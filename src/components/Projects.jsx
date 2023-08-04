import React, {useEffect, useState} from "react";
import navbar from "./Navbar.jsx";
import {GetRequest} from "../request-handler/GetRequest.jsx";
import {PostRequest} from "../request-handler/PostRequest.jsx";
import {PutRequest} from "../request-handler/PutRequest.jsx";
import {DeleteRequest} from "../request-handler/DeleteRequest.jsx";
import {DataEntryModal, DeleteModal, EntryTimeModal} from "./Modal.jsx";
import Contribution from "./Contribution.jsx";
import {CurrentDate} from "./CurrentDate.jsx";
import {FormatTime} from "./FormatTime.jsx";


const Projects = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const isSuperuser = localStorage.getItem('is_superuser');
    const headers = { Authorization: `token ${token}`, };
    const [contributorsEndpoint, setContributorsEndpoint] = useState(null);
    // The users will input the time they have contributed to a project.
    const [time, setTime] = useState(null);
    const [comment, setComment] = useState('');
    // By default, date is the current date "YYYY-MM-DD".
    const [date, setDate] = useState(CurrentDate());
    const redirect = window.location.pathname;

    const [project, setProject] = useState({
        'id': null,
        'user': localStorage.getItem('user_id'),
        'title': null
    })
    useEffect(() => {
        // Make the API call
        GetRequest('project/', headers, setData);
    }, []);

    const handleChange = (key, value) => {
        setProject({
            ...project,
            [key]: value,
        })
    };

    const createHandler = () => {
        PostRequest('project/', project, headers, redirect);
    }

    const updateHandler = () => {
        PutRequest(`project/${project['id']}`, project, headers, redirect);
    }

    const deleteHandler = () => {
        DeleteRequest(`project/${project['id']}`, headers, redirect);
    }

    const selectRequestHandler = () => {
        PostRequest('contribute/', {
            "user": localStorage.getItem('user_id'),
            "project": project['id'],
            "time": time,
            "comment": comment,
            "create_date": date
        }, headers, '/projects');
    }

    return(
        <div>
            {navbar('Projects')}
            <div style={{margin: '60px'}}>
                <button style={{marginBottom: '20px'}} type="button"
                        className="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#createProject">
                    Create New Project
                </button>

                {/* This modal appears on "create" button click. */}
                <DataEntryModal
                    id='createProject'
                    title="Create New Project"
                    buttonLabels={["Cancel", "Create"]}
                    label='Project Title: '
                    actions={{
                        handleChange: handleChange,
                        handler: createHandler
                    }}
                    placeholder={project['title']}
                    footerMessage="You are owner of this project."
                    button="btn btn-primary"
                />

                {/* This modal appears on "action->manage" button click. */}
                <DataEntryModal
                    id='manageProject'
                    title="Edit Project: "
                    buttonLabels={["Cancel", "Save"]}
                    label='Change Title: '
                    actions={{
                        handleChange: handleChange,
                        handler: updateHandler
                    }}
                    placeholder={project['title']}
                    footerMessage="Confirm title change for this project?"
                    button="btn btn-primary"
                />

                {/*This modal appears on "select" button click.*/}
                <EntryTimeModal
                    id="selectProject"
                    title="Time Tracker"
                    label1="I have worked: "
                    label2="Comment: "
                    label3="Date: "
                    buttonLabels={["Cancel", "Save"]}
                    actions={{
                        setTime: (value) => setTime(value),
                        setComment: (value) => setComment(value),
                        setDate: (value) => setDate(value),
                        handler: selectRequestHandler
                    }}
                    footerMessage={`You have worked: ${FormatTime(time)}`}
                    button="btn btn-primary"
                />

                {/* This modal appears on "action->delete" button click. */}
                <DeleteModal
                    id='deleteProject'
                    title="Delete Project"
                    buttonLabels={["No", "Yes"]}
                    actions={{
                        handler: deleteHandler
                    }}
                    footerMessage="Are you sure you want to proceed?"
                    button="btn btn-danger"
                />

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">CreatedBy</th>
                        <th scope="col">ProjectTitle</th>
                        <th scope="col">Created</th>
                        <th scope="col"> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(project => (
                        <tr key={project['id']}>
                            <td>{project['username']}</td>
                            <td>{project['title']}</td>
                            <td>{project['create_date']}</td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-info btn-sm dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </button>
                                    <ul className="dropdown-menu">
                                        {/*only superuser can manage*/}
                                        {
                                            isSuperuser === "true" ?  <li>
                                                <a className="dropdown-item"
                                                   onClick={()=> setProject({
                                                         ...project,
                                                         'id': project['id'],
                                                         'user': project['user'],
                                                         'title': project['title'],
                                                     })}
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#manageProject"
                                                   style={{cursor: 'pointer'}}
                                            > Manage </a>
                                            </li> : null
                                        }
                                        <li><a className="dropdown-item"
                                               onClick={()=> setProject({
                                                   ...project,
                                                   'id': project['id'],
                                               })}
                                               data-bs-toggle="modal"
                                               data-bs-target="#selectProject"
                                               style={{cursor: 'pointer'}}
                                        > Enter Time </a>
                                        </li>
                                        <li><a className="dropdown-item"
                                               onClick={()=>
                                                   setContributorsEndpoint(`projectContributors/${project['id']}`)
                                        }
                                               style={{cursor: 'pointer'}}
                                        > See Contributors </a>
                                        </li>
                                        {/*only superuser can delete*/}
                                        {
                                            isSuperuser === "true" ? <>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li><a style={{cursor: 'pointer'}} className="dropdown-item"
                                                      onClick={()=> setProject({
                                                          ...project,
                                                          'id': project['id'],
                                                          'user': project['user'],
                                                          'title': project['title']
                                                      })}
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#deleteProject"
                                                > Delete </a></li>
                                            </> : null
                                        }
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/*Clicking 'action->see contribution' displays the contribution table.*/}
            <div style={{margin: '60px'}}>
                {Contribution(contributorsEndpoint, contributorsEndpoint)}
            </div>
        </div>
    )
}

export default Projects;
