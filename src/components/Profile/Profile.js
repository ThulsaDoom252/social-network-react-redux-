import React, {useEffect} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {
    setCurrentUserDataTC,
    getStatusTC,
    setUserTC, showOverlayAC, updateProfileTC, updateStatusTC,
} from "../../redux/profile-reducer/profile-reducer";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {getFriendsTC, unfollowFriendTC} from "../../redux/users-reducer";

const Profile = (props) => {
    const {
        notFound,
        email,
        profile,
        updateProfileTC: updateProfile,
        directEditMode,
        defaultAvatar,
        friends,
        status,
        defaultPhotos,
        showOverlayAC: toggleOverlay,
        getFriendsTC: getFriends,
        unfollowFriendTC: unfollowFriend,
        updateStatusTC: updateStatus
    } = props
    const currentUserId = props.Id
    const userIdParam = props.router.params.userId
    const isCurrentUser = userIdParam === currentUserId.toString()

    useEffect(() => {
        let userIdParam = props.router.params.userId
        props.setUserTC(userIdParam)
        props.getStatusTC(userIdParam)
        props.currentUserDataTC(userIdParam)
    }, [userIdParam])

    return (
        <div className={"profile-main-container"}>
            <ProfileLeftPart {...[profile, isCurrentUser, email, updateProfile, directEditMode]}/>
            <ProfileCenterPart  {...[profile, isCurrentUser, notFound, directEditMode, updateProfile, defaultAvatar, status, updateStatus]}/>
            <ProfileRightPart {...[isCurrentUser, defaultAvatar, friends, defaultPhotos, toggleOverlay,
                getFriends, unfollowFriend]}/>
        </div>
    )

}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        directEditMode: state.profilePage.directEditMode,
        auth: state.auth.isLogged,
        Id: state.auth.id,
        email: state.auth.email,
        notFound: state.profilePage.notFound,
        defaultPhotos: state.profilePage.defaultPhotos,
        defaultAvatar: state.dialogsPage.defaultAvatar,
        friends: state.usersPage.friends,
        status: state.profilePage.status,
    }
}

export default compose(connect(mapStateToProps, {
    setUserTC,
    getStatusTC,
    currentUserDataTC: setCurrentUserDataTC,
    showOverlayAC,
    getFriendsTC,
    updateProfileTC,
    updateStatusTC,
    unfollowFriendTC,
}), authHoc, withRouter)(Profile)
