import React, {useEffect} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {currentUserDataTC, getStatusTC, setUserTC, updateProfileTC, updateStatusTC} from "../../redux/profile-reducer";

const Profile = (props) => {
    useEffect(() => {
        let userId = props.router.params.userId
        if (!userId) {
            userId = `${props.Id}`
        }
        let u2 = Object.values(props.router.params)
        props.setUserTC(userId)
        props.getStatusTC(userId)
        props.currentUserDataTC(props.Id)
    }, [])

    useEffect(() => {
        let userId = props.router.params.userId
        props.getStatusTC(userId)
        props.setUserTC(userId)
    }, [props.router.params.userId])

    window.auth = props.auth

    return (
        <div>
            <ProfileInfo  {...props} userId={props.router.params.userId}/>
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
        notFound: state.profilePage.notFound,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    currentUserDataTC
}), authHoc, withRouter)(Profile)
