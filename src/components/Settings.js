import React from 'react';
import authHoc from "./HOC/authHoc";

function Settings(props) {
    return (
        <div>Settings</div>
    );
}

export default authHoc(Settings);