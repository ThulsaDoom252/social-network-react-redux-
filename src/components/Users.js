import React from 'react';
import authHoc from "./HOC/authHoc";

function Users(props) {
    return (
        <div>Users</div>
    );
}

export default authHoc(Users);