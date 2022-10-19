import React, {useEffect} from 'react';
import authHoc from "./HOC/authHoc";
import {connect} from "react-redux";
import defaultAvatar from "./common/default-avatar.jfif"
import {getUsersTC} from "../redux/users-reducer";

const Users = (props) => {
    useEffect(() => {
        props.getUsersTC(props.thisPage, props.pageSize)
    })
    const usersArray = props.users
    return (
        <div className="users-page-container">
            <h3>Users:</h3>
            <div className="users-page-block">
                {usersArray.map(user => <div className="users-page-user-info-block">
                    <img className="users-page-avatar" src={user.photos.small ? user.photos.small : defaultAvatar} alt="default-avatar"/>
                    <p className="users-page-name">{user.name}</p>
                    <p className="users-page-status">{user.status || "no status"}</p>
                    <button className="users-page-follow-button">Follow</button>
                </div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        auth: state.auth.isLogged,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        thisPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
    }
}


export default connect(mapStateToProps, {getUsersTC})(authHoc(Users))