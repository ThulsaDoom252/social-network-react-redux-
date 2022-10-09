import React from 'react';
import authHoc from "../HOC/authHoc";

function Profile(props) {
    return (
        <div>
            Profile
        </div>
    );
}

export default authHoc(Profile);