import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";

const ProfileData = (props) => {
    const {
        0: {userId, fullName, aboutMe, lookingForAJob: applicant, lookingForAJobDescription: description, contacts},
        1: isCurrentUser,
        2: updateProfile,
        3: directEditMode,
    } = props
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            isApplicant: applicant,
            applicantDescription: description,
            about: aboutMe,
        },

    })

    const {values, errors, handleChange} = formik

    useEffect(() => {
        formik.setFieldValue("isApplicant", applicant)
        formik.setFieldValue("applicantDescription", description)
        formik.setFieldValue("about", aboutMe)
    }, [applicant, description, aboutMe])


    const toggleEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && !editMode && directEditMode) {
            setEditMode(true)
        } else if (editMode && !errors.description) {
            setEditMode(false)
            debugger
            updateProfile(userId, values.about,
                values.isApplicant, values.applicantDescription,
                fullName, contacts.github,
                contacts.vk, contacts.facebook,
                contacts.instagram, contacts.twitter,
                contacts.website,
                contacts.youtube, contacts.mainlink)
        }
    }

    // STYLES REFS
    const descriptionBlockStyle = {
        "border": errors.applicantDescription ? "solid red" : descriptionEditMode && !errors.applicantDescription ? "solid yellow" : null
    }
    const aboutBlockStyle = {
        "border": errors.about ? "solid red" : aboutEditMode && !errors.about ? "solid yellow" : null
    }

    return (
        <div>
            <div style={{"background": values.isApplicant && "linear-gradient(400deg, #6391c7, #d9bb8f, #e4fa31, #3476fa)"}}
                 onDoubleClick={() => values.isApplicant ? formik.setFieldValue("isApplicant", false) : formik.setFieldValue("isApplicant", true)}
                 className={"user-data-block"}>
                {values.isApplicant && isCurrentUser ? "You are looking for a job" : values.isApplicant && !isCurrentUser ? "Looking for a job" : "Not looking for a job"}
            </div>
            {values.isApplicant && <div
                style={descriptionBlockStyle}
                className={"user-data-block"}>
                {descriptionEditMode ?
                    <input id={"applicantDescription"} className={"job-description-input"} onChange={handleChange}
                           onBlur={() => toggleEditMode(descriptionEditMode, setDescriptionEditMode)} autoFocus={true}
                           type="text" value={values.applicantDescription}/> :
                    <p className={"job-description"}
                       onDoubleClick={() => toggleEditMode(descriptionEditMode, setDescriptionEditMode)}>{values.applicantDescription ? values.applicantDescription : "No info about job/skills"}</p>}
            </div>}
            {errors.applicantDescription && <p className={"profile-page-input-error"}>{errors.applicantDescription}</p>}
            <div style={aboutBlockStyle} className={"user-data-block-about"}>{aboutEditMode ?
                <input id={"about"} className={"about-description-input"} onChange={handleChange}
                       onBlur={() => toggleEditMode(aboutEditMode, setAboutEditMode)} autoFocus={true}
                       type="text" value={values.about}/> :
                <p className={"job-description"}
                   onDoubleClick={() => toggleEditMode(aboutEditMode, setAboutEditMode)}>{values.about ? values.about : "No info"}</p>}</div>
            {errors.about && <p className={"profile-page-input-error"}>{errors.about}</p>}
        </div>

    )
}

export default ProfileData;
