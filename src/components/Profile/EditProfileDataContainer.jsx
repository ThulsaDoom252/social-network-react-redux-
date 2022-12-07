import React, {useEffect} from 'react';
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import currentUserDataTC, {setCurrentUserDataTC, setUserTC} from "../../redux/profile-reducer/profile-reducer";
import EditProfileData from "./ProfileCenterPart/EditProfileData";
import {compose} from "redux";


function EditProfileDataContainer(props) {
    const userId = props.currentId
    const profileId = props.Id
    const isCurrentUser = props.Id === props.currentId.toString()
    window.is = isCurrentUser
    window.id = props.Id
    useEffect(() => {
        props.setUserTC(userId)
    }, [])

    return (
        <EditProfileData {...props}/>
    )
}

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        auth: state.auth.isLogged,
        Id: state.profilePage.Id,
        currentId: state.auth.id,
        profile: state.profilePage.profile,
        name: state.profilePage.name,
    }
}

export default compose(connect(mapStateToProps, {
    currentUserDataTC,
    setUserTC,
    setCurrentUserDataTC
}), authHoc)(EditProfileDataContainer);