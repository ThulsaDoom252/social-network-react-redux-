import React, {useEffect} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {currentUserDataTC,  getStatusTC, setUserTC, updateStatusTC} from "../../redux/profile-reducer";

const Profile = (props) => {
    useEffect(() => {
        let userId = props.router.params.userId
        if (!userId) {
            userId = `${props.Id}`
        }
        props.setUserTC(userId)
        props.getStatusTC(userId)
        props.currentUserDataTC(props.Id)
    }, [])


    useEffect(() => {
        let userId = props.router.params.userId
        props.getStatusTC(userId)
        props.setUserTC(userId)
    }, [props.router.params.userId])

    return (
        <div>
            <ProfileInfo  {...props} updateStatus={props.updateStatusTC}  userId={props.router.params.userId}/>
        </div>
    )

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
