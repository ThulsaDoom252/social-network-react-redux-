import React, {useEffect} from "react";
import ProfileCenterPart from "./ProfileCenterPart/ProfileCenterPart";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import withRouter from "../HOC/withRouter";
import {
    setCurrentUserDataTC,
    getStatusTC,
    setUserTC, showOverlayAC, updateProfileTC, updateStatusTC, updatePhotoTC,
} from "../../redux/profile-reducer/profile-reducer";
import ProfileLeftPart from "./LeftPart";
import ProfileRightPart from "./RightPart";
import {getFriendsTC, unfollowFriendTC} from "../../redux/users-reducer";

const Profile = (props) => {
    const {
        notFound,
        email,
        nightMode,
        showMobileVersion,
        profile,
        updateProfileTC: updateProfile,
        directEditMode,
        defaultAvatar,
        friends,
        status,
        defaultPhotos,
        hideProfileWall,
        showOverlayAC: toggleOverlay,
        getFriendsTC: getFriends,
        unfollowFriendTC: unfollowFriend,
        updateStatusTC: updateStatus,
        updatePhotoTC: updatePhoto,
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
            {!showMobileVersion &&
                <ProfileLeftPart {...[profile, isCurrentUser, email, updateProfile, directEditMode, nightMode]}/>}
            <ProfileCenterPart  {...[profile, isCurrentUser, notFound, directEditMode,
                updateProfile, defaultAvatar, status, updateStatus, defaultPhotos,
                toggleOverlay, friends, nightMode, hideProfileWall, updatePhoto, showMobileVersion]}/>
            {!showMobileVersion &&
                <ProfileRightPart {...[isCurrentUser, defaultAvatar, friends, defaultPhotos, toggleOverlay,
                    getFriends, unfollowFriend, nightMode]}/>}


        </div>
    )

}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth.isLogged,
        Id: state.auth.id,
        email: state.auth.email,
        notFound: state.profilePage.notFound,
        defaultPhotos: state.profilePage.defaultPhotos,
        defaultAvatar: state.dialogsPage.defaultAvatar,
        friends: state.usersPage.friends,
        status: state.profilePage.status,
        directEditMode: state.settings.directEditMode,
        hideProfileWall: state.settings.hideProfileWall,
        showMobileVersion: state.settings.showMobileVersion,
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
    updatePhotoTC,
}), authHoc, withRouter)(Profile)
