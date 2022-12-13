import React from "react";
import fetching from "../../common/ModuleFetching.gif"
import NotFound from "../../common/NotFound";
import ProfileData from "./profileData";
import ProfileAvatarBlock from "./profileAvatarBlock";
import ProfileWall from "./Wall/ProfileWall";
import {NavLink} from "react-router-dom";
import {nightModeStyles} from "../../../common/nightModeStyles";

const ProfileCenterPart = (props) => {
    const {
        0: profile,
        1: isCurrentUser,
        2: notFound,
        3: directEditMode,
        4: updateProfile,
        5: defaultAvatar,
        6: status,
        7: updateStatus,
        8: defaultPhotos,
        9: toggleOverlay,
        10: friends,
        11: nightMode,
    } = props

    const {fullName: name, photos} = profile
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
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"profile-page-center-container"}>
            <div className={"profile-page-center-bg"}>
                <NavLink to={"/edit"} className={"profile-page-edit-button"}>Edit Profile</NavLink>
            </div>
            <div className={"profile-page-center-userInfo-container"}>
                <ProfileAvatarBlock {...[profile, isCurrentUser, directEditMode, updateProfile, defaultAvatar, status, updateStatus]}/>
                <ProfileData {...[profile, isCurrentUser, updateProfile]}/>
            </div>
            <div className={"mobile-friends-block"}>
                <div className={"center-friends-block"}>
                    {friends.map((friend, index) => index < 4 && <div className={"center-friend-block"}><img
                        src={friend.photos.small ? friend.photos.small : defaultAvatar}
                        alt={`photo${index}`}/><p>{friend.name}</p></div>)}
                </div>
                <NavLink to={"/friends"} className={"center-friends-button"}>...</NavLink>
            </div>
            <div className={"mobile-gallery-block"}>
                <div className={"photos-block"}>
                    {defaultPhotos.map((photo, index) => <div className={"center-gallery-photo-block"}>{index < 4 &&
                        <img className={"center-gallery-photo"} onClick={() => toggleOverlay(true, index)} src={photo}
                             alt={`photo${index}`}/>}</div>)}
                </div>
                <NavLink to={"/gallery"} className={"center-gallery-button"}>To gallery</NavLink>
            </div>
            <ProfileWall {...[name, photos, defaultAvatar]}/>
        </div>

    )
}


export default ProfileCenterPart