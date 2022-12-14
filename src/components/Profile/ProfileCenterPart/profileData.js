import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";

const ProfileData = (props) => {
    const {
        0: {userId, fullName, aboutMe, lookingForAJob: applicant, lookingForAJobDescription: description, contacts},
        1: isCurrentUser,
        2: updateProfile
    } = props
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            isApplicant: applicant,
            applicantDescription: description,
            about: aboutMe,
        },
        validationSchema: Yup.object({
            description: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
        }),
    })

    const {values, errors, handleChange} = formik

    useEffect(() => {
        formik.setFieldValue("isApplicant", applicant)
        formik.setFieldValue("applicantDescription", !applicant ? "No info" : description)
        formik.setFieldValue("about", aboutMe)
    }, [applicant, description, aboutMe])

    const toggleEditMode = async (editMode, setEditMode) => {
        if (isCurrentUser && !editMode) {
            setEditMode(true)
        } else if (editMode && !errors.description) {
            setEditMode(false)
            await formik.setFieldValue("applicantDescription", values.applicantDescription === "" ? "No info" : values.applicantDescription)
            await formik.setFieldValue("isApplicant", values.applicantDescription !== "No info")
            updateProfile(userId, values.aboutMe,
                values.isApplicant, values.applicantDescription,
                fullName, contacts.github,
                contacts.vk, contacts.facebook,
                contacts.instagram, contacts.twitter,
                contacts.website,
                contacts.youtube, contacts.mainlink)
        }
    }

    return (
        <div>
            <div className={"user-data-block"}>
                {values.isApplicant && isCurrentUser ? "You are looking for a job" : values.isApplicant && !isCurrentUser ? "Looking for a job" : "Not looking for a job"}
            </div>
            <div className={"user-data-block"}>{descriptionEditMode ?
                <input id={"applicantDescription"} className={"job-description-input"} onChange={handleChange}
                       onBlur={() => toggleEditMode(descriptionEditMode, setDescriptionEditMode)} autoFocus={true}
                       type="text" value={values.applicantDescription}/> :
                <p  className={"job-description"} onDoubleClick={() => toggleEditMode(descriptionEditMode, setDescriptionEditMode)}>{values.applicantDescription}</p>}</div>
            <div className={"user-data-block-about"}>{descriptionEditMode ?
                <input id={"about"} className={"about-description-input"} onChange={handleChange}
                       onBlur={() => toggleEditMode(aboutEditMode, setAboutEditMode)} autoFocus={true}
                       type="text" value={values.about}/> :
                <p  className={"job-description"} onDoubleClick={() => toggleEditMode(aboutEditMode, setAboutEditMode)}>{values.about}</p>}</div>
        </div>

    )
}

export default ProfileData;
