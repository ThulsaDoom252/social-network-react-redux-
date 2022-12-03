import React from 'react';
import img from "./common/default-avatar.jfif"

function Friend(props) {
    return (
        <div className={"friend-block"}>
            <img className={"friend-avatar"} src={img} alt="user-avatar"/>
            <div className={"friend-data-block"}>
                <p className={"friend-name"}>Friend</p>
                <p className={"friend-status"}>This is my Status</p>
                <button className={"friend-button"}>Unfollow</button>
            </div>
        </div>
    )
}

function Friends(props) {
    return (
        <div className={"friends-page-container"}>
            <div className={"friends-page-title-block"}>
                <p className={"friends-page-title"}>You following 1 User</p>
                <hr className={"friends-page-hr"}/>
            </div>
            <div className={"friends-block"}>
                <Friend/>
            </div>
        </div>
    );
}

export default Friends;