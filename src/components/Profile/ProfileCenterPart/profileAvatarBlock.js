import React from 'react';
import Status from "./Status";
import {CgWebsite, SiFacebook, SiGithub, SiInstagram, SiTwitter, SiVk, SiYoutube} from "react-icons/all";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";

function ProfileAvatarBlock({
                                0: {
                                    userId,
                                    fullName,
                                    aboutMe,
                                    lookingForAJob,
                                    lookingForAJobDescription,
                                    photos: {large: largePhoto},
                                    contacts: {youtube, instagram, vk, facebook, github, twitter, website, mainlink}
                                },
                                1: isCurrentUser,
                                2: directEditMode,
                                3: updateProfile,
                                4: defaultAvatar,
                                5: status,
                                6: updateStatus,
                                7: toggleOverLay,
                                8: updatePhoto
                            }) {


    //Direct upload photo
    const hiddenFileInput = React.useRef(null);
    let uploadPhoto = (e) => updatePhoto(e.target.files[0])
    const handleClick = event => isCurrentUser ? hiddenFileInput.current.click() : null;

    const [nameEditMode, setNameEditMode] = useState(false)
    const [contactsBlockEditMode, setContactsBlockEditMode] = useState(false)
    const [youtubeEditMode, setYoutubeEditMode] = useState(false)
    const [twitterEditMode, setTwitterEditMode] = useState(false)
    const [instagramEditMode, setInstagramEditMode] = useState(false)
    const [facebookEditMode, setFacebookEditMode] = useState(false)
    const [githubEditMode, setGithubEditMode] = useState(false)
    const [vkEditMode, setVkEditMode] = useState(false)
    const [websiteEditMode, setWebsiteEditMode] = useState(false)
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
            name: Yup.string().required(),
            about: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
            jobDescription: Yup.string().min(4, 'Job description must contain more than 3 characters!').nullable(),
            vk: urlError,
            facebook: urlError,
            instagram: urlError,
            twitter: urlError,
            website: urlError,
            youtube: urlError,
            github: urlError,
            mainlink: urlError,

        }),
    })

    const toggleProfileDataEditMode = (editMode, setEditMode) => {
        if (editMode === false && isCurrentUser === true && directEditMode) {
            setEditMode(true)
        } else if (editMode === true && !formik.errors.name) {
            setEditMode(false)
            debugger
            updateProfile(userId, aboutInfo, (jobInfo !== "enter job description"), jobInfo, formik.values.name, formik.values.github, formik.values.vk, formik.values.facebook, formik.values.instagram,
                formik.values.twitter, formik.values.website, formik.values.youtube, formik.values.mainlink
            )
        }
    }

    const toggleContactEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
            toggleOverLay(true)
        } else {
            setEditMode(false)
            toggleOverLay(false)
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
        formik.setFieldValue("youtube", youtube)
        formik.setFieldValue("instagram", instagram)
        formik.setFieldValue("facebook", facebook)
        formik.setFieldValue("mainlink", mainlink)
        formik.setFieldValue("github", github)
        formik.setFieldValue("vk", vk)
        formik.setFieldValue("website", website)
        formik.setFieldValue("twitter", twitter)
    }, [youtube, instagram, facebook, mainlink, github, vk, website, twitter])

    let errors = formik.errors
    const contactClass = "profile-page-left-contact"
    let values = formik.values

    const isContactEditMode = youtubeEditMode || instagramEditMode || githubEditMode || facebookEditMode || twitterEditMode || websiteEditMode || vkEditMode


    const contactsData = [
        {
            id: "youtube",
            value: values.youtube,
            icon: <SiYoutube title={values.youtube}/>,
            editMode: youtubeEditMode,
            setEditMode: setYoutubeEditMode
        },
        {id: "vk", value: values.vk, icon: <SiVk title={values.vk}/>, editMode: vkEditMode, setEditMode: setVkEditMode},
        {id: "github", value: values.github, icon: <SiGithub title={values.github}/>},
        {id: "instagram", value: values.instagram, icon: <SiInstagram title={values.instagram}/>},
        {id: "facebook", value: values.facebook, icon: <SiFacebook title={values.facebook}/>},
        {id: "twitter", value: values.twitter, icon: <SiTwitter title={values.twitter}/>},
        {id: "website", value: values.website, icon: <CgWebsite title={values.website}/>}]


    window.em = contactEditMode

    return (
        <div className="profile-page-center-avatarBlockContainer">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <img className="profile-page-avatar"
                         onClick={directEditMode && handleClick}
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
                        {contactsData.map(contact => <span style={{"color": !contact.value && "gray"}}
                                                           className={`${contactClass} ${contactClass}-${contact.id}Icon`}>
                        {contact ? <Link onClick={(e) => {
                            if (contactsBlockEditMode) {
                                e.preventDefault()
                                toggleProfileDataEditMode(contactEditMode, setContactEditMode)
                            }
                        }}
                                         to={`//${contact.value}`} target={"_blank"}>
                            {contact.icon}</Link> : contact.icon}
                        </span>)}

                    </div>
                    {directEditMode && isCurrentUser ? <p
                        className={"direct-contact-edit-button"}
                        style={{"cursor": "pointer"}}
                        onClick={() => toggleProfileDataEditMode(contactsBlockEditMode, setContactsBlockEditMode)}>{contactsBlockEditMode ? "Choose contacts to edit" : "Edit Contacts"}</p> : null}
                </div>
            </form>
        </div>
    );
}

