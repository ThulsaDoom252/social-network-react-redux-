import React, {useEffect, useState} from 'react';
import authHoc from "../HOC/authHoc";
import {connect} from "react-redux";
import {compose} from "redux";
import SettingsBlock from "./Settings-block";
import {directEditModeAC, toggleNightModeAC, toggleWallAC} from "../../redux/settings-reducer";
import {nightModeStyles} from "../../common/nightModeStyles";

const Settings = ({nightMode, directEditMode, hideProfileWall, toggleNightModeAC: toggleNightMode, directEditModeAC: toggleDirectEditMode, toggleWallAC: toggleWall}) => {
    const [currentSettingsGroup, setCurrentSettingsGroup] = useState(1)

    return (
        <div style={nightMode ? nightModeStyles.settings : null} className={"settings-page-container"}>
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
                            <SettingsBlock label={"NightMode"} option={nightMode} setOption={toggleNightMode}
                                           disabled={false}/>
                            <SettingsBlock label={"Show Mobile Version"} disabled={true}/>
                        </div>}
                    {currentSettingsGroup === 2 && <div>
                        <SettingsBlock label={"Direct on profile page"} option = {directEditMode} setOption = {toggleDirectEditMode}/>
                        <SettingsBlock label={"Hide wall"} option = {hideProfileWall} setOption = {toggleWall}/>
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
        nightMode: state.settings.nightMode,
        directEditMode: state.settings.directEditMode,
        hideProfileWall: state.settings.hideProfileWall,

    }
}


export default compose(connect(settingsState, {toggleNightModeAC, directEditModeAC, toggleWallAC}), authHoc)(Settings)