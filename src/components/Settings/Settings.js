import React, {useState} from 'react';
import authHoc from "../HOC/authHoc";
import {connect} from "react-redux";
import {compose} from "redux";
import {hideFooterAC, nightModeAC, underConstructionAC} from "../../redux/app-reducer";
import SettingsBlock from "./Settings-block";

const Settings = (props) => {
    let [currentSettingsGroup, setCurrentSettingsGroup] = useState(1)
    return (
        <div className={"settings-page-container"}>
            <div className="settings-left-part">
                <div className={"settings-left-part-block"}>
                    <p style={{"text-decoration": currentSettingsGroup === 1 && "underline"}} className="settings-class"
                       onClick={() => setCurrentSettingsGroup(1)}>Profile</p>
                    <p style={{"text-decoration": currentSettingsGroup === 2 && "underline"}} className="settings-class"
                       onClick={() => setCurrentSettingsGroup(2)}>Style</p>
                    <p style={{"text-decoration": currentSettingsGroup === 3 && "underline"}} className="settings-class"
                       onClick={() => setCurrentSettingsGroup(3)}>For developers</p>
                </div>
            </div>
            <div className="settings-right-part">
                <p className={"settings-right-part-title"}>Settings</p>
                <div className={"settings-right-part-block"}>
                    {currentSettingsGroup === 1 &&
                        <div>
                            <SettingsBlock label={"NightMode"}/>
                            <SettingsBlock label={"Show Mobile Version"}/>
                        </div>}
                    {currentSettingsGroup === 2 && <div>
                        <SettingsBlock label={"With Edit Profile Button"}/>
                        <SettingsBlock label={"On profile page"}/>
                        <SettingsBlock label={"Both methods"}/>
                        <SettingsBlock label={"Hide wall"}/>
                    </div>}
                    {currentSettingsGroup === 3 && <SettingsBlock label={"Hide non-functional modules"}/>}
                </div>
            </div>
        </div>
    )


}

let settingsState = (state) => {
    return {
        auth: state.auth.isLogged,

    }
}


export default compose(connect(settingsState, {nightModeAC, underConstructionAC, hideFooterAC}), authHoc)(Settings)