import React from 'react';
import defaultAvatar from "../../common/default-avatar.jfif";
import {connect} from "react-redux";
import {updatePhotoTC} from "../../../redux/profile-reducer";
import Status from "./Status";

function ProfileAvatar(props) {
    const isUserPage = props.currentUser.toString() === props.userId.toString()
    const hiddenFileInput = React.useRef(null);

    let uploadPhoto = (e) => {
        props.updatePhotoTC(e.target.files[0])

    }
    const handleClick = event => isUserPage ? hiddenFileInput.current.click() : null;
    return (
        <div className="profile-page-left-part">
            <div>
                <input ref={hiddenFileInput}
                       hidden={true} type={"file"}
                       className={'profile-page-update-photo-hidden-input'}
                       onChange={uploadPhoto}/>
                <img className="profile-page-avatar"
                     onClick={handleClick}
                     src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}
                     alt="large photo"/>
                <Status userId = {props.userId} currentUser = {props.currentUser}/>
            </div>
        </div>
    );
}



export default connect(null, {updatePhotoTC})(ProfileAvatar);