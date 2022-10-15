import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {currentUserDataTC, getStatusTC, setUserTC, updateStatusTC} from "../../redux/profile-reducer";

const Profile = (props) => {
    return <div>Profile</div>

}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth.isLogged,
        Id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        status: state.profilePage.status,
        notFound: state.profilePage.notFound,
        statusError: state.profilePage.statusError,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    updateStatusTC,
    currentUserDataTC
}), authHoc, withRouter)(Profile)
