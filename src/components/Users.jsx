import React from "react";
import Navbar from "./Navbar.jsx";
import UserList from "./UserList.jsx";
import Contribution from "./Contribution.jsx";
import {useSelector} from "react-redux";

const Users = () => {
    const userId = useSelector(state => state.user_id.value);

    return( <div>
            {Navbar("Users")}
            <div style={{margin: '60px'}}> {UserList()} </div>
            <div style={{margin: '60px'}}> {Contribution(`userContribution/${userId}`, userId)} </div>
        </div>
    )
}

export default Users;
