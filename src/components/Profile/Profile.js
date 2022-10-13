import React from 'react';
import authHoc from "../HOC/authHoc";
import {connect} from "react-redux";

function Profile(props) {
    return (
        <div>
            Profile
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged
    }
}

export default connect (mapStateToProps)(authHoc(Profile));