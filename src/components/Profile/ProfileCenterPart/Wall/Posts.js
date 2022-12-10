import React from 'react';
import ReactionsBar from "./ReactionsBar";

function Posts(props) {
    const {0: name, 1: firstPost, 2: secondPost, 3: largePhoto, 4: defaultAvatar} = props
    return (
        <div>
            <div className={"profile-page-post-container"}>
                <img className="profile-page-post-avatar"
                     src={largePhoto ? largePhoto : defaultAvatar}
                     alt="large photo"/>
                <div className={"profile-page-post-block"}>
                    <p className={"profile-page-post-name"}>{name}</p>
                    <p className={"profile-page-post"}>{firstPost}</p>
                    <ReactionsBar/>
                </div>
            </div>
            <div className={"profile-page-post-container"}>
                <img className="profile-page-post-avatar"
                     src={largePhoto ? largePhoto : defaultAvatar}
                     alt="large photo"/>
                <div className={"profile-page-post-block"}>
                    <p className={"profile-page-post-name"}>{name}</p>
                    <p className={"profile-page-post"}>{secondPost}</p>
                    <ReactionsBar/>
                </div>
            </div>
        </div>

    );
}

export default Posts;