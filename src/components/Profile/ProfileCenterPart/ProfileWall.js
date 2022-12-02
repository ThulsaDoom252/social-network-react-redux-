import React from 'react';
import ProfileNavbar from "./ProfileNavbar";
import Posts from "./Posts";

function ProfileWall(props) {
    return (
        <div className={"profile-page-center-wall"}>
            <ProfileNavbar/>
            <Posts name={props.profile.fullName}
                   secondPost={`You can not add more posts, cause this func isn't released by the back-end developer`}
                   firstPost={`Hi! I am ${props.profile.fullName}. This is my first post`}
                   avatar={props.profile.photos.large}/>
        </div>
    );
}

export default ProfileWall;