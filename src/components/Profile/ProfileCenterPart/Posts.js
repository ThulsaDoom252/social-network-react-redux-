import React from 'react';
import defaultAvatar from "../../common/default-avatar.jfif";
import ReactionsBar from "./ReactionsBar";

function Posts(props) {
    return (
        <div>
            <div className={"profile-page-post-container"}>
                <img className="profile-page-post-avatar"
                     src={props.avatar ? props.avatar : defaultAvatar}
                     alt="large photo"/>
                <div className={"profile-page-post-block"}>
                    <p className={"profile-page-post-name"}>{props.name}</p>
                    <p className={"profile-page-post"}>{props.firstPost}</p>
                    <ReactionsBar/>
                </div>
            </div>
            <div className={"profile-page-post-container"}>
                <img className="profile-page-post-avatar"
                     src={props.avatar ? props.avatar : defaultAvatar}
                     alt="large photo"/>
                <div className={"profile-page-post-block"}>
                    <p className={"profile-page-post-name"}>{props.name}</p>
                    <p className={"profile-page-post"}>{props.secondPost}</p>
                    <ReactionsBar/>
                </div>
            </div>
        </div>

    );
}

export default Posts;