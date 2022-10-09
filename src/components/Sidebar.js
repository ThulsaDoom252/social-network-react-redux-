import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "./common/logo.png"
import {connect} from "react-redux";

function Sidebar(props) {
    return (
        <div hidden={!props.auth} className={"sidebar"}>
            <img className={"sidebar-logo"} src={logo} alt='logo'/>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/profile"}>Profile</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/users"}>Users</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/news"}>News</NavLink>
            <NavLink className={navData => navData.isActive ? "sidebar-item-active" : "sidebar-item"}
                     to={"/settings"}>Settings</NavLink>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
    }
}

export default connect (mapStateToProps)(Sidebar);