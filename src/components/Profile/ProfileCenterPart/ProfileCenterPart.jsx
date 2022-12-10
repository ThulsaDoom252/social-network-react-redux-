import React from "react";
import fetching from "../../common/ModuleFetching.gif"
import NotFound from "../../common/NotFound";
import ProfileData from "./profileData";
import ProfileAvatarBlock from "./profileAvatarBlock";
import ProfileWall from "./Wall/ProfileWall";
import {NavLink} from "react-router-dom";

const ProfileCenterPart = (props) => {
    const {
        0: profile,
        1: isCurrentUser,
        2: notFound,
        3: directEditMode,
        4: updateProfile,
        5: defaultAvatar,
        6: status,
        7: updateStatus
    } = props

    const {fullName : name, photos} = profile
    if (notFound) {
        return <NotFound/>
    } else if (!profile) {
        return <div>
            <div className={"profile-page-head-container"}><span className={"profile-page-userid"}>Loading...</span>
            </div>
            <div>
                <img className="profile-page-loading" src={fetching}/>
            </div>
        </div>
    }
    return (
        <div className={"profile-page-center-container"}>
            <div className={"profile-page-center-bg"}>
                <NavLink to={"/edit"} className={"profile-page-edit-button"}>Edit Profile</NavLink>
            </div>
            <div className={"profile-page-center-userInfo-container"}>
                <ProfileAvatarBlock {...[profile, isCurrentUser, directEditMode, updateProfile, defaultAvatar, status, updateStatus]}/>
                <ProfileData {...[profile, isCurrentUser, updateProfile]}/>
            </div>
            <ProfileWall {...[name, photos, defaultAvatar]}/>
        </div>

    )
}


export default ProfileCenterPart