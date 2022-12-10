import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {logOutTC} from "../../redux/auth-reducer";
import {avatarAC, setAvatarTC} from "../../redux/profile-reducer/profile-reducer";
import {NavLink} from "react-router-dom";
import {
    BiMessageSquareDetail,
    FaUserFriends, GrGallery,
    ImUsers,
    IoSettingsOutline,
    RiLogoutBoxRLine, TfiGallery,
    TfiUser
} from "react-icons/all";

const Header = (props) => {
    useEffect(() => {
        props.setAvatarTC(`${props.id}`)
    }, [])

    const logOut = () => {
        props.logOutTC()
        setTimeout(() => {
            props.avatarAC(null)
        }, 2000)
    }

    const currentUser = props.currentUser
    const navButtons = "header-navbar-button"
    return (
        <div className={'box'} hidden={!props.auth}>
            <header className={"header-container"}>
                <div className={"header-current-user-block"}>
                    {props.avatar &&
                        <img className={"header-current-user-avatar"} src={props.avatar}
                             alt={"avatar logo"}/>}
                    <NavLink to={`/profile/` + props.id}
                             className={"header-current-user-name"}>{props.login}</NavLink>
                    <button title="logout" className={"header-logout-button"} onClick={logOut}>
                        <RiLogoutBoxRLine/>
                        <span className={"header-logOut-label"}>Log out</span>
                    </button>
                </div>
                <div className={"header-navBar"}>
                    <NavLink className={navButtons} to={`/profile/${currentUser}`}><TfiUser/>Profile</NavLink>
                    <NavLink className={navButtons} to={'/messages'}><BiMessageSquareDetail/>Messages</NavLink>
                    <NavLink className={navButtons} to={'/gallery'}><TfiGallery/>Photos</NavLink>
                    <NavLink className={navButtons} to={"/friends"}><FaUserFriends/>Friends</NavLink>
                    <NavLink className={navButtons} to={"/users"}><ImUsers/>Users</NavLink>
                    <NavLink className={navButtons} to={"/settings"}><IoSettingsOutline/>Settings</NavLink>
                </div>
            </header>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
        login: state.auth.login,
        id: state.auth.id,
        avatar: state.profilePage.avatar,
        currentUser: state.auth.id,
    }
}

export default connect(mapStateToProps, {logOutTC, avatarAC, setAvatarTC})(Header)



