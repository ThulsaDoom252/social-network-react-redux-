import React from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {getFriendsTC, unfollowFriendTC} from "../../redux/users-reducer";
import {useEffect} from "react";


const RightPart = (props) => {
    let isCurrentUser = props.Id.toString() === props.userId
    useEffect(() => {
        if (isCurrentUser) {
            props.getFriendsTC(100)
        }
    }, [])

    const showOverlay = (index) => props.toggleOverlay(!props.overlay && true, index)
    const unfollowFriend = (friendId, index) => props.unfollowFriendTC(friendId, index)
    return (
        <div className={"profile-page-right-part-container"}>
            <div className={"profile-page-right-part-photos-block"}>
                <p className={"profile-page-right-part-photos-block-label"}>Latest photos</p>
                {props.photos.map((photo, index) => <span>
                    <img onClick={() => showOverlay(index)} key={index} className={"profile-page-right-part-photo"}
                         src={photo} alt="default-photo"/>
                </span>)}
            </div>
            <div className={"profile-page-right-part-friends-block"}>
                <p>Friends({props.friends.length})</p>
                <p>{props.friends.length === 0 && "You have no friends yet.."}</p>
                {props.friends.map((friend, index) => index < 5 && <div className={"profile-page-right-friend-block"}>
                    <NavLink to={`/profile/`+ friend.id}>
                        <img className={"profile-page-right-friend-avatar"}
                             src={friend.photos.small ? friend.photos.small : props.defaultAvatar} alt="friend-photo"/>
                    </NavLink>
                    <button key={index} className={"profile-page-right-unfollow-button"}
                            onClick={() => unfollowFriend(friend.id, index)}>Unfollow
                    </button>
                </div>)}
                <p hidden={props.friends.length <= 5}><NavLink to={"/friends"}>Show all friends...</NavLink></p>
            </div>
        </div>
    );
}


let mapStateToProps = state => {
    return {
        friends: state.usersPage.friends,
    }
}

export default connect(mapStateToProps, {unfollowFriendTC, getFriendsTC})(RightPart)