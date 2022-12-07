import React, {useEffect} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {
    setCurrentUserDataTC,
    getStatusTC,
    setUserTC, showOverlayAC,
} from "../../redux/profile-reducer/profile-reducer";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {getFriendsTC} from "../../redux/users-reducer";

const Profile = (props) => {
    const userId = props.router.params.userId
    window.userId = userId

    useEffect(() => {
        let userId = props.router.params.userId
        props.setUserTC(userId)
        props.getStatusTC(userId)
        props.currentUserDataTC(userId)
    }, [props.router.params.id])

    return (
        <div className={"profile-main-container"}>
            <ProfileLeftPart userId={props.router.params.userId} currentUserId={props.Id} profile={props.profile}
                             email={props.email}/>
            <ProfileCenterPart  {...props} userId={props.router.params.userId}/>
            <ProfileRightPart Id = {props.Id} userId = {userId} defaultAvatar={props.defaultAvatar} friends={props.friends} photos={props.defaultPhotos}
                              overlay={props.overlay} toggleOverlay={props.showOverlayAC}/>
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
        defaultPhotos: state.profilePage.defaultPhotos,
        defaultAvatar: state.dialogsPage.defaultAvatar,
        friends: state.usersPage.friends,
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    currentUserDataTC: setCurrentUserDataTC,
    showOverlayAC,
    getFriendsTC,
}), authHoc, withRouter)(Profile)