export default ProfileAvatarBlock;

// {contactEditMode &&
// <input id={`${contact.id}`} onChange={formik.handleChange} type="text"
//        placeholder={"contact"}
//        className={"contact-direct-input"} autoFocus={true}
//        onBlur={() => toggleProfileDataEditMode(contactEditMode, setContactEditMode)}
//        value={values.contact}/>}

// <span style={{"color": !youtube && "gray"}}
//       className={`${contactClass} ${contactClass}-youtubeIcon`}>
//                         {youtube ? <Link onClick={(e) => {
//                                 if (contactsEditMode) {
//                                     e.preventDefault()
//                                     toggleContactEditMode(youtubeEditMode, setYoutubeEditMode)
//                                 }
//                             }}
//                                          to={`//${values.youtube.toString()}`} target={"_blank"}><SiYoutube
//                                 title={values.youtube}/>{youtubeEditMode &&
//                                 <input id={"youtube"} onChange={formik.handleChange} type="text" placeholder={"contact"}
//                                        className={"contact-direct-input"} autoFocus={true}
//                                        onBlur={() => toggleContactEditMode(youtubeEditMode, setYoutubeEditMode)}
//                                        value={values.youtube}/>}</Link> :
//                             <SiYoutube title={"No youtube address"}/>}</span>

// <span style={{"color": !instagram && "gray"}}
//       className={`${contactClass} ${contactClass}-instagramIcon`}>
//                          {instagram ? <Link
//                                  onClick={(e) => {
//                                      if (contactsEditMode) {
//                                          e.preventDefault()
//                                          toggleContactEditMode(instagramEditMode, setInstagramEditMode)
//                                      }
//                                  }}
//                                  to={`//${values.instagram.toString()}`} target={"_blank"}><SiInstagram
//                                  title={instagram}/>{instagramEditMode &&
//                                  <input id={"instagram"} onChange={formik.handleChange} type="text" placeholder={"contact"}
//                                         className={"contact-direct-input"} autoFocus={true}
//                                         onBlur={() => toggleContactEditMode(instagramEditMode, setInstagramEditMode)}
//                                         value={values.instagram}/>}</Link> :
//                              <SiInstagram title={"No instagram address"}/>}
//                         </span>
// <span style={{"color": !facebook && "gray"}}
//       className={`${contactClass} ${contactClass}-facebookIcon`}>
//                          {facebook ? <Link
//                                  onClick={(e) => {
//                                      if (contactsEditMode) {
//                                          e.preventDefault()
//                                          toggleContactEditMode(facebookEditMode, setFacebookEditMode)
//                                      }
//                                  }}
//                                  to={`//${values.facebook.toString()}`} target={"_blank"}>
//                                  <SiFacebook
//                                      title={facebook}/>{facebookEditMode &&
//                                  <input id={"facebook"} onChange={formik.handleChange} type="text" placeholder={"contact"}
//                                         className={"contact-direct-input"} autoFocus={true}
//                                         onBlur={() => toggleContactEditMode(facebookEditMode, setFacebookEditMode)}
//                                         value={values.facebook}/>}</Link> :
//                              <SiFacebook title={"No facebook address"}/>}
//                        </span>
// <span style={{"color": !twitter && "gray"}}
//       className={`${contactClass} ${contactClass}-twitterIcon`}>
//                             {twitter ? <Link
//                                     onClick={(e) => {
//                                         if (contactsEditMode) {
//                                             e.preventDefault()
//                                             toggleContactEditMode(twitterEditMode, setTwitterEditMode)
//                                         }
//                                     }}
//                                     to={`//${values.twitter.toString()}`} target={"_blank"}><SiTwitter
//                                     title={twitter}/>
//                                     {twitterEditMode &&
//                                         <input id={"twitter"} onChange={formik.handleChange} type="text"
//                                                placeholder={"contact"}
//                                                className={"contact-direct-input"} autoFocus={true}
//                                                onBlur={() => toggleContactEditMode(twitterEditMode, setTwitterEditMode)}
//                                                value={values.twitter}/>}
//                                 </Link> :
//                                 <SiTwitter title={"No twitter address"}/>}
//                         </span>
// <span style={{"color": !website && "gray"}}
//       className={`${contactClass} ${contactClass}-websiteIcon`}>
//                             {website ? <Link
//                                 onClick={(e) => {
//                                     if (contactsEditMode) {
//                                         e.preventDefault()
//                                         toggleContactEditMode(websiteEditMode, setWebsiteEditMode)
//                                     }
//                                 }}
//                                 to={`//${values.website.toString()}`} target={"_blank"}><CgWebsite
//                                 title={website}/>
//                                 {websiteEditMode &&
//                                     <input id={"website"} onChange={formik.handleChange} type="text"
//                                            placeholder={"contact"}
//                                            className={"contact-direct-input"} autoFocus={true}
//                                            onBlur={() => toggleContactEditMode(websiteEditMode, setWebsiteEditMode)}
//                                            value={values.website}/>}</Link> : <CgWebsite title={"No website"}/>}
//                            </span>
// <span style={{"color": !vk && "gray"}} className={`${contactClass} ${contactClass}-vkIcon`}>
//                             {vk ? <Link
//                                 onClick={(e) => {
//                                     if (contactsEditMode) {
//                                         e.preventDefault()
//                                         toggleContactEditMode(vkEditMode, setVkEditMode)
//                                     }
//                                 }}
//                                 to={`//${values.vk.toString()}`}
//                                 target={"_blank"}><SiVk
//                                 title={vk}/>
//                                 {vkEditMode &&
//                                     <input id={"vk"} onChange={formik.handleChange} type="text" placeholder={"contact"}
//                                            className={"contact-direct-input"} autoFocus={true}
//                                            onBlur={() => toggleContactEditMode(vkEditMode, setVkEditMode)}
//                                            value={values.vk}/>}
//                             </Link> : <SiVk title={"No website link"}/>}
//                            </span>
// <span style={{"color": !github && "gray"}}
//       className={`${contactClass} ${contactClass}-gitHubIcon`}>
//                             {github ? <Link
//                                     onClick={(e) => {
//                                         if (contactsEditMode) {
//                                             e.preventDefault()
//                                             toggleContactEditMode(githubEditMode, setGitHubEditMode)
//                                         }
//                                     }}
//                                     to={`//${values.github.toString()}`} target={"_blank"}><SiGithub
//                                     title={github}/>
//                                     {githubEditMode &&
//                                         <input id={"github"} onChange={formik.handleChange} type="text"
//                                                placeholder={"contact"}
//                                                className={"contact-direct-input"} autoFocus={true}
//                                                onBlur={() => toggleContactEditMode(githubEditMode, setGitHubEditMode)}
//                                                value={values.github}/>}</Link> :
//                                 <SiGithub title={"No github repositories link"}/>}
//                         </span>


//
// unction ProfileAvatarBlock(props) {
//     const {
//         0: {
//             userId,
//             fullName,
//             aboutMe,
//             lookingForAJob,
//             lookingForAJobDescription,
//             contacts: {youtube, instagram, website, facebook, twitter, github, mainlink, vk},
//             photos: {large: largePhoto}
//         }, 1: isCurrentUser,
//         2: directEditMode,
//         3: updateProfile,
//         4: defaultAvatar,
//         5: status,
//         6: updateStatus,
//         7: toggleOverlay,
//         8: updatePhoto
//     } = props
//
//
//     //Direct upload photo
//     const hiddenFileInput = React.useRef(null);
//     let uploadPhoto = (e) => updatePhoto(e.target.files[0])
//     const handleClick = event => isCurrentUser ? hiddenFileInput.current.click() : null;
//
//     const [nameEditMode, setNameEditMode] = useState(false)
//     const [contactsBlockEditMode, setContactsBlockEditMode] = useState(false)
//     const [youtubeEditMode, setYoutubeEditMode] = useState(false)
//     const [twitterEditMode, setTwitterEditMode] = useState(false)
//     const [instagramEditMode, setInstagramEditMode] = useState(false)
//     const [facebookEditMode, setFacebookEditMode] = useState(false)
//     const [githubEditMode, setGithubEditMode] = useState(false)
//     const [vkEditMode, setVkEditMode] = useState(false)
//     const [websiteEditMode, setWebsiteEditMode] = useState(false)
//
//     const contactsArray = [
//         youtube === null ? "" : youtube,
//         instagram === null ? "" : instagram,
//         facebook === null ? "" : facebook,
//         mainlink === null ? "" : mainlink,
//         github ? "" : github,
//         vk ? "" : vk,
//         website === null ? "" : website,
//         twitter === null ? "" : twitter,
//     ]
//
//     const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()
//
//     const formik = useFormik({
//         initialValues: {
//             name: fullName,
//             about: aboutMe,
//             isApplicant: lookingForAJob,
//             description: lookingForAJobDescription,
//             website: website,
//             vk: vk,
//             facebook: facebook,
//             twitter: twitter,
//             instagram: instagram,
//             github: github,
//             mainlink: mainlink,
//             youtube: youtube,
//         },
//
//         validationSchema: Yup.object({
//             name: Yup.string().min(4, 'Your name must be longer than 3 characters').required(),
//             about: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
//             jobDescription: Yup.string().min(4, 'Job description must contain more than 3 characters!').nullable(),
//             vk: urlError,
//             facebook: urlError,
//             instagram: urlError,
//             twitter: urlError,
//             website: urlError,
//             youtube: urlError,
//             github: urlError,
//             mainLink: urlError,
//
//         }),
//     })
//
//     const toggleProfileDataEditMode = (editMode, setEditMode) => {
//         if (editMode === false && isCurrentUser === true && directEditMode) {
//             setEditMode(true)
//         } else if (editMode === true && !formik.errors.name) {
//             setEditMode(false)
//             updateProfile(userId, aboutInfo, (jobInfo !== "enter job description"), jobInfo, formik.values.name, formik.values.github, formik.values.vk, formik.values.facebook, formik.values.instagram,
//                 formik.values.twitter, formik.values.website, formik.values.youtube, formik.values.mainLink
//             )
//         }
//     }
//
//     const toggleContactEditMode = (editMode, setEditMode) => {
//         if (isCurrentUser && !editMode && directEditMode) {
//             setEditMode(true)
//             toggleOverlay(true)
//         } else {
//             setEditMode(false)
//             toggleOverlay(false)
//         }
//     }
//
//     let aboutInfo = formik.values.about === "" ? "no info" : formik.values.about
//     let jobInfo = formik.values.jobDescription === "" ? "enter job description" : formik.values.jobDescription
//     const errorStyle = "profile-page-input-error"
//
//     useEffect(() => {
//         formik.setFieldValue("name", fullName)
//         formik.setFieldValue("about", aboutMe)
//         formik.setFieldValue("isLookingForAJob", lookingForAJob)
//         formik.setFieldValue("jobDescription", lookingForAJobDescription)
//     }, [fullName, aboutMe, lookingForAJob, lookingForAJobDescription])
//
//     useEffect(() => {
//         formik.setFieldValue("youtube", contactsArray[0])
//         formik.setFieldValue("instagram", contactsArray[1])
//         formik.setFieldValue("facebook", contactsArray[2])
//         formik.setFieldValue("mainLink", contactsArray[3])
//         formik.setFieldValue("github", contactsArray[4])
//         formik.setFieldValue("vk", contactsArray[5])
//         formik.setFieldValue("website", contactsArray[6])
//         formik.setFieldValue("twitter", contactsArray[7])
//     }, contactsArray)
//
//     let errors = formik.errors
//     const contactClass = "profile-page-left-contact"
//     let values = formik.values
//
//     const isContactEditMode = youtubeEditMode || instagramEditMode || githubEditMode || facebookEditMode || twitterEditMode || websiteEditMode || vkEditMode
//     console.log(isContactEditMode);
//
//     return (
//         <div className="profile-page-center-avatarBlockContainer">
//             <form onSubmit={formik.handleSubmit}>
//                 <div>
//                     <input ref={hiddenFileInput}
//                            hidden={true} type={"file"}
//                            onChange={uploadPhoto}/>
//                     <img className="profile-page-avatar"
//                          onClick={directEditMode && handleClick}
//                          src={largePhoto ? largePhoto : defaultAvatar}
//                          alt="large photo"/>
//                     <p onDoubleClick={() => toggleProfileDataEditMode(nameEditMode, setNameEditMode)}
//                        className={"profile-page-left-part-name"}>{
//                         nameEditMode ?
//                             <input style={{"border": errors.name ? "solid red thin" : "solid thin"}} type={"text"}
//                                    id={"name"}
//                                    className={"name-input"} onChange={formik.handleChange}
//                                    value={values.name} autoFocus={true} onBlur={() =>
//                                 toggleProfileDataEditMode(nameEditMode, setNameEditMode)}/> : values.name}</p>
//                     {errors.name && <p className={"profile-page-input-error"}>{errors.name}</p>}
//                     <Status {...[status, isCurrentUser, updateStatus]}/>
//                     <div className={"profile-page-left-contacts-block"}>
//                         {contactsBlockEditMode && <input type="text" className={"contact-direct-input"}/>}
//                         <ContactBlock contact={values.youtube}
//                                       contactIconStyle="youtubeIcon"
//                                       contactEditMode={youtubeEditMode}
//                                       setContactEditMode={setYoutubeEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"youtube"}
//                         />
//                         <ContactBlock contact={values.instagram}
//                                       contactIconStyle="instagramIcon"
//                                       contactEditMode={instagramEditMode}
//                                       setContactEditMode={setInstagramEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"instagram"}
//                         />
//                         <ContactBlock contact={values.facebook}
//                                       contactIconStyle="facebookIcon"
//                                       contactEditMode={facebookEditMode}
//                                       setContactEditMode={setFacebookEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"facebook"}
//                         />
//                         <ContactBlock contact={values.twitter}
//                                       contactIconStyle="twitterIcon"
//                                       contactEditMode={twitterEditMode}
//                                       setContactEditMode={setTwitterEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"twitter"}
//                         />
//                         <ContactBlock contact={values.vk}
//                                       contactIconStyle="vkIcon"
//                                       contactEditMode={vkEditMode}
//                                       setContactEditMode={setVkEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"vk"}
//                         />
//                         <ContactBlock contact={values.github}
//                                       contactIconStyle="githubIcon"
//                                       contactEditMode={githubEditMode}
//                                       setContactEditMode={setGithubEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"github"}
//                         />
//                         <ContactBlock contact={values.website}
//                                       contactIconStyle="websiteIcon"
//                                       contactEditMode={websiteEditMode}
//                                       setContactEditMode={setWebsiteEditMode}
//                                       toogleContactEditMode={toggleContactEditMode}
//                                       contactsBlockEditMode={contactsBlockEditMode}
//                                       contactIcon={"website"}
//                         />
//
//                     </div>
//                     {directEditMode && isCurrentUser ? <p
//                         className={"direct-contact-edit-button"}
//                         style={{"cursor": "pointer"}}
//                         onClick={() => toggleProfileDataEditMode(contactsBlockEditMode, setContactsBlockEditMode)}>{contactsBlockEditMode ? "Choose contacts to edit" : "Edit Contacts"}</p> : null}
//                 </div>
//             </form>
//         </div>
//     );
// }
//
// export default ProfileAvatarBlock;
