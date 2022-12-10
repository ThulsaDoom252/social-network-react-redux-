import React from 'react';
import {NavLink} from "react-router-dom";
import {useEffect} from "react";


const RightPart = (props) => {
    const {
        0: isCurrentUser,
        1: defaultAvatar,
        2: friends,
        3: defaultPhotos,
        4: toggleOverlay,
        5: getFriends,
        6: unFollowFriend
    } = props
    useEffect(() => {
        if (isCurrentUser) {
            getFriends(100)
        }
    }, [])

    const unfollow = (friendId, index) => unFollowFriend(friendId, index)
    return (
        <div className={"profile-page-right-part-container"}>
            <div className={"profile-page-right-part-photos-block"}>
                <p className={"profile-page-right-part-photos-block-label"}><NavLink to={"/photos"}>Latest photos</NavLink></p>
                {defaultPhotos.map((photo, index) => <span>
                    <img onClick={() => toggleOverlay(true, index)} key={index}
                         className={"profile-page-right-part-photo"}
                         src={photo} alt="default-photo"/>
                </span>)}
            </div>
            <div className={"profile-page-right-part-friends-block"}>
                <p>Friends({friends.length})</p>
                <p>{friends.length === 0 && "You have no friends yet.."}</p>
                {friends.map((friend, index) => index < 5 && <div className={"profile-page-right-friend-block"}>
                    <NavLink to={`/profile/` + friend.id}>
                        <img className={"profile-page-right-friend-avatar"}
                             src={friend.photos.small ? friend.photos.small : defaultAvatar} alt="friend-photo"/>
                    </NavLink>
                    <button key={index} className={"profile-page-right-unfollow-button"}
                            onClick={() => unfollow(friend.id, index)}>Unfollow
                    </button>
                </div>)}
                <p hidden={friends.length <= 5}><NavLink to={"/friends"}>Show all friends...</NavLink></p>
            </div>
        </div>
    );
}

export default RightPart