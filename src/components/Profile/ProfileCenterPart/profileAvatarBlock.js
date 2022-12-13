import React from 'react';
import {connect} from "react-redux";
import {updatePhotoTC, updateProfileTC} from "../../../redux/profile-reducer/profile-reducer";
import Status from "./Status";
import {CgWebsite, SiFacebook, SiGithub, SiInstagram, SiTwitter, SiVk, SiYoutube} from "react-icons/all";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";

function ProfileAvatarBlock(props) {
    const {
        0: {
            userId,
            fullName,
            aboutMe,
            lookingForAJob,
            lookingForAJobDescription,
            contacts: {youtube, instagram, website, facebook, twitter, github, mainlink, vk},
            photos: {large: largePhoto}
        }, 1: isCurrentUser,
        2: directEditMode,
        3: updateProfile,
        4: defaultAvatar,
        5: status,
        6: updateStatus,
        7: toggleOverlay,
    } = props
    const hiddenFileInput = React.useRef(null);

    let uploadPhoto = (e) => {
        props.updatePhotoTC(e.target.files[0])
    }

    const handleClick = event => isCurrentUser ? hiddenFileInput.current.click() : null;
    const contactClass = "profile-page-left-contact"

    const [nameEditMode, setNameEditMode] = useState(false)
    const [contactsEditMode, setContactsEditMode] = useState(false)
    const [contactEditMode, setContactEditMode] = useState(false)

    const contactsArray = [
        youtube === null ? "" : youtube,
        instagram === null ? "" : instagram,
        facebook === null ? "" : facebook,
        mainlink === null ? "" : mainlink,
        github ? "" : github,
        vk ? "" : vk,
        website === null ? "" : website,
        twitter === null ? "" : twitter,
    ]

    const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()

    const formik = useFormik({
        initialValues: {
            name: fullName,
            about: aboutMe,
            isApplicant: lookingForAJob,
            description: lookingForAJobDescription,
            website: website,
            vk: vk,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            github: github,
            mainlink: mainlink,
            youtube: youtube,
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
        if (editMode === false && isCurrentUser === true && directEditMode) {
            setEditMode(true)
        } else if (editMode === true && !formik.errors.name) {
            setEditMode(false)
            updateProfile(userId, aboutInfo, (jobInfo !== "enter job description"), jobInfo, formik.values.name, formik.values.github, formik.values.vk, formik.values.facebook, formik.values.instagram,
                formik.values.twitter, formik.values.website, formik.values.youtube, formik.values.mainLink
            )
        }
    }

    let aboutInfo = formik.values.about === "" ? "no info" : formik.values.about
    let jobInfo = formik.values.jobDescription === "" ? "enter job description" : formik.values.jobDescription
    const errorStyle = "profile-page-input-error"

    useEffect(() => {
        formik.setFieldValue("name", fullName)
        formik.setFieldValue("about", aboutMe)
        formik.setFieldValue("isLookingForAJob", lookingForAJob)
        formik.setFieldValue("jobDescription", lookingForAJobDescription)
    }, [fullName, aboutMe, lookingForAJob, lookingForAJobDescription])

    useEffect(() => {
        formik.setFieldValue("youtube", contactsArray[0])
        formik.setFieldValue("instagram", contactsArray[1])
        formik.setFieldValue("facebook", contactsArray[2])
        formik.setFieldValue("mainLink", contactsArray[3])
        formik.setFieldValue("github", contactsArray[4])
        formik.setFieldValue("vk", contactsArray[5])
        formik.setFieldValue("website", contactsArray[6])
        formik.setFieldValue("twitter", contactsArray[7])
    }, contactsArray)

    let values = formik.values
    let errors = formik.errors

    return (
        <div className="profile-page-center-avatarBlockContainer">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <img className="profile-page-avatar"
                         onClick={handleClick}
                         src={largePhoto ? largePhoto : defaultAvatar}
                         alt="large photo"/>
                    <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}
                       className={"profile-page-left-part-name"}>{
                        nameEditMode ?
                            <input style={{"border": errors.name ? "solid red thin" : "solid thin"}} type={"text"}
                                   id={"name"}
                                   className={"name-input"} onChange={formik.handleChange}
                                   value={values.name} autoFocus={true} onBlur={() =>
                                toggleProfileDataEditMode(nameEditMode, setNameEditMode)}/> : values.name}</p>
                    {errors.name && <p className={"profile-page-input-error"}>{errors.name}</p>}
                    <Status {...[status, isCurrentUser, updateStatus]}/>
                    <div className={"profile-page-left-contacts-block"}>
                    <span style={{"color": !youtube && "gray"}}
                          className={`${contactClass} ${contactClass}-youtubeIcon`}>
                        {youtube ? <Link onClick = {(e) => {
                            if(contactsEditMode) {
                                e.preventDefault()
                                setContactEditMode(true)
                            }
                            }}
                                to={`${youtube.toString()}`} target={"_blank"}><SiYoutube
                                title={youtube}/></Link> :
                            <SiYoutube title={"No youtube address"}/>}</span>
                        <span style={{"color": !instagram && "gray"}}
                              className={`${contactClass} ${contactClass}-instagramIcon`}>
                         {instagram ? <Link
                                 to={`//${instagram.toString()}`} target={"_blank"}><SiInstagram
                                 title={instagram}/></Link> :
                             <SiInstagram title={"No instagram address"}/>}
                        </span>
                        <span style={{"color": !facebook && "gray"}}
                              className={`${contactClass} ${contactClass}-facebookIcon`}>
                         {facebook ? <Link
                                 to={`//${facebook}`} target={"_blank"}>
                                 <SiFacebook
                                     title={facebook}/></Link> :
                             <SiFacebook title={"No facebook address"}/>}
                       </span>
                        <span style={{"color": !twitter && "gray"}}
                              className={`${contactClass} ${contactClass}-twitterIcon`}>
                            {twitter ? <Link
                                    to={`//${twitter}`} target={"_blank"}><SiTwitter
                                    title={twitter}/></Link> :
                                <SiTwitter title={"No twitter address"}/>}
                        </span>
                        <span style={{"color": !website && "gray"}}
                              className={`${contactClass} ${contactClass}-websiteIcon`}>
                            {website ? <Link
                                to={`//${website}`} target={"_blank"}><CgWebsite
                                title={website}/></Link> : <CgWebsite title={"No website"}/>}
                           </span>
                        <span style={{"color": !vk && "gray"}} className={`${contactClass} ${contactClass}-vkIcon`}>
                            {vk ? <Link
                                to={`//${vk}`}
                                target={"_blank"}><SiVk
                                title={vk}/></Link> : <SiVk title={"No website link"}/>}
                           </span>
                        <span style={{"color": !github && "gray"}}
                              className={`${contactClass} ${contactClass}-gitHubIcon`}>
                            {github ? <Link
                                    to={`//${github}`} target={"_blank"}><SiGithub
                                    title={github}/></Link> :
                                <SiGithub title={"No github repositories link"}/>}
                        </span>
                        {contactEditMode && <input type="text" placeholder={"contact"} className={"contact-direct-input"}/>}
                    </div>
                    {directEditMode && <p style={{"cursor": "pointer"}} onClick={() => toggleProfileDataEditMode(contactsEditMode, setContactsEditMode)}>{contactsEditMode ? "Choose contacts to edit" : "Edit Contacts"}</p>}
                </div>
            </form>
        </div>
    );
}

export default connect(null, {updatePhotoTC, updateProfileTC})(ProfileAvatarBlock);