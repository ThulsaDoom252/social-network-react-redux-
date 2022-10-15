import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {logOutTC} from "../redux/auth-reducer";
import {avatarAC, setAvatarTC} from "../redux/profile-reducer";
import BurgerNavbar from "./BurgerNavbar";
import {NavLink} from "react-router-dom";
import {RiLogoutBoxRLine} from "react-icons/all";

const Header = (props) => {
    useEffect(() => {
        props.setAvatarTC(`${props.id}`)
        console.log(localStorage.getItem("apiKey"));
    }, [])

    const logOut = () => {
        props.logOutTC()
        setTimeout(() => {
            props.avatarAC(null)
        }, 2000)
    }
    return (
        <header style={{"padding": props.auth && "4%"}} className={"header-container"}>
            {props.auth && <BurgerNavbar/>}
            <div className="header-slogan-block">
                <p className={"header-slogan-title"}>R.S.S.N</p>
                <p className="header-slogan">Watch.Learn.Win</p>
            </div>
            {props.auth && <div className={"header-current-user-block"}>
                {props.avatar &&
                    <img className={"header-current-user-avatar"} src={props.avatar}
                         alt={"avatar logo"}/>}
                <div className={"header-current-user-name-block"}>
                    <p className="header-current-user-label">Welcome</p>
                    <NavLink to={`/profile`} className={"header-current-user-name"}>{props.login}</NavLink>
                </div>
            </div>}
            {props.auth && <button title="logout" className={"header-logout-button"} onClick={logOut}><RiLogoutBoxRLine/></button>}
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth.isLogged,
        login: state.auth.login,
        id: state.auth.id,
        avatar: state.profilePage.avatar,
        currentUser: state.auth.id,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors,
    }
}

export default connect(mapStateToProps, {logOutTC, avatarAC, setAvatarTC})(Header)



