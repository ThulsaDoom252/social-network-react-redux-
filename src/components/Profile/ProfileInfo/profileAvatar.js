import React from 'react';
import defaultAvatar from "../../common/default-avatar.jfif";

function ProfileAvatar(props) {
    return (
        <div className="profile-page-left-part">
            <div className="profile-page-left-part-container">
                <img className="profile-page-avatar"
                     src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}
                     alt="large photo"/>
            </div>
        </div>
    );
}

export default ProfileAvatar;