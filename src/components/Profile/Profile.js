import React, {useEffect} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {currentUserDataTC, getStatusTC, setUserTC, updateProfileTC, updateStatusTC} from "../../redux/profile-reducer/profile-reducer";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {showOverlayAC} from "../../redux/app-reducer";

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

    window.overlay2 = props.lala

    return (
        <div className={"profile-main-container"}>
            <ProfileLeftPart about = {props.about} userId = {props.router.params.userId} currentUserId = {props.Id} profile = {props.profile}  email = {props.email}/>
                <ProfileCenterPart  {...props} userId={props.router.params.userId}/>
            <ProfileRightPart photos =  {props.defaultPhotos} overlay = {props.overlay} toggleOverlay = {props.showOverlayAC}/>
        </div>
    )

}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        about: state.profilePage.aboutMe,
        auth: state.auth.isLogged,
        Id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        notFound: state.profilePage.notFound,
        defaultPhotos: state.profilePage.defaultPhotos,
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    currentUserDataTC,
    showOverlayAC,
}), authHoc, withRouter)(Profile)
