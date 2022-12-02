import React from "react";
import fetching from "../../common/ModuleFetching.gif"
import NotFound from "../../common/NotFound";
import ProfileData from "./profileData";
import ProfileAvatarBlock from "./profileAvatarBlock";
import ProfileWall from "./ProfileWall";

const ProfileCenterPart = (props) => {
    if (props.notFound) {
        return <NotFound/>
    } else if (!props.profile) {
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
                <button className={"profile-page-edit-button"}>Edit profile</button>
            </div>
            <div className={"profile-page-center-userInfo-container"}>
                <ProfileAvatarBlock profile={props.profile} userId={props.userId} currentUser={props.Id}/>
                <ProfileData currentUser={props.Id} profile={props.profile} userId={props.userId}/>
            </div>
            <ProfileWall {...props}/>
        </div>
    )
}

export default ProfileCenterPart