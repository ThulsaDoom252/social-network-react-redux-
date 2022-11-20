import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {updateProfileTC} from "../../../redux/profile-reducer";
import {BiMessageSquareAdd} from "react-icons/bi";
import {AiOutlinePlusSquare} from "react-icons/all";
import {NavLink} from "react-router-dom";

const ProfileData = (props) => {
    const currentUser = props.currentUser
    const isCurrentUser = currentUser.toString() === props.userId.toString()
    const [nameEditMode, setNameEditMode] = useState(false)
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const [jobEditMode, setJobEditMode] = useState(false)
    const [contactsEditMode, setContactsEditMode] = useState(false)
    const [youtubeLink, setYoutubeLink] = useState(props.profile.contacts.youtube)
    const [instagramLink, setInstagramLink] = useState(props.profile.contacts.instagram)
    const [faceBookLink, setFaceBookLink] = useState(props.profile.contacts.facebook)
    const [mainLink, setMainLink] = useState(props.profile.contacts.mainLink)
    const [githubLink, setGithubLink] = useState(props.profile.contacts.github)
    const [vkLink, setVkLink] = useState(props.profile.contacts.vk)
    const [websiteLink, setWebsiteLink] = useState(props.profile.contacts.website)
    const [twitterLink, setTwitterLink] = useState(props.profile.contacts.twitter)
    const [youTubeEditMode, setYouTubeEditMode] = useState(false)
    const [instagramEditMode, setInstagramEditMode] = useState(false)
    const [faceBookEditMode, setFaceBookEditMode] = useState(false)
    const [mainLinkEditMode, setMainLinkEditMode] = useState(false)
    const [gitHubEditMode, setGitHubEditMode] = useState(false)
    const [vkEditMode, setVkEditMode] = useState(false)
    const [webSiteEditMode, setWebSiteEditMode] = useState(false)
    const [twitterEditMode, setTwitterEditMode] = useState(false)

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

    const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()

    const formik = useFormik({
        initialValues: {
            name: props.profile.fullName,
            about: props.profile.aboutMe,
            isLookingForAJob: props.profile.lookingForAJob,
            jobDescription: props.profile.lookingForAJobDescription,
            website: websiteLink,
            vk: vkLink,
            faceBook: faceBookLink,
            twitter: twitterLink,
            instagram: instagramLink,
            gitHub: githubLink,
            mainLink: mainLink,
            youtube: props.profile.contacts.youtube

        },
        validationSchema: Yup.object({
            name: Yup.string().min(4, 'Your name must be longer than 3 characters').required(),
            about: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
            jobDescription: Yup.string().min(4, 'Job description must contain more than 3 characters!').nullable(),
            vk: urlError,
            facebook: urlError,
            instagram: urlError,
            twitter: urlError,
            website: urlError,
            youtube: urlError,
            gitHub: urlError,
            mainLink: urlError,

        }),
    })

    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (editMode === false && isCurrentUser === true) {
            setEditMode(true)
        } else if (editMode === true && !formik.errors.name && !formik.errors.about && !formik.errors.jobDescription) {
            setEditMode(false)
            props.updateProfileTC(currentUser, aboutInfo, (jobInfo !== "enter job description"), jobInfo, formik.values.name, githubLink, vkLink, faceBookLink, instagramLink,
                twitterLink, websiteLink, formik.values.youtube, mainLink
            )
        }
    }

    let aboutInfo = formik.values.about === "" ? "no info" : formik.values.about
    let jobInfo = formik.values.jobDescription === "" ? "enter job description" : formik.values.jobDescription
    const errorStyle = "profile-page-input-error"

    useEffect(() => {
        formik.setFieldValue("name", props.profile.fullName)
        formik.setFieldValue("about", props.profile.aboutMe)
        formik.setFieldValue("isLookingForAJob", props.profile.lookingForAJob)
        formik.setFieldValue("jobDescription", props.profile.lookingForAJobDescription)
    }, [props.profile.fullName, props.profile.aboutMe, props.profile.lookingForAJob, props.profile.lookingForAJobDescription])

    useEffect(() => {
        formik.setFieldValue("youtube", contactsArray[0] === null ? "" : contactsArray[0])
        setInstagramLink(contactsArray[1] === null ? "" : contactsArray[1])
        setFaceBookLink(contactsArray[2] === null ? "" : contactsArray[2])
        setMainLink(contactsArray[3] === null ? "" : contactsArray[3])
        setGithubLink(contactsArray[4] === null ? "" : contactsArray[4])
        setVkLink(contactsArray[5] === null ? "" : contactsArray[5])
        setWebsiteLink(contactsArray[6] === null ? "" : contactsArray[6])
        setTwitterLink(contactsArray[7] === null ? "" : contactsArray[7])
    }, contactsArray)

    return (
        <form className="profile-page-right-part">
            <div className={"profile-page-personal-info-block"}>
                {nameEditMode ?
                    <div>
                        <p className={errorStyle}>{formik.errors.name}</p>
                        <input className="profile-page-input"
                               id={"name"}
                               autoFocus={true}
                               onBlur={() => {
                                   toggleProfileDataEditMode(nameEditMode, setNameEditMode)
                               }}
                               type="text" value={formik.values.name}
                               onChange={formik.handleChange}/>
                    </div>
                    :
                    <div>
                        <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}>{formik.values.name}</p>
                    </div>

                }
                <hr style={{color: "black", backgroundColor: "black", height: 2, width: "50%", margin: "0 auto"}}/>
                {aboutEditMode ?
                    <div>
                        <p className={errorStyle}>{formik.errors.about}</p>
                        <input className="profile-page-input"
                               id={"about"}
                               autoFocus={true}
                               onBlur={() => {
                                   toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)
                               }}
                               type="text" value={formik.values.about}
                               onChange={formik.handleChange}/>
                    </div>
                    :
                    <p onDoubleClick={() => toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)}>{aboutInfo === "no info" ?
                        <span><BiMessageSquareAdd/>Tell us about yourself</span> : formik.values.about}</p>}
            </div>
            <div className={"profile-page-job-info-block"}>
                <p hidden={!formik.values.isLookingForAJob && isCurrentUser}>{!formik.values.isLookingForAJob && !isCurrentUser ? "Not looking for a job" : "Looking for a job"}</p>
                <p className={errorStyle}>{formik.errors.jobDescription}</p>
                {jobEditMode ? <input className="profile-page-input"
                                      id={"jobDescription"}
                                      autoFocus={true}
                                      onBlur={() => {
                                          formik.values.jobDescription === "enter job description" ?
                                              formik.setFieldValue("isLookingForAJob", false) && toggleProfileDataEditMode(jobEditMode, setJobEditMode) :
                                              formik.values.jobDescription === "" ? formik.setFieldValue("isLookingForAJob", false) && toggleProfileDataEditMode(jobEditMode, setJobEditMode) :
                                                  formik.setFieldValue("isLookingForAJob", true) && toggleProfileDataEditMode(jobEditMode, setJobEditMode)
                                      }}
                                      type="text" value={formik.values.jobDescription}
                                      onChange={formik.handleChange}/>
                    :
                    <p onDoubleClick={() => toggleProfileDataEditMode(jobEditMode, setJobEditMode)}>{formik.values.jobDescription === "" && isCurrentUser || formik.values.jobDescription === "enter job description" && isCurrentUser ?
                        <span><AiOutlinePlusSquare/>Click to add job description</span> : formik.values.jobDescription}</p>}

            </div>
            <div className={"profile-page-contacts-info-block"}
                 onDoubleClick={() => !contactsEditMode && toggleProfileDataEditMode(contactsEditMode, setContactsEditMode)}
                 onBlur={() => toggleProfileDataEditMode(contactsEditMode, setContactsEditMode)}>
                <div>
                    <p className={errorStyle}>{formik.errors.youtube}</p>
                    {youTubeEditMode === true ?
                        <p><input className="profile-page-input"
                                  id={"youtube"}
                                  placeholder="youtube" type="text"
                                  value={formik.values.youtube}
                                  onBlur={() => toggleProfileDataEditMode(youTubeEditMode, setYouTubeEditMode)}
                                  autoFocus={true}
                                  onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(youTubeEditMode, setYouTubeEditMode)}>{formik.values.youtube === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add Youtube</span> : formik.values.youtube}</p>
                    }
                    {instagramEditMode ?
                        <p><input className="profile-page-input" placeholder="instagram" type="text"
                                  autoFocus={true}
                                  onBlur={() => toggleProfileDataEditMode(instagramEditMode, setInstagramEditMode)}
                                  value={instagramLink} onChange={(e) => setInstagramLink(e.currentTarget.value)}/>
                        </p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(instagramEditMode, setInstagramEditMode)}>{instagramLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add Instagram</span> : instagramLink}</p>
                    }
                    {faceBookEditMode ? <p><input className="profile-page-input" placeholder="facebook" type="text"
                                                  autoFocus={true}
                                                  onBlur={() => toggleProfileDataEditMode(faceBookEditMode, setFaceBookEditMode)}
                                                  value={faceBookLink}
                                                  onChange={(e) => setFaceBookLink(e.currentTarget.value)}/>
                        </p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(faceBookEditMode, setFaceBookEditMode)}>{faceBookLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add Facebook</span> : faceBookLink}</p>
                    }

                    {mainLinkEditMode ? <p><input className="profile-page-input" placeholder="mainLink" type="text"
                                                  autoFocus={true}
                                                  onBlur={() => toggleProfileDataEditMode(mainLinkEditMode, setMainLinkEditMode)}
                                                  value={mainLink}
                                                  onChange={(e) => setMainLink(e.currentTarget.value)}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(mainLinkEditMode, setMainLinkEditMode)}>{mainLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add MainLink </span> : mainLink}</p>
                    }
                    {gitHubEditMode ? <p><input className="profile-page-input" placeholder="github" type="text"
                                                autoFocus={true}
                                                onBlur={() => toggleProfileDataEditMode(gitHubEditMode, setGitHubEditMode)}
                                                value={githubLink}
                                                onChange={(e) => setGithubLink(e.currentTarget.value)}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(gitHubEditMode, setGitHubEditMode)}>{githubLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add GitHub</span> : githubLink}</p>
                    }
                    {vkEditMode ? <p><input className="profile-page-input" placeholder="vk" type="text"
                                            autoFocus={true}
                                            onBlur={() => toggleProfileDataEditMode(vkEditMode, setVkEditMode)}
                                            value={vkLink} onChange={(e) => setVkLink(e.currentTarget.value)}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(vkEditMode, setVkEditMode)}>{vkLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/>Add Vk</span> : vkLink}</p>
                    }
                    {webSiteEditMode ? <p><input className="profile-page-input" placeholder="website" type="text"
                                                 autoFocus={true}
                                                 onBlur={() => toggleProfileDataEditMode(webSiteEditMode, setWebSiteEditMode)}
                                                 value={websiteLink}
                                                 onChange={(e) => setWebsiteLink(e.currentTarget.value)}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(webSiteEditMode, setWebSiteEditMode)}>{websiteLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/>Add website</span> : websiteLink}</p>
                    }
                    {twitterEditMode ? <p><input className="profile-page-input" placeholder="twitter" type="text"
                                                 autoFocus={true}
                                                 onBlur={() => toggleProfileDataEditMode(twitterEditMode, setTwitterEditMode)}
                                                 value={twitterLink}
                                                 onChange={(e) => setTwitterLink(e.currentTarget.value)}/></p> :

                        <p onDoubleClick={() => toggleProfileDataEditMode(twitterEditMode, setTwitterEditMode)}>{twitterLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/>Add twitter</span> : twitterLink}</p>
                    }
                </div>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        fullName: state.profilePage.profile.fullName
    }
}

export default connect(mapStateToProps, {updateProfileTC})(ProfileData);


// const ProfileData = (props) => {
//     const currentUser = props.currentUser
//     const isCurrentUser = currentUser.toString() === props.userId.toString()
//     const [nameEditMode, setNameEditMode] = useState(false)
//     const [aboutEditMode, setAboutEditMode] = useState(false)
//     const [jobEditMode, setJobEditMode] = useState(false)
//     const [contactsEditMode, setContactsEditMode] = useState(false)
//     const [userName, setUserName] = useState(props.profile.fullName)
//     const [userAboutInfo, changeAboutInfo] = useState(props.profile.aboutMe)
//     const [userJobInfo, changeJobInfo] = useState(props.profile.lookingForAJobDescription)
//     const [isApplicant, setApplicant] = useState(props.profile.lookingForAJob)
//     const [youtubeLink, setYoutubeLink] = useState(props.profile.contacts.youtube)
//     const [instagramLink, setInstagramLink] = useState(props.profile.contacts.instagram)
//     const [facebookLink, setFacebookLink] = useState(props.profile.contacts.facebook)
//     const [mainLink, setMainLink] = useState(props.profile.contacts.mainLink)
//     const [githubLink, setGithubLink] = useState(props.profile.contacts.github)
//     const [vkLink, setVkLink] = useState(props.profile.contacts.vk)
//     const [websiteLink, setWebsiteLink] = useState(props.profile.contacts.website)
//     const [twitterLink, setTwitterLink] = useState(props.profile.contacts.twitter)
//     const [nullUserJobInfo, isNullUserJobInfo] = useState(userJobInfo === "" && "not looking for a job")
//     const contactsArray = [
//         props.profile.contacts.youtube,
//         props.profile.contacts.instagram,
//         props.profile.contacts.facebook,
//         props.profile.contacts.mainLink,
//         props.profile.contacts.github,
//         props.profile.contacts.vk,
//         props.profile.contacts.website,
//         props.profile.contacts.twitter
//     ]
//     let notNull = userJobInfo === "" ? "enter job description" : userJobInfo
//     let applicantYes = true
//     let applicantNo = false
//     let applicantRelay = userJobInfo === "" ? applicantNo : applicantYes
//     let aboutInfo = userAboutInfo === "" ? "no Info" : userAboutInfo
//     useEffect(() => {
//         setUserName(props.profile.fullName)
//         changeAboutInfo(props.profile.aboutMe)
//         changeJobInfo(props.profile.lookingForAJobDescription)
//     }, [props.profile.fullName, props.profile.aboutMe, props.profile.lookingForAJobDescription])
//
//     useEffect(() => {
//         setYoutubeLink(contactsArray[0])
//         setInstagramLink(contactsArray[1])
//         setFacebookLink(contactsArray[2])
//         setMainLink(contactsArray[3])
//         setGithubLink(contactsArray[4])
//         setVkLink(contactsArray[5])
//         setWebsiteLink(contactsArray[6])
//         setTwitterLink(contactsArray[7])
//     }, contactsArray)
//
//
//     const toggleProfileDataEditMode = (editMode, setEditMode) => {
//         if (editMode === false && isCurrentUser === true) {
//             setEditMode(true)
//         } else {
//             setEditMode(false)
//             props.updateProfileTC(currentUser, aboutInfo, applicantRelay, notNull, userName, githubLink, vkLink, facebookLink, instagramLink, twitterLink,
//                 websiteLink, youtubeLink, mainLink)
//         }
//     }
//
//     const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()
//     const {handleSubmit, handleChange, values, touched, errors} = useFormik({
//         initialValues: {
//             name: props.profile.fullName,
//             about: props.profile.aboutMe,
//             isApplicant: props.profile.lookingForAJob,
//             description: props.profile.lookingForAJobDescription,
//             website:  props.profile.contacts.website,
//             vk: props.profile.contacts.vk,
//             facebook: props.profile.contacts.facebook,
//             twitter: props.profile.contacts.twitter,
//             instagram: props.profile.contacts.instagram,
//             gitHub: props.profile.contacts.gitHub,
//             mainLink: props.profile.contacts.mainLink,
//             youtube: props.profile.contacts.youtube
//
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().min(3, 'Your name must be longer than 3 characters').required(),
//             about: Yup.string().min(3, 'Info must contain more than 3 characters!').required(),
//             description: Yup.string().min(3, 'Job description must contain more than 3 characters!').required(),
//             vk: urlError,
//             facebook: urlError,
//             instagram: urlError,
//             twitter: urlError,
//             website: urlError,
//             youtube: urlError,
//             gitHub: urlError,
//             mainLink: urlError,
//
//         }),
//         onSubmit: ({
//                        name,
//                        about,
//                        isApplicant,
//                        description,
//                        website,
//                        vk,
//                        facebook,
//                        twitter,
//                        instagram,
//                        youtube,
//                        gitHub,
//                        mainLink
//                    }) => {
//             props.updateProfileTC(currentUser, about, isApplicant, description, name, gitHub, vk, facebook, instagram,
//                 twitter, website, youtube, mainLink
//             )
//             props.fetchingAC(true)
//         }
//     })
//
//     return (
//         <div className="profile-page-right-part">
//             <div className={"profile-page-personal-info-block"}>
//                 {nameEditMode ?
//                     <ProfilePageInput editMode={toggleProfileDataEditMode} state={nameEditMode}
//                                       changeState={setNameEditMode} changeValue={setUserName} value={userName}/>
//                     :
//                     <div>
//                         <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}>{userName}</p>
//                     </div>
//
//                 }
//                 <hr style={{color:"black", backgroundColor: "black", height: 2, width: "50%", margin: "0 auto"}}/>
//                 {aboutEditMode ?
//                     <ProfilePageInput editMode={toggleProfileDataEditMode} state={aboutEditMode}
//                                       changeState={setAboutEditMode} changeValue={changeAboutInfo}
//                                       value={userAboutInfo}/>
//                     :
//                     <p onDoubleClick={() => toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)}>{aboutInfo !== "no Info" ? userAboutInfo :
//                         <span><BiMessageSquareAdd/>Tell us about yourself</span>}</p>}
//             </div>
//             <div className={"profile-page-job-info-block"}>
//                 {userJobInfo !== "" && <p>Applicant</p>}
//                 {jobEditMode ? <ProfilePageInput editMode={toggleProfileDataEditMode} state={jobEditMode}
//                                                  changeState={setJobEditMode} changeValue={changeJobInfo}
//                                                  value={userJobInfo}/>
//                     :
//                     <p onDoubleClick={() => toggleProfileDataEditMode(jobEditMode, setJobEditMode)}>{isApplicant ? userJobInfo : !isApplicant && currentUser ? "Click to add applicant info.." : !isApplicant && !currentUser && "Not looking for a job"}</p>}
//
//             </div>
//             <div className={"profile-page-contacts-info-block"}
//                  onDoubleClick={() => !contactsEditMode && toggleProfileDataEditMode(contactsEditMode, setContactsEditMode)}>
//                 {contactsEditMode ?
//                     <div>
//                         <p><input className="profile-page-input" placeholder="youtube" type="text" value={youtubeLink}
//                                   onChange={(e) => setYoutubeLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="instagram" type="text"
//                                   value={instagramLink} onChange={(e) => setInstagramLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="facebook" type="text"
//                                   value={facebookLink} onChange={(e) => setFacebookLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="mainLink" type="text"
//                                   value={mainLink} onChange={(e) => setMainLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="github" type="text"
//                                   value={githubLink} onChange={(e) => setGithubLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="vk" type="text"
//                                   value={vkLink} onChange={(e) => setVkLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="website" type="text"
//                                   value={websiteLink} onChange={(e) => setWebsiteLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="twitter" type="text"
//                                   value={twitterLink} onChange={(e) => setTwitterLink(e.currentTarget.value)}/></p>
//                     </div> :
//                     <div>
//                         <p>{youtubeLink}</p>
//                         <p>{instagramLink}</p>
//                         <p>{facebookLink}</p>
//                         <p>{mainLink}</p>
//                         <p>{githubLink}</p>
//                         <p>{vkLink}</p>
//                         <p>{websiteLink}</p>
//                         <p>{twitterLink}</p>
//                     </div>}
//             </div>
//         </div>
//     );
// }
//
// export default connect(null, {updateProfileTC})(ProfileData);


//
// const ProfileData = (props) => {
//     const currentUser = props.currentUser
//     const isCurrentUser = currentUser.toString() === props.userId.toString()
//     const [nameEditMode, setNameEditMode] = useState(false)
//     const [aboutEditMode, setAboutEditMode] = useState(false)
//     const [jobEditMode, setJobEditMode] = useState(false)
//     const [contactsEditMode, setContactsEditMode] = useState(false)
//     const [userName, setUserName] = useState(props.profile.fullName)
//     const [userAboutInfo, changeAboutInfo] = useState(props.profile.aboutMe)
//     const [userJobInfo, changeJobInfo] = useState(props.profile.lookingForAJobDescription)
//     const [isApplicant, setApplicant] = useState(props.profile.lookingForAJob)
//     const [youtubeLink, setYoutubeLink] = useState(props.profile.contacts.youtube)
//     const [instagramLink, setInstagramLink] = useState(props.profile.contacts.instagram)
//     const [facebookLink, setFacebookLink] = useState(props.profile.contacts.facebook)
//     const [mainLink, setMainLink] = useState(props.profile.contacts.mainLink)
//     const [githubLink, setGithubLink] = useState(props.profile.contacts.github)
//     const [vkLink, setVkLink] = useState(props.profile.contacts.vk)
//     const [websiteLink, setWebsiteLink] = useState(props.profile.contacts.website)
//     const [twitterLink, setTwitterLink] = useState(props.profile.contacts.twitter)
//     const [nullUserJobInfo, isNullUserJobInfo] = useState(userJobInfo === "" && "not looking for a job")
//     const contactsArray = [
//         props.profile.contacts.youtube,
//         props.profile.contacts.instagram,
//         props.profile.contacts.facebook,
//         props.profile.contacts.mainLink,
//         props.profile.contacts.github,
//         props.profile.contacts.vk,
//         props.profile.contacts.website,
//         props.profile.contacts.twitter
//     ]
//     let notNull = userJobInfo === "" ? "enter job description" : userJobInfo
//     let applicantYes = true
//     let applicantNo = false
//     let applicantRelay = userJobInfo === "" ? applicantNo : applicantYes
//     let aboutInfo = userAboutInfo === "" ? "no Info" : userAboutInfo
//
//
//     const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()
//     useEffect(() => {
//
//     })
//     const {handleSubmit, handleChange, values, touched, errors} = useFormik({
//         initialValues: {
//             name: userName,
//             about: aboutInfo,
//             isApplicant: isApplicant,
//             description: userJobInfo,
//             website: websiteLink,
//             vk: vkLink,
//             facebook: facebookLink,
//             twitter: twitterLink,
//             instagram: instagramLink,
//             gitHub: githubLink,
//             mainLink: mainLink,
//             youtube: youtubeLink
//
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().min(3, 'Your name must be longer than 3 characters').required(),
//             about: Yup.string().min(3, 'Info must contain more than 3 characters!').required(),
//             description: Yup.string().min(3, 'Job description must contain more than 3 characters!').required(),
//             vk: urlError,
//             facebook: urlError,
//             instagram: urlError,
//             twitter: urlError,
//             website: urlError,
//             youtube: urlError,
//             gitHub: urlError,
//             mainLink: urlError,
//
//         }),
//         onSubmit: ({
//                        name,
//                        about,
//                        isApplicant,
//                        description,
//                        website,
//                        vk,
//                        facebook,
//                        twitter,
//                        instagram,
//                        youtube,
//                        gitHub,
//                        mainLink
//                    }) => {
//             props.updateProfileTC(currentUser, about, isApplicant, description, name, gitHub, vk, facebook, instagram,
//                 twitter, website, youtube, mainLink
//             )
//             props.fetchingAC(true)
//         }
//     })
//
//     useEffect(() => {
//         setUserName(props.profile.fullName)
//         changeAboutInfo(props.profile.aboutMe)
//         changeJobInfo(props.profile.lookingForAJobDescription)
//     }, [props.profile.fullName, props.profile.aboutMe, props.profile.lookingForAJobDescription])
//
//     useEffect(() => {
//         setYoutubeLink(contactsArray[0])
//         setInstagramLink(contactsArray[1])
//         setFacebookLink(contactsArray[2])
//         setMainLink(contactsArray[3])
//         setGithubLink(contactsArray[4])
//         setVkLink(contactsArray[5])
//         setWebsiteLink(contactsArray[6])
//         setTwitterLink(contactsArray[7])
//     }, contactsArray)
//
//     const toggleProfileDataEditMode = (editMode, setEditMode) => {
//         if (editMode === false && isCurrentUser === true) {
//             setEditMode(true)
//         } else if (editMode === true && isCurrentUser === true && !errors.name && !errors.about && !errors.description) {
//             setEditMode(false)
//             props.updateProfileTC(currentUser, values.about, values.isApplicant, notNull, values.name, values.github, values.vk, values.facebook, values.instagram, values.twitter,
//                 values.website, values.youtube, values.mainLink)
//         }
//     }
//
//     const errorColor = {color: "red"}
//
//     return (
//         <form className="profile-page-right-part" onSubmit={handleSubmit}>
//             <div className={"profile-page-personal-info-block"}>
//                 {nameEditMode ?
//                     <div>
//                         <p style={errorColor}>{errors.name}</p>
//                         <input className="profile-page-input"
//                                id={"name"}
//                                autoFocus={true}
//                                onBlur={() => {
//                                    toggleProfileDataEditMode(nameEditMode, setNameEditMode)
//                                }}
//                                type="text" value={values.name}
//                                onChange={handleChange}/>
//                     </div>
//                     :
//                     <div>
//                         <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}>{userName}</p>
//                     </div>
//
//                 }
//                 <hr style={{color: "black", backgroundColor: "black", height: 2, width: "50%", margin: "0 auto"}}/>
//                 {aboutEditMode ?
//                     <div>
//                         <p style={errorColor}>{errors.about}</p>
//                         <input className="profile-page-input"
//                                id={"about"}
//                                autoFocus={true}
//                                onBlur={() => {
//                                    toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)
//                                }}
//                                type="text" value={values.about}
//                                onChange={handleChange}/>
//                     </div>
//                     :
//                     <p onDoubleClick={() => toggleProfileDataEditMode(aboutEditMode, setAboutEditMode)}>{values.about !== "no Info" ? values.about :
//                         <span><BiMessageSquareAdd/>Tell us about yourself</span>}</p>}
//             </div>
//             <div className={"profile-page-job-info-block"}>
//                 {values.description !== "" && <p>Applicant</p>}
//                 {jobEditMode ?
//                     <div>
//                         <p style={errorColor}>{errors.description}</p>
//                         <input className="profile-page-input"
//                                id={"description"}
//                                autoFocus={true}
//                                onBlur={() => {
//                                    toggleProfileDataEditMode(jobEditMode, setJobEditMode())
//                                }}
//                                type="text" value={values.description}
//                                onChange={handleChange}/>
//                     </div>
//                     :
//                     <p onDoubleClick={() => toggleProfileDataEditMode(jobEditMode, setJobEditMode)}>{isApplicant ? userJobInfo : !isApplicant && currentUser ? "Click to add applicant info.." : !isApplicant && !currentUser && "Not looking for a job"}</p>}
//
//             </div>
//             <div className={"profile-page-contacts-info-block"}
//                  onDoubleClick={() => !contactsEditMode && toggleProfileDataEditMode(contactsEditMode, setContactsEditMode)}>
//                 {contactsEditMode ?
//                     <div>
//                         <p><input className="profile-page-input" placeholder="youtube" type="text" value={youtubeLink}
//                                   onChange={(e) => setYoutubeLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="instagram" type="text"
//                                   value={instagramLink} onChange={(e) => setInstagramLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="facebook" type="text"
//                                   value={facebookLink} onChange={(e) => setFacebookLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="mainLink" type="text"
//                                   value={mainLink} onChange={(e) => setMainLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="github" type="text"
//                                   value={githubLink} onChange={(e) => setGithubLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="vk" type="text"
//                                   value={vkLink} onChange={(e) => setVkLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="website" type="text"
//                                   value={websiteLink} onChange={(e) => setWebsiteLink(e.currentTarget.value)}/></p>
//                         <p><input className="profile-page-input" placeholder="twitter" type="text"
//                                   value={twitterLink} onChange={(e) => setTwitterLink(e.currentTarget.value)}/></p>
//                     </div> :
//                     <div>
//                         <p>{youtubeLink}</p>
//                         <p>{instagramLink}</p>
//                         <p>{facebookLink}</p>
//                         <p>{mainLink}</p>
//                         <p>{githubLink}</p>
//                         <p>{vkLink}</p>
//                         <p>{websiteLink}</p>
//                         <p>{twitterLink}</p>
//                     </div>}
//             </div>
//         </form>
//     );
// }
//
// export default connect(null, {updateProfileTC})(ProfileData);