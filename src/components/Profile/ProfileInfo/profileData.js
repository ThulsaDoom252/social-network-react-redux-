import React, {useState} from 'react';
import {connect} from "react-redux";
import {updateProfileTC} from "../../../redux/profile-reducer";

const ProfileData = (props) => {
    const [personalEditMode, setPersonalEditMode] = useState(false)
    const [jobEditMode, setJobEditMode] = useState(false)
    const [contactsEditMode, setContactsEditMode] = useState(false)
    const [userName, setUserName] = useState(props.profile.fullName)
    const [userAboutInfo, changeAboutInfo] = useState(props.profile.aboutMe)
    const [userJobInfo, changeJobInfo] = useState(props.profile.lookingForAJobDescription)
    const [youtubeLink, setYoutubeLink] = useState(props.profile.contacts.youtube)
    const [instagramLink, setInstagramLink] = useState(props.profile.contacts.instagram)
    const [facebookLink, setFacebookLink] = useState(props.profile.contacts.facebook)
    const [mainLink, setMainLink] = useState(props.profile.contacts.mainLink)
    const [githubLink, setGithubLink] = useState(props.profile.contacts.github)
    const [vkLink, setVkLink] = useState(props.profile.contacts.vk)
    const [websiteLink, setWebsiteLink] = useState(props.profile.contacts.website)
    const [twitterLink, setTwitterLink] = useState(props.profile.contacts.twitter)

    const changeUserData = (e) => {
        setUserName(e.currentTarget.value)
    }

    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (editMode === false) {
            setEditMode(true)
        } else {
            setEditMode(false)
            props.updateProfileTC(props.userId, userAboutInfo, "Yes", userJobInfo, userName, githubLink, vkLink, facebookLink, instagramLink, twitterLink,
                websiteLink, youtubeLink, mainLink)
        }
    }
    console.log(updateProfileTC)
    const inputStyle = {"background-color": "white"}

    return (
        <div className="profile-page-right-part">
            <div className={"profile-page-personal-info-block"} onDoubleClick={() => toggleProfileDataEditMode(personalEditMode, setPersonalEditMode)}>
                {personalEditMode ? <input className="profile-page-input" style={inputStyle} type={"text"} value={userName} onChange={(e) => setUserName(e.currentTarget.value)} onBlur={() => toggleProfileDataEditMode(personalEditMode, setPersonalEditMode)}/> : <p>{userName}</p>}
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
    );
}

export default connect(null, {updateProfileTC})(ProfileData);