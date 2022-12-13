import React, {useEffect} from "react";
import anonymous from "../common/default-avatar.jfif"
import {NavLink} from "react-router-dom";
import Paginator from "./Paginator";
import {connect} from "react-redux";
import {followTC, getUsersTC, unFollowTC} from "../../redux/users-reducer";
import authHoc from "../HOC/authHoc";
import {compose} from "redux";
import Fetching from "../common/Fetching"
import {nightModeStyles} from "../../common/nightModeStyles";

let Users = ({currentPage, totalCount, pageSize, nightMode, ...props}) => {
    useEffect(() => {
        props.getUsersTC(props.currentPage, props.pageSize)
    }, [])
    return (
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"users-page-container"}>
            {props.id === "1408" && <Fetching isFetching={props.isFetching}/>}
            <div className={"users-page-title"}>USERS:</div>
            <Paginator portionSize={10}
                       currentPage={currentPage}
                       onPageChanged={(currentPage) => props.getUsersTC(currentPage, props.pageSize)}
                       totalCount={totalCount}
                       pageSize={pageSize}/>
            <div className="users-page-users-grid">
                {props.users.map(user =>
                    <div  className="users-page-user-block" key={user.id}>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={"users-page-avatar-small"}
                                 src={user.photos.small != null ? user.photos.small : anonymous}/>
                        </NavLink>
                        <div className={"users-data-block"}>
                            <p className={"users-page-user-name"}>{user.name}</p>
                            <p className={"users-page-user-status"}>{user.status ? user.status :  'No status'}</p>
                            {user.isFollow ?
                                <button className={"users-page-follow-button"}
                                        disabled={props.followingProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            props.unFollowTC(user.id)
                                        }}>Unfollow</button>
                                :
                                <button className={"users-page-follow-button"}
                                        disabled={props.followingProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            props.followTC(user.id)
                                        }}>Follow</button>}
                        </div>
                    </div>
                )}
            </div>
        </div>)
}

let usersState = (state) => {
    return {
        auth: state.auth.isLogged,
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors
    }
}

export default compose(connect(usersState, {getUsersTC, followTC, unFollowTC}), authHoc)(Users)




















