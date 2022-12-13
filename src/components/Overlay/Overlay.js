import React from 'react';
import {connect} from "react-redux";
import {showOverlayAC} from "../../redux/profile-reducer/profile-reducer";

function Overlay(props) {
    return (
        <div className={"overlay"} onClick={() => props.showOverlayAC(false)}>
            <div hidden={true} className={"profile-photo-viewPort"}>
                <img className={"currently-viewing-photo"} src={props.photos[props.currentPhoto]} alt="photo"/>
            </div>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        photos: state.profilePage.defaultPhotos,
        currentPhoto: state.profilePage.selectedPhoto
    }
}

export default connect (mapStateToProps, {showOverlayAC}) (Overlay);