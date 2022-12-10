import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik'
import * as Yup from "yup";
import {connect} from "react-redux";
import {setUserTC, updatePhotoTC, updateProfileTC} from "../../../../redux/profile-reducer/profile-reducer";
import authHoc from "../../../HOC/authHoc";

function EditProfileData(props) {
    const userId = props.currentId
    useEffect(() => {
        props.setUserTC(userId)
    }, [])

    const hiddenFileInput = React.useRef(null);

    let uploadPhoto = (e) => {
        props.updatePhotoTC(e.target.files[0])
    }
    const handleClick = event =>  hiddenFileInput.current.click()

    const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()
    const {handleSubmit, handleChange, values, touched, errors} = useFormik({
        initialValues: {
            name: props.profile.fullName,
            about: props.profile.aboutMe,
            isApplicant: props.profile.lookingForAJob,
            description: props.profile.lookingForAJobDescription,
            website: props.contacts.website,
            vk: props.contacts.vk,
            facebook: props.contacts.facebook,
            twitter: props.contacts.twitter,
            instagram: props.contacts.instagram,
            github: props.contacts.github,
            mainlink: props.contacts.mainlink,
            youtube: props.contacts.youtube,

        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be longer than 3 characters').required(),
            about: Yup.string().min(3, 'Must contain more than 3 characters!').required(),
            description: Yup.string().min(3, 'Description must contain more than 3 characters!').nullable().required(),
            vk: urlError,
            facebook: urlError,
            instagram: urlError,
            twitter: urlError,
            website: urlError,
            youtube: urlError,
            gitHub: urlError,
            mainLink: urlError,

        }),
        onSubmit: ({
                       name,
                       about,
                       isApplicant,
                       description,
                       website,
                       vk,
                       facebook,
                       twitter,
                       instagram,
                       youtube,
                       gitHub,
                       mainLink
                   }) => {
            debugger
            props.updateProfileTC(props.currentId, about, isApplicant, description, name, gitHub, vk, facebook, instagram,
                twitter, website, youtube, mainLink
            )
            // props.fetchingAC(true)
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <div className={"edit-profile-page-container"}>
                <div className={"edit-profile-avatar-block"}>
                    <p style={{"font-size":"1.2rem"}}>Edit Photo</p>
                    <img className={"edit-profile-avatar"} src={props.photos.large} alt="edit-avatar"/>
                    <input ref={hiddenFileInput}
                           hidden={true} type={"file"}
                           onChange={uploadPhoto}/>
                    <button type="button" className={"upload-avatar-button"} onClick={handleClick}>Upload photo</button>
                    <p className={"edit-profile-email"}>{props.email}</p>
                </div>
                <div className={"edit-profile-data-block "}>
                    <p className={"edit-profile-title"}>Edit Profile</p>
                    <div className={"data-first-block"}>
                        <div>
                            <div>
                                <span className={"name-error edit-error"}>{errors.name}</span>
                                <span className={"about-error edit-error"}>{errors.about}</span>
                            </div>
                            <input id={"name"} type="text" className={"edit-profile-input"} placeholder={"Name"}
                                   onChange={handleChange} value={values.name}/>
                            <input id={"about"} type="text"
                                   className={"edit-profile-input"}
                                   placeholder={"About info"}
                                   onChange={handleChange}
                                   value={values.about}/>
                        </div>
                    </div>
                    <div className={"data-second-block"}>
                        <div className={"edit-profile-checkbox-block"}>
                            <span className={"applicant-label"}>Are you looking for a job?</span>
                            <input id={"isApplicant"} type="checkbox" checked={values.isApplicant === true}
                                   onChange={handleChange}/>
                        </div>
                        <div hidden={values.isApplicant === false}>
                            <p className={"job-description-label"}>Enter job description</p>
                            <p className={"description-error edit-error"}>{errors.description}</p>
                            <input id={"description"} type="text"
                                   className={"edit-profile-input edit-profile-job-description-input"}
                                   placeholder={"enter a job description"}
                                   onChange={handleChange}
                                   value={values.description}/>
                        </div>
                        <button className={"edit-profile-page-submit-button"} type={"submit"}
                                onSubmit={handleSubmit}>Submit...
                        </button>
                    </div>
                </div>
                <div className={"edit-profile-contacts-block"}>
                    <p className={"edit-profile-contact-title"}>Edit your Contacts</p>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>Youtube</p>
                        <input id={"youtube"} onChange={handleChange} className={"edit-profile-contact-input"}
                                type="text" value={values.youtube}
                                 placeholder={"Youtube url"}
                        />
                        <p className={"contact-error edit-error"}>{errors.youtube}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>Instagram</p>
                        <input id={"instagram"} onChange={handleChange} className={"edit-profile-contact-input"}
                               type="text" value={values.instagram}
                               placeholder={"Instagram url"}
                        />
                        <p className={"contact-error edit-error"}>{errors.instagram}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>Facebook</p>
                        <input id={"facebook"} onChange={handleChange} className={"edit-profile-contact-input"}
                               type="text" value={values.facebook}
                               placeholder={"Facebook url"}
                        />
                        <p className={"contact-error edit-error"}>{errors.facebook}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>Twitter</p>
                        <input id={"twitter"} onChange={handleChange} className={"edit-profile-contact-input"}
                               type="text" value={values.twitter}
                        placeholder={"Twitter url"}
                        />
                        <p className={"contact-error edit-error"}>{errors.twitter}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>Vk</p>
                        <input id={"vk"} onChange={handleChange} className={"edit-profile-contact-input"} type="text"
                               value={values.vk}  placeholder={"Vk url"}/>
                        <p className={"contact-error edit-error"}>{errors.vk}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>MainLink</p>
                        <input id={"mainlink"} onChange={handleChange} className={"edit-profile-contact-input"}
                               type="text" placeholder={"Mainlink url"} value={values.mainlink}/>
                        <p className={"contact-error edit-error"}>{errors.mainlink}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>Website</p>
                        <input id={"website"} onChange={handleChange} className={"edit-profile-contact-input"}
                               type="text" value={values.website}
                                placeholder={"Website url"}
                        />
                        <p className={"contact-error edit-error"}>{errors.website}</p>
                    </div>
                    <div className={"edit-profile-contact-block"}>
                        <p className={"edit-profile-contact-label"}>GitHub</p>
                        <input id={"github"} onChange={handleChange} className={"edit-profile-contact-input"}
                               type="text" value={values.github}
                               placeholder={"Github url"}
                        />
                        <p className={"contact-error edit-error"}>{errors.github}</p>
                    </div>

                </div>
            </div>
        </form>
    );
}

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        contacts: state.profilePage.contacts,
        photos: state.profilePage.photos,
        auth: state.auth.isLogged,
        currentId: state.auth.id,
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {
    setUserTC, updateProfileTC, updatePhotoTC
})(authHoc(EditProfileData));