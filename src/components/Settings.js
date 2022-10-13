import React from 'react';
import authHoc from "./HOC/authHoc";
import {connect} from "react-redux";

function Settings(props) {
    return (
        <div>Settings</div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged
    }
}

export default connect (mapStateToProps)(authHoc(Settings));