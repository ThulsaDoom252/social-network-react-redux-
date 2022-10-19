import React from "react";
import fetching from "../../common/ModuleFetching.gif"
import NotFound from "../../common/NotFound";
import Status from "./Status";

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
                    <div className="profile-page-left-part">
                        <div className="profile-page-left-part-container">
                            <img className="profile-page-avatar" src={props.profile.photos.large} alt="large photo"/>
                            <Status/>
                        </div>
                    </div>
                    <div className="profile-page-right-part">
                        <div className={"profile-page-personal-info-block"}>
                            <p>{props.profile.fullName}</p>
                            <p>{props.profile.aboutMe}</p>
                        </div>
                        <div className={"profile-page-job-info-block"}>
                            <p>{props.profile.lookingForAJob}</p>
                            <p>{props.profile.lookingForAJobDescription}</p>
                        </div>
                        <div className={"profile-page-contacts-info-block"}>
                            <p>{props.profile.contacts.youtube}</p>
                            <p>{props.profile.contacts.instagram}</p>
                            <p>{props.profile.contacts.facebook}</p>
                            <p>{props.profile.contacts.mainLink}</p>
                            <p>{props.profile.contacts.github}</p>
                            <p>{props.profile.contacts.vk}</p>
                            <p>{props.profile.contacts.website}</p>
                            <p>{props.profile.contacts.twitter}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo