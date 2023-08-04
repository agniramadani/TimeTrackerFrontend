import React from "react";
import {CurrentDate} from "./CurrentDate.jsx";
import {FormatTime} from "./FormatTime.jsx";


const Modal = (id, title, body, actions, buttonLabels, footerMessage, button) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/*Header*/}
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    {/*Body*/}
                    {body}
                    {/*Footer*/}
                    <div className="modal-footer" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <p> {footerMessage} </p>
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">{buttonLabels[0]}</button>
                        <button type="button" className={button} onClick={actions.handler}>{buttonLabels[1]}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Project
export const DataEntryModal = ({id, title, label, actions, placeholder, buttonLabels, footerMessage, button}) => {
    const body = (
        <div className="modal-body">
            <label> {label} </label>
            <input style={{margin: '10px'}} type='text' placeholder={placeholder}
                   onChange={(event) =>
                       actions.handleChange('title', event.target.value)} /> <br />
        </div>
    );

    return (
        Modal(id, title, body, actions, buttonLabels, footerMessage, button)
    )
}

export const UpdateModal = ({id, title, time, comment, date, label1, label2,
                                label3, actions, buttonLabels, footerMessage, button}) => {
    const body = (
        <div className="modal-body">
            <p> Time &gt; 10 indicates minutes, &lt;= 10 indicates hours.</p>
            <label> {label1} </label>
            <input style={{margin: '10px'}} type='number' min="1" placeholder={FormatTime(time)}
                   onChange={(event) =>
                       actions.setTime(event.target.value <= 10 ? event.target.value * 60 : event.target.value)} />
            <br />
            <label> {label2} </label>
            <input placeholder={comment} style={{margin: '10px'}} onChange={(event) =>
                actions.setComment(event.target.value)}/>
            <br />
            <label> {label3} </label>
            <input  style={{margin: '10px'}} type='text' placeholder={date}
                   onChange={(event) => actions.setDate(event.target.value)} />
        </div>
    );

    return (
        Modal(id, title, body, actions, buttonLabels, footerMessage, button)
    )
}

export const EntryTimeModal = ({id, title, label1, label2, label3, actions, buttonLabels, footerMessage, button}) => {
    const body = (
        <div className="modal-body">
            <p> Time &gt; 10 indicates minutes, &lt;= 10 indicates hours.</p>
            <label> {label1} </label>
            <input style={{margin: '10px'}} type='number' min="1" placeholder='Enter time'
                   onChange={(event) =>
                       actions.setTime(event.target.value <= 10 ? event.target.value * 60 : event.target.value)} />
            <br />
            <label> {label2} </label>
            <input maxLength="20" placeholder='Optional' style={{margin: '10px'}} onChange={(event) =>
                actions.setComment(event.target.value)}/>
            <br />
            <label> {label3} </label>
            <input  style={{margin: '10px'}} type='text' placeholder={CurrentDate()}
                    onChange={(event) => actions.setDate(event.target.value)} />
        </div>
    );

    return (
        Modal(id, title, body, actions, buttonLabels, footerMessage, button)
    )
}


export const DeleteModal = ({id, title, actions, buttonLabels, footerMessage, button}) => {
    const body = (
        <div className="modal-body">
            <p style={{color: 'red'}}>This action cannot be undone.</p>
        </div>
    );

    return (
        Modal(id, title, body, actions, buttonLabels, footerMessage, button)
    )
}
