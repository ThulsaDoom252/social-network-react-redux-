import React, {useState} from 'react';
import {connect} from "react-redux";
import {updateProfileTC} from "../../../redux/profile-reducer";

const ProfileData = (props) => {
    const currentUser = props.currentUser
    const isCurrentUser = currentUser.toString() === props.userId.toString()
    const [nameEditMode, setNameEditMode] = useState(false)
    const [aboutEditMode, setAboutEditMode] = useState(false)
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
    const contactsArray = [youtubeLink, instagramLink, facebookLink, mainLink, githubLink, vkLink, websiteLink, twitterLink]

    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (editMode === false && isCurrentUser === true) {
            setEditMode(true)
        } else {
            setEditMode(false)
            props.updateProfileTC(currentUser, userAboutInfo, true, userJobInfo, userName, githubLink, vkLink, facebookLink, instagramLink, twitterLink,
                websiteLink, youtubeLink, mainLink)
        }
    }
    return (
        <div className="profile-page-right-part">
            <div className={"profile-page-personal-info-block"}>
                {nameEditMode ?
                    <input className="profile-page-input" type={"text"} value={userName}
                           onChange={(e) => setUserName(e.currentTarget.value)}
                           autoFocus={true}
                           onBlur={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}/> :
                    <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}>{userName}</p>}
                {aboutEditMode ? <input
                        autoFocus={true}
                        className="profile-page-input" type="text" value={userAboutInfo}
                        onChange={(e) => changeAboutInfo(e.currentTarget.value)}
                        onBlur={() => toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)}/> :
                    <p onDoubleClick={() => toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)}>{userAboutInfo}</p>}
            </div>
            <div className={"profile-page-job-info-block"}>
                <p>{props.profile.lookingForAJob ? "Applicant" : null}</p>
                {jobEditMode ? <input className="profile-page-input"
                                      autoFocus={true}
                                      onBlur={() => toggleProfileDataEditMode(jobEditMode, setJobEditMode)}
                                      type="text" value={userJobInfo}
                                      onChange={(e) => changeJobInfo(e.currentTarget.value)}/> :
                    <p onDoubleClick={() => toggleProfileDataEditMode(jobEditMode, setJobEditMode)}>{userJobInfo}</p>}
            </div>
            <div className={"profile-page-contacts-info-block"}
                 onDoubleClick={() => !contactsEditMode && toggleProfileDataEditMode(contactsEditMode, setContactsEditMode)}>
                {contactsEditMode ?
                    <div>
                        <p><input className="profile-page-input" placeholder="youtube" type="text" value={youtubeLink}
                                  onChange={(e) => setYoutubeLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="instagram" type="text"
                                  value={instagramLink} onChange={(e) => setInstagramLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="facebook" type="text"
                                  value={facebookLink} onChange={(e) => setFacebookLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="mainLink" type="text"
                                  value={mainLink} onChange={(e) => setMainLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="github" type="text"
                                  value={githubLink} onChange={(e) => setGithubLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="vk" type="text"
                                  value={vkLink} onChange={(e) => setVkLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="website" type="text"
                                  value={websiteLink} onChange={(e) => setWebsiteLink(e.currentTarget.value)}/></p>
                        <p><input className="profile-page-input" placeholder="twitter" type="text"
                                  value={twitterLink} onChange={(e) => setTwitterLink(e.currentTarget.value)}/></p>
                    </div> :
                    <div>
                        <p>{youtubeLink}</p>
                        <p>{instagramLink}</p>
                        <p>{facebookLink}</p>
                        <p>{mainLink}</p>
                        <p>{githubLink}</p>
                        <p>{vkLink}</p>
                        <p>{websiteLink}</p>
                        <p>{twitterLink}</p>
                    </div>}
            </div>
        </div>
    );
}

export default connect(null, {updateProfileTC})(ProfileData);