import React from "react";
import {Navigate} from "react-router-dom";

const authHoc = (Component) => {
    return (props) => {
        if (!props.auth) {
            return <Navigate to="/login"/>
        } else {
            return <Component {...props}/>
        }
    }
}

export default authHoc