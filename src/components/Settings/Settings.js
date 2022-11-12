import React from 'react';
import authHoc from "../HOC/authHoc";
import {connect} from "react-redux";
import {compose} from "redux";
import {hideFooterAC, nightModeAC, underConstructionAC} from "../../redux/app-reducer";
import Switch from "./Switch";

const Settings = (props) => {
    window.footerstate = props.footerHidden
    const hideFooter = () => props.footerHidden ? props.hideFooterAC(false) : props.hideFooterAC(true)
    const showUnderConstructionModules = () => props.underConstruction ? props.underConstructionAC(false) : props.underConstructionAC(true)
    const action2 = () => alert("Action2!")
    return <div className="settings-page-container">
        <div className="settings-page-block">
            <h1 className="settings-page-title">Settings</h1>
            <div className="settings-page-options-block">
                <div className="settings-keys-block">
                    <p className="settings-keys">Hide footer</p>
                    <p className="settings-keys">NightMode</p>
                    <p className="settings-keys">Mobile version</p>
                    <p className="settings-keys">Show unfinished modules</p>
                </div>
                <div className="settings-switches-block">
                    <Switch action={hideFooter}/>
                    <Switch/>
                    <Switch/>
                    <Switch action={showUnderConstructionModules}/>
                </div>
            </div>
        </div>
    </div>

}

let settingsState = (state) => {
    return {
        auth: state.auth.isLogged,
        underConstruction: state.app.underConstruction,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors,
        footerHidden: state.app.footerHidden,

    }
}


export default compose(connect(settingsState, {nightModeAC, underConstructionAC, hideFooterAC}), authHoc)(Settings)