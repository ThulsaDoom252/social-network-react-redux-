import React, {useEffect, useState} from 'react';
import {HiOutlineDotsHorizontal} from "react-icons/all";
import {useFormik} from "formik";
import * as Yup from "yup";

const LeftPart = (props) => {
    const {
        0: {aboutMe, userId, fullName, lookingForAJob, lookingForAJobDescription, contacts},
        1: isCurrentUser,
        2: email,
        3: updateProfile,
        4: directEditMode
    } = props
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            about: aboutMe
        },
        validationSchema: Yup.object({
            about: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
        }),
    })

    useEffect(() => {
        formik.setFieldValue("about", aboutMe)
    }, [aboutMe])

    const values = formik.values
    const {handleChange} = formik
    const toggleEditMode = (editMode, setEditMode) => {
        if (isCurrentUser && editMode === false) {
            setEditMode(true)
        } else if (editMode === true && !formik.errors.about) {
            setEditMode(false)
            updateProfile(
                userId,
                values.about,
                lookingForAJob, lookingForAJobDescription,
                fullName, contacts.github,
                contacts.vk, contacts.facebook,
                contacts.instagram, contacts.twitter,
                contacts.website, contacts.youtube,
                contacts.mainLink)
        }
    }

    console.log(values)

    return (
        <div className={"profile-page-left-part-container"}>
            <div className={"profile-page-left-part-userData"}>
                <div>
                    <span className={"profile-page-left-part-label"}>Id</span>
                    <p>{userId}</p>
                </div>
                <div className={"profile-page-left-part-about-block"}>
                    <span className={"profile-page-left-part-label"}>About</span>
                    <p className={"profile-page-left-part-about"}
                       onDoubleClick={() => toggleEditMode(aboutEditMode, setAboutEditMode)}>{aboutEditMode ?
                        <input id={"about"} onBlur={() => toggleEditMode(aboutEditMode, setAboutEditMode)}
                               className={"about-input"} onChange={handleChange} type={"text"} value={values.about}
                               autoFocus={true}/> : values.about}</p>
                </div>
                <div>
                    <p className={"profile-page-left-part-label"}>Email</p>
                    {isCurrentUser ? email : "No email"}
                </div>
            </div>
            <div className={"profile-page-left-part-button"}>
                <button><HiOutlineDotsHorizontal/></button>
            </div>
        </div>
    );
}


export default LeftPart;