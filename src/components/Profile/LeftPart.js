import React from 'react';
import {HiOutlineDotsHorizontal} from "react-icons/all";

const LeftPart = (props) => {
    let currentUser = props.userId === props.currentUserId.toString()
    return (
        <div className={"profile-page-left-part-container"}>
            <div className={"profile-page-left-part-userData"}>
                <div>
                    <span className={"profile-page-left-part-label"}>Id</span>
                    <p>{props.userId}</p>
                </div>
                <div>
                    <span className={"profile-page-left-part-label"}>About</span>
                    <p>{"No info"}</p>
                </div>
                <div>
                    <p className={"profile-page-left-part-label"}>Email</p>
                    {currentUser ? props.email : "No email"}
                </div>
            </div>
            <div className={"profile-page-left-part-button"}>
                <button><HiOutlineDotsHorizontal/></button>
            </div>
        </div>
    );
}

export default LeftPart;