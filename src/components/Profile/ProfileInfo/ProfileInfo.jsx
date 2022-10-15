import React from "react";
import Status from "./Status";
import anonymous from "../../Common/Anonymous.jpg";
import {NavLink} from "react-router-dom";
import UpdatePhoto from "../updatePhoto";
import fetching from "../../Common/ModuleFetching.gif"
import NotFound from "../../common/NotFound";

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
            <div style={{"background-color":props.nightMode && props.nightModeColors["profile-header"]}} className={"profile-page-head-container"}>
                <div
                    style={{"color":props.nightMode && props.nightModeColors["nightMode-text-color"]}}
                    className={"profile-page-userid"}>Samurai {props.profile.userId}</div>
            </div>
            <div  style={{"background-color":props.nightMode && props.nightModeColors["nightMode-container-block"], "box-shadow": props.nightMode && props.nightModeColors["profile-block-border-shadow"]}}
                className={"profile-page-block"}>
                <div className={"profile-page-buttons-block"}>
                    {`${props.Id}` === props.userId &&
                        <NavLink  className={props.nightMode ? "profile-page-edit-button-nightMode" : "profile-page-edit-button"} to={'/editprofile'}>Edit profile</NavLink>}
                        {/*<button  className={props.nightMode ? "profile-page-edit-button-nightMode" : "profile-page-edit-button"} to={'/editprofile'} onClick={props.deletePhoto}>Clear Avatar</button>}*/}
                    {`${props.Id}` === props.userId && <UpdatePhoto nightMode = {props.nightMode} nightModeColors = {props.nightModeColors}/>}
                </div>
                <div className={"profile-page-user-info-block"}>
                    <div>
                        {props.profile.photos.large &&
                            <img className={"profile-page-avatar"} src={props.profile.photos.large}/>}
                        {!props.profile.photos.small &&
                            <img className={"profile-page-avatar"} src={anonymous}/>}
                        <div>
                            {props.statusError &&
                                <div className="profile-page-status-error"><b>Length must be less
                                    than 300
                                    characters!</b>
                                </div>}
                            <Status nightMode = {props.nightMode} nightModeColors = {props.nightModeColors} currentId={props.Id} userId={props.userId} status={props.status}
                                    updateStatus={props.updateStatus} error={props.statusError}/>
                        </div>
                    </div>
                    <div  style={{"color": props.nightMode && props.nightModeColors["nightMode-text-color"]}} className={"profile-page-user-data-block"}>
                        <div style={{"background-color":props.nightMode && props.nightModeColors["header-slogan-title/welcome-label"]}}  className={"profile-page-personal-block profile-page-info-blocks"}>
                            <div>{props.profile.fullName}</div>
                            {props.profile.aboutMe && <div> About me
                                : {props.profile.aboutMe}</div>}
                        </div>
                        <div style={{"background-color":props.nightMode && props.nightModeColors["sidebar/header-background"]}} className={"profile-page-job-block profile-page-info-blocks"}>
                            <div>Applicant: {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
                            {props.profile.lookingForAJob && <div>Details:
                                {props.profile.lookingForAJobDescription}</div>}
                        </div>
                        <div  style={{"background-color":props.nightMode && props.nightModeColors["header-slogan-title/welcome-label"]}} className={"profile-page-contacts-block profile-page-info-blocks"}>
                            {props.profile.contacts.facebook &&
                                <div>Facebook: {props.profile.contacts.facebook}</div>}
                            {props.profile.contacts.website &&
                                <div>Site: {props.profile.contacts.website}</div>}
                            {props.profile.contacts.vk &&
                                <div>Vk: {props.profile.contacts.vk}</div>}
                            {props.profile.contacts.twitter &&
                                <div>Twitter: {props.profile.contacts.twitter}</div>}
                            {props.profile.contacts.instagram &&
                                <div>Instagram: {props.profile.contacts.instagram}</div>}
                            {props.profile.contacts.youtube &&
                                <div>Youtube: {props.profile.contacts.youtube}</div>}
                            {props.profile.contacts.github &&
                                <div>GitHub: {props.profile.contacts.github}</div>}
                            {props.profile.contacts.mainLink &&
                                <div>MainLnk: {props.profile.contacts.mainLink}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileInfo