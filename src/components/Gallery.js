import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import authHoc from "./HOC/authHoc";
import {showOverlayAC} from "../redux/profile-reducer/profile-reducer";
import {nightModeStyles} from "../common/nightModeStyles";

function Gallery(props) {
    const {photos, showOverlayAC : toggleOverlay, nightMode} = props
    return (
        <div style={nightMode ? nightModeStyles.centerBlock : null} className={"gallery-container"}>
            <p className={"gallery-photo-label"}>Your photos:</p>
            <div className={"gallery-photos-block"}>
                {photos.map((photo, index) => <div className={"photo-block"}><img  onClick={() => toggleOverlay(true, index)} className={"photo"} src={photo} alt={`photo${index}`}/></div>)}
            </div>
            <div className={"gallery-footer"}></div>
        </div>

    );
}

const mapStateToProps = state => {
    return {
        photos: state.profilePage.defaultPhotos,
        auth: state.auth.isLogged,
    }
}

export default compose(connect(mapStateToProps, {showOverlayAC}), authHoc)(Gallery);