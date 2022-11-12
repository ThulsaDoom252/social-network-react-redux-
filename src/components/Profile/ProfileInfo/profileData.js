import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {updateProfileTC} from "../../../redux/profile-reducer";
import ProfilePageInput from "./profilePageInput";
import {BiMessageSquareAdd} from "react-icons/bi";

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
    const [isApplicant, setApplicant] = useState(props.profile.lookingForAJob)
    const [youtubeLink, setYoutubeLink] = useState(props.profile.contacts.youtube)
    const [instagramLink, setInstagramLink] = useState(props.profile.contacts.instagram)
    const [facebookLink, setFacebookLink] = useState(props.profile.contacts.facebook)
    const [mainLink, setMainLink] = useState(props.profile.contacts.mainLink)
    const [githubLink, setGithubLink] = useState(props.profile.contacts.github)
    const [vkLink, setVkLink] = useState(props.profile.contacts.vk)
    const [websiteLink, setWebsiteLink] = useState(props.profile.contacts.website)
    const [twitterLink, setTwitterLink] = useState(props.profile.contacts.twitter)
    const [nullUserJobInfo, isNullUserJobInfo] = useState(userJobInfo === "" && "not looking for a job")
    const contactsArray = [
        props.profile.contacts.youtube,
        props.profile.contacts.instagram,
        props.profile.contacts.facebook,
        props.profile.contacts.mainLink,
        props.profile.contacts.github,
        props.profile.contacts.vk,
        props.profile.contacts.website,
        props.profile.contacts.twitter
    ]
    let notNull = userJobInfo === "" ? "enter job description" : userJobInfo
    let applicantYes = true
    let applicantNo = false
    let applicantRelay = userJobInfo === "" ? applicantNo : applicantYes
    let aboutInfo = userAboutInfo === "" ? "no Info" : userAboutInfo
    useEffect(() => {
        setUserName(props.profile.fullName)
        changeAboutInfo(props.profile.aboutMe)
        changeJobInfo(props.profile.lookingForAJobDescription)
    }, [props.profile.fullName, props.profile.aboutMe, props.profile.lookingForAJobDescription])

    useEffect(() => {
        setYoutubeLink(contactsArray[0])
        setInstagramLink(contactsArray[1])
        setFacebookLink(contactsArray[2])
        setMainLink(contactsArray[3])
        setGithubLink(contactsArray[4])
        setVkLink(contactsArray[5])
        setWebsiteLink(contactsArray[6])
        setTwitterLink(contactsArray[7])
    }, contactsArray)


    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (editMode === false && isCurrentUser === true) {
            setEditMode(true)
        } else {
            setEditMode(false)
            props.updateProfileTC(currentUser, aboutInfo, applicantRelay, notNull, userName, githubLink, vkLink, facebookLink, instagramLink, twitterLink,
                websiteLink, youtubeLink, mainLink)
        }
    }


    return (
        <div className="profile-page-right-part">
            <div className={"profile-page-personal-info-block"}>
                {nameEditMode ?
                    <ProfilePageInput editMode={toggleProfileDataEditMode} state={nameEditMode}
                                      changeState={setNameEditMode} changeValue={setUserName} value={userName}/>
                    :
                    <div>
                        <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}>{userName}</p>
                    </div>

                }
                <hr style={{color:"black", backgroundColor: "black", height: 2, width: "50%", margin: "0 auto"}}/>
                {aboutEditMode ?
                    <ProfilePageInput editMode={toggleProfileDataEditMode} state={aboutEditMode}
                                      changeState={setAboutEditMode} changeValue={changeAboutInfo}
                                      value={userAboutInfo}/>
                    :
                    <p onDoubleClick={() => toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)}>{aboutInfo !== "no Info" ? userAboutInfo :
                        <span><BiMessageSquareAdd/>Tell us about yourself</span>}</p>}
            </div>
            <div className={"profile-page-job-info-block"}>
                {userJobInfo !== "" && <p>Applicant</p>}
                {jobEditMode ? <ProfilePageInput editMode={toggleProfileDataEditMode} state={jobEditMode}
                                                 changeState={setJobEditMode} changeValue={changeJobInfo}
                                                 value={userJobInfo}/>
                    :
                    <p onDoubleClick={() => toggleProfileDataEditMode(jobEditMode, setJobEditMode)}>{isApplicant ? userJobInfo : !isApplicant && currentUser ? "Click to add applicant info.." : !isApplicant && !currentUser && "Not looking for a job"}</p>}

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