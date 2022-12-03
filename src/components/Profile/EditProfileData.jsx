import React from 'react';
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import currentUserDataTC, {setUserTC} from "../../redux/profile-reducer/profile-reducer";

const EditProfileData = (props) => {

    const input = "edit-profile-input"
    const contactInput = "edit-profile-contact-input"
    const contactLabel = "edit-profile-contact-label"
    const descriptionInput = "edit-profile-job-description-input"
    return (
        <div className={"edit-profile-page-container"}>
            <div className={"edit-profile-avatar-block"}>
                <div>
                    <img className={"edit-profile-avatar"} src={"phoot"} alt="profile avatar"/>
                    <p>{"lala"}</p>
                    <p>{props.email}</p>
                </div>
            </div>
            <div className={"edit-profile-data-block "}>
                <p className={"edit-profile-title"}>Profile Settings</p>
                <div className={"data-first-block"}>
                    <div>
                        <p>Name</p>
                        <input className={input} type="text" placeholder={'userName'}/>
                    </div>
                    <div>
                        <p>About</p>
                        <input className={input} type="text" placeholder={'About info'}/>
                    </div>
                </div>
                <div className={"data-second-block"}>
                    <div className={"edit-profile-checkbox-block"}>
                        <span>Are you looking for a job?</span>
                        <input type={"checkbox"}/>
                    </div>
                    <div>
                        <input className={descriptionInput} type="text" placeholder={"enter job description"}/>
                    </div>
                    <button className={"edit-profile-page-submit-button"}>Save Profile</button>
                </div>
            </div>
            <div className={"edit-profile-contacts-block"}>
                <p className={"edit-profile-contact-title"}>Contacts settings</p>
                <div className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>Youtube</p>
                    <input type="text" className={contactInput} placeholder={"Your's channel link"}/>
                </div>
                <div  className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>Facebook</p>
                    <input type="text" className={contactInput} placeholder={"Link to Facebook page"}/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>Instagram</p>
                    <input type="text" className={contactInput}  placeholder={"Your's Instagram page url"}/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>Twitter</p>
                    <input type="text" className={contactInput}  placeholder={"Your's Twitter account url"}/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>VK</p>
                    <input type="text" className={contactInput} placeholder={"Your's vk address"}/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>Website</p>
                    <input type="text" className={contactInput} placeholder={"Link to your's Website"}/>
                </div>
                <div className={"edit-profile-contact-block"}>
                    <p className={contactLabel}>Github</p>
                    <input type="text" className={contactInput} placeholder={"Your's github repositories"}/>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        auth: state.auth.isLogged,
        currentId: state.auth.id,
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, {currentUserDataTC, setUserTC})(authHoc(EditProfileData));