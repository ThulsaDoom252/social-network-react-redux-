import React from 'react';
import authHoc from "./HOC/authHoc";
import {connect} from "react-redux";
import {compose} from "redux";
import {nightModeAC, underConstructionAC} from "../redux/app-reducer";

const Settings = (props) => {
    return <div>
        Settings
    </div>
}

let settingsState = (state) => {
    return {
        auth: state.auth.isLogged,
        underConstruction: state.app.underConstruction,
        nightMode: state.app.nightMode,
        nightModeColors: state.app.nightModeColors

    }
}


export default compose(connect(settingsState, {nightModeAC, underConstructionAC}), authHoc)(Settings)