import React from 'react';
import {connect} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {currentUserDataTC, fetchingAC, updateProfileTC} from "../../redux/profileReducer";
import authHoc from "../HOC/authHoc";

const EditProfile = (props) => {
    const editProfileInputsNightModeStyle = props.nightMode ? "edit-profile-inputs-nightMode" : "edit-profile-inputs"
    const urlError = Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').nullable()
    const currentUser = props.currentId
    const {handleSubmit, handleChange, values, touched, errors} = useFormik({
        initialValues: {
            name: props.name,
            about: props.about,
            isApplicant: props.applicant,
            description: props.description,
            website: props.website,
            vk: props.vk,
            facebook: props.facebook,
            twitter: props.twitter,
            instagram: props.instagram,
            gitHub: props.gitHub,
            mainLink: props.link,
            youtube: props.youtube,

        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Your name must be longer than 3 characters').required(),
            about: Yup.string().min(3, 'Info must contain more than 3 characters!').required(),
            description: Yup.string().min(3, 'Job description must contain more than 3 characters!').required(),
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
            props.updateProfileTC(currentUser, about, isApplicant, description, name, gitHub, vk, facebook, instagram,
                twitter, website, youtube, mainLink
            )
            props.fetchingAC(true)
        }
    })
    return (<form onSubmit={handleSubmit}>
            <div style={{
                "background-color": props.nightMode && props.nightModeColors["nightMode-container-block"],
                "box-shadow": props.nightMode && props.nightModeColors["profile-block-border-shadow"]
            }} className={"edit-profile-container"}>
                <label style={{"color": props.nightMode && props.nightModeColors["nightMode-text-color"]}}
                       className={"edit-profile-header-1"}>Tell about yourself:</label>
                <div style={{"color": props.nightMode && props.nightModeColors["nightMode-text-color"]}}
                     className={"edit-profile-info-container"}>
                    <div>
                        <div>Yor name:</div>
                        <div>
                            <input id={'name'} onChange={handleChange}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.name}
                                   placeholder={'UserName'}/>
                        </div>
                        <div>
                            <div>About you:</div>
                            <div>
                                <input id={'about'} onChange={handleChange}
                                       className={editProfileInputsNightModeStyle}
                                       value={values.about}
                                       placeholder={'About me'}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>Looking for a job</span>
                        <input
                            defaultChecked={props.applicant === true} onChange={handleChange} name={'isApplicant'}
                            value={values.isApplicant}
                            type={"checkbox"}/>
                        {values.isApplicant &&
                            <div>
                                <div>Your expectations & skills</div>
                                <input onChange={handleChange} id={'description'}
                                       className={editProfileInputsNightModeStyle}
                                       value={values.description} placeholder={'Job description'}/>
                            </div>}
                    </div>
                </div>
                <div>
                    <label style={{"color": props.nightMode && props.nightModeColors["nightMode-text-color"]}}
                           className={"edit-profile-header-2"}>Your contacts:</label>
                </div>
                <div style={{"color": props.nightMode && props.nightModeColors["nightMode-text-color"]}}
                     className={"edit-profile-contacts-block"}>
                    <div className={"profile-contacts-left"}>
                        <div>Website:</div>
                        <div>
                            <input onChange={handleChange} name={'website'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.website} placeholder={'Website'}/>
                        </div>
                        <div>
                            <div>Youtube:</div>
                            <input onChange={handleChange} name={'youtube'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.youtube} placeholder={'Youtube'}/>
                        </div>
                        <div>
                            <div>Twitter:</div>
                            <input onChange={handleChange} id={'twitter'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.twitter} placeholder={'twitter'}/>
                        </div>
                        <div>
                            <div>Vk:</div>
                            <input onChange={handleChange} id={'vk'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.vk} placeholder={'vk'}/>
                        </div>
                    </div>
                    <div className={"edit-profile-contacts-right"}>
                        <div>
                            <div>Facebook:</div>
                            <input onChange={handleChange} name={'facebook'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.facebook} placeholder={'facebook'}/>
                        </div>
                        <div>
                            <div>Instagram:</div>
                            <input onChange={handleChange} name={'instagram'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.instagram} placeholder={'Instagram'}/>
                        </div>
                        <div>
                            <div>Github:</div>
                            <input onChange={handleChange} name={'gitHub'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.gitHub} placeholder={'GitHub'}/>
                        </div>
                        <div>
                            <div>Main Link:</div>
                            <input onChange={handleChange} name={'mainLink'}
                                   className={editProfileInputsNightModeStyle}
                                   value={values.mainLink} placeholder={'Main Link'}/>
                        </div>
                    </div>
                </div>
                <div>
                    {touched.name && errors.name ? (
                        <div className="edit-profile-error">{errors.name}</div>) : null}
                    {touched.about && errors.about ? (
                        <div className="edit-profile-error">{errors.about}</div>) : null}
                    {touched.description && errors.description ? (
                        <div
                            className="edit-profile-error">{errors.description}</div>) : null}
                </div>
                {errors.website
                || errors.youtube
                || errors.twitter
                || errors.vk
                || errors.facebook
                || errors.instagram
                || errors.gitHub
                || errors.mainLink ?
                    (<div className="edit-profile-error">{
                        errors.website
                        || errors.youtube
                        || errors.twitter
                        || errors.vk
                        || errors.facebook
                        || errors.instagram
                        || errors.gitHub
                        || errors.mainLink}
                    </div>) : null}
                <div className={"edit-profile-button-block"}>
                    <button className={props.nightMode ? "edit-profile-button-nightMode" : "edit-profile-button"} type={"submit"} onSubmit={handleSubmit}
                            disabled={props.fetching}>Submit
                    </button>
                    {props.fetching && <div>Wait..updating</div>}
                    <div
                        hidden={props.result === null || props.result === 'error'}>Success!
                    </div>
                    <div className="edit-profile-error"
                         hidden={props.result === null || props.result === 'success'}>Error!

                    </div>
                </div>
            </div>
        </form>
    );
}

let stateProps = (state) => {
    return {
        fetching: state.profilePage.isFetching,
        auth: state.auth.isLogged,
        profile: state.profilePage.profile,
        currentId: state.auth.id,
        name: state.profilePage.name,
        about: state.profilePage.about,
        applicant: state.profilePage.applicant,
        description: state.profilePage.description,
        gitHub: state.profilePage.github,
        vk: state.profilePage.vk,
        facebook: state.profilePage.facebook,
        instagram: state.profilePage.instagram,
        twitter: state.profilePage.twitter,
        site: state.profilePage.site,
        youtube: state.profilePage.youtube,
        link: state.profilePage.link,
        website: state.profilePage.website,
        isReceived: state.profilePage.dataReceived,
        result: state.profilePage.result,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors
    }
}

export default connect(stateProps, {updateProfileTC, currentUserDataTC, fetchingAC})(authHoc(EditProfile));