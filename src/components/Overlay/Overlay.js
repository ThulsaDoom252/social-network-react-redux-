import React from 'react';
import {showOverlayAC} from "../../redux/app-reducer";
import {connect} from "react-redux";

function Overlay(props) {
    return (
        <div className={"overlay"} onClick={() => props.showOverlayAC(false)}></div>
    );
}

export default connect (null, {showOverlayAC}) (Overlay);