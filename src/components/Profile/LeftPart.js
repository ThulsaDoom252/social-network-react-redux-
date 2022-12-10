import React, {useEffect, useState} from 'react';
import {HiOutlineDotsHorizontal} from "react-icons/all";
import {useFormik} from "formik";
import * as Yup from "yup";

const LeftPart = (props) => {
    const {0: userId, 1: isCurrentUser, 2: email, 3: about, 4: updateProfile, 5: directEditMode} = props
    const [aboutEditMode, setAboutEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            about: about
        },
        validationSchema: Yup.object({
            about: Yup.string().min(4, 'Info must contain more than 3 characters!').nullable(),
        }),
    })

    useEffect(() => {
        formik.setFieldValue("name", about)
    }, [about])

    return (
        <div className={"profile-page-left-part-container"}>
            <div className={"profile-page-left-part-userData"}>
                <div>
                    <span className={"profile-page-left-part-label"}>Id</span>
                    <p>{userId}</p>
                </div>
                <div>
                    <span className={"profile-page-left-part-label"}>About</span>
                    <p>{about}</p>
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