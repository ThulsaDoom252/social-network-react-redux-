import React from 'react';
import authHoc from "./HOC/authHoc";
import {connect} from "react-redux";

function Users(props) {
    return (
        <div>Users</div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged
    }
}

export default connect (mapStateToProps)(authHoc(Users));