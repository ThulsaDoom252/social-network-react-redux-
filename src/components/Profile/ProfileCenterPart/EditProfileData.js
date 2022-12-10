import React from 'react';

function EditProfileData(props) {
    return (
        <div className={"edit-profile-page-container"}>
            <div className={"edit-profile-avatar-block"}>
                <img className={"edit-profile-avatar"} src="avatar" alt="edit-avatar"/>
            </div>
            <div className={"edit-profile-data-block "}>
                <p className={"edit-profile-title"}>Edit Profile</p>
                <div className={"data-first-block"}>
                    <div>
                        <input type="text" className={"edit-profile-input"} placeholder={"Жопа"}/>
                        <input type="text" className={"edit-profile-input"} placeholder={"About info"}/>
                    </div>
                </div>
                <div className={"data-second-block"}>
                    <div className={"edit-profile-checkbox-block"}>
                        <span>Are you looking for a job?</span>
                        <input type="checkbox"/>
                    </div>
                    <p>Enter job description</p>
                    <input type="text" className={"edit-profile-input edit-profile-job-description-input"}/>
                    <button className={"edit-profile-page-submit-button"}>Submit...</button>
                </div>
            </div>
            <div className={"edit-profile-contacts-block"}>
                <p className={"edit-profile-contact-title"}>Edit your Contacts</p>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>Youtube</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>Instagram</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>Facebook</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>Twitter</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>Vk</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>MainLink</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>Website</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={"edit-profile-contact-label"}>GitHub</p>
                    <input className={"edit-profile-contact-input"} type="text"/>
                </div>

            </div>
        </div>
    );
}

export default EditProfileData