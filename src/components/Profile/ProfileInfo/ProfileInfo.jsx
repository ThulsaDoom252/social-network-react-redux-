import React from "react";
import fetching from "../../common/ModuleFetching.gif"
import NotFound from "../../common/NotFound";
import Status from "./Status";
import ProfileData from "./profileData";
import ProfileAvatar from "./profileAvatar";

const ProfileInfo = (props) => {
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
        <div>
            <div className={"profile-page-userId-wrapper"}>
                <h2>{props.userId}</h2>
            </div>
            <div className="profile-page-container">
                <div className={"profile-page-user-block"}>
                    <div className="profile-page-user-block-container">
                        <ProfileAvatar profile = {props.profile}/>
                        <ProfileData userId = {props.userId} profile = {props.profile}/>
                    </div>
                    <Status/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo