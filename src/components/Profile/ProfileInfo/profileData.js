import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {updateProfileTC} from "../../../redux/profile-reducer";
import {BiMessageSquareAdd} from "react-icons/bi";
import {AiOutlinePlusSquare} from "react-icons/all";

const ProfileData = (props) => {
    const currentUser = props.currentUser
    const isCurrentUser = currentUser.toString() === props.userId.toString()
    const [nameEditMode, setNameEditMode] = useState(false)
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const [jobEditMode, setJobEditMode] = useState(false)
    const [contactsEditMode, setContactsEditMode] = useState(false)
    const [youtubeEditMode, setYoutubeEditMode] = useState(false)
    const [instagramEditMode, setInstagramEditMode] = useState(false)
    const [facebookEditMode, setFacebookEditMode] = useState(false)
    const [mainLinkEditMode, setMainLinkEditMode] = useState(false)
    const [githubEditMode, setGithubEditMode] = useState(false)
    const [vkEditMode, setVkEditMode] = useState(false)
    const [websiteEditMode, setWebsiteEditMode] = useState(false)
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
            website: props.profile.contacts.website,
            vk: props.profile.contacts.vk,
            facebook: props.profile.contacts.facebook,
            twitter: props.profile.contacts.twitter,
            instagram: props.profile.contacts.instagram,
            github: props.profile.contacts.github,
            mainLink: props.profile.contacts.mainLink,
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
            github: urlError,
            mainLink: urlError,

        }),
    })

    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (editMode === false && isCurrentUser === true) {
            setEditMode(true)
        } else if (editMode === true && !formik.errors.name && !formik.errors.about && !formik.errors.jobDescription) {
            setEditMode(false)
            props.updateProfileTC(currentUser, aboutInfo, (jobInfo !== "enter job description"), jobInfo, formik.values.name, formik.values.github, formik.values.vk, formik.values.facebook, formik.values.instagram,
                formik.values.twitter, formik.values.website, formik.values.youtube, formik.values.mainLink
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
        formik.setFieldValue("instagram", contactsArray[1] === null ? "" : contactsArray[1])
        formik.setFieldValue("facebook", contactsArray[2] === null ? "" : contactsArray[2])
        formik.setFieldValue("mainLink", contactsArray[3] === null ? "" : contactsArray[3])
        formik.setFieldValue("github", contactsArray[4] === null ? "" : contactsArray[4])
        formik.setFieldValue("vk", contactsArray[5] === null ? "" : contactsArray[5])
        formik.setFieldValue("website", contactsArray[6] === null ? "" : contactsArray[6])
        formik.setFieldValue("twitter", contactsArray[7] === null ? "" : contactsArray[7])
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
                    {youtubeEditMode === true ?
                        <p>
                            <p className={errorStyle}>{formik.errors.youtube}</p>
                            <input className="profile-page-input"
                                   id={"youtube"}
                                   placeholder="youtube" type="text"
                                   value={formik.values.youtube}
                                   onBlur={() => toggleProfileDataEditMode(youtubeEditMode, setYoutubeEditMode)}
                                   autoFocus={true}
                                   onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(youtubeEditMode, setYoutubeEditMode)}>{formik.values.youtube === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add Youtube</span> : formik.values.youtube}</p>
                    }
                    {instagramEditMode ?
                        <p>
                            <p className={errorStyle}>{formik.errors.instagram}</p>
                            <input className="profile-page-input"
                                   id={"instagram"}
                                   placeholder="instagram" type="text"
                                   autoFocus={true}
                                   onBlur={() => toggleProfileDataEditMode(instagramEditMode, setInstagramEditMode)}
                                   value={formik.values.instagram} onChange={formik.handleChange}/>
                        </p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(instagramEditMode, setInstagramEditMode)}>{formik.values.instagram === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add Instagram</span> : formik.values.instagram}</p>
                    }
                    {facebookEditMode ? <p>
                            <p className={errorStyle}>{formik.errors.facebook}</p>
                            <input className="profile-page-input" placeholder="facebook" type="text"
                                   autoFocus={true}
                                   id={"facebook"}
                                   onBlur={() => toggleProfileDataEditMode(facebookEditMode, setFacebookEditMode)}
                                   value={formik.values.facebook}
                                   onChange={formik.handleChange}/>
                        </p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(facebookEditMode, setFacebookEditMode)}>{formik.values.facebook === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add Facebook</span> : formik.values.facebook}</p>
                    }

                    {mainLinkEditMode ? <p>
                            <p className={errorStyle}>{formik.errors.mainLink}</p>
                            <input className="profile-page-input"
                                   id={"mainLink"}
                                   placeholder="mainLink" type="text"
                                   autoFocus={true}
                                   onBlur={() => toggleProfileDataEditMode(mainLinkEditMode, setMainLinkEditMode)}
                                   value={formik.values.mainLink}
                                   onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(mainLinkEditMode, setMainLinkEditMode)}>{formik.values.mainLink === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add MainLink </span> : formik.values.mainLink}</p>
                    }
                    {githubEditMode ? <p>
                            <p className={errorStyle}>{formik.errors.github}</p>
                            <input className="profile-page-input"
                                   id={"github"}
                                   placeholder="github"
                                   type="text"
                                   autoFocus={true}
                                   onBlur={() => toggleProfileDataEditMode(githubEditMode, setGithubEditMode)}
                                   value={formik.values.github}
                                   onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(githubEditMode, setGithubEditMode)}>{formik.values.github === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/> Add GitHub</span> : formik.values.github}</p>
                    }
                    {vkEditMode ? <p>
                            <p className={errorStyle}>{formik.errors.vk}</p>
                            <input className="profile-page-input"
                                   id={"vk"}
                                   placeholder="vk"
                                   type="text"
                                   autoFocus={true}
                                   onBlur={() => toggleProfileDataEditMode(vkEditMode, setVkEditMode)}
                                   value={formik.values.vk} onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(vkEditMode, setVkEditMode)}>{formik.values.vk === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/>Add Vk</span> : formik.values.vk}</p>
                    }
                    {websiteEditMode ? <p>
                            <p className={errorStyle}>{formik.errors.website}</p>
                            <input className="profile-page-input"
                                   id={"website"}
                                   placeholder="website"
                                   type="text"
                                   autoFocus={true}
                                   onBlur={() => toggleProfileDataEditMode(websiteEditMode, setWebsiteEditMode)}
                                   value={formik.values.website}
                                   onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(websiteEditMode, setWebsiteEditMode)}>{formik.values.website === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/>Add website</span> : formik.values.website}</p>
                    }
                    {twitterEditMode ? <p>
                            <p>{formik.errors.twitter}</p>
                            <input
                                id={"twitter"}
                                className="profile-page-input"
                                placeholder="twitter"
                                type="text"
                                autoFocus={true}
                                onBlur={() => toggleProfileDataEditMode(twitterEditMode, setTwitterEditMode)}
                                value={formik.values.twitter}
                                onChange={formik.handleChange}/></p> :
                        <p onDoubleClick={() => toggleProfileDataEditMode(twitterEditMode, setTwitterEditMode)}>{formik.values.twitter === "" && isCurrentUser ?
                            <span><AiOutlinePlusSquare/>Add twitter</span> : formik.values.twitter}</p>
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