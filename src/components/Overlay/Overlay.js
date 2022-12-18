import React from 'react';
import {connect} from "react-redux";
import {showOverlayAC} from "../../redux/profile-reducer/profile-reducer";

function Overlay({photos, currentPhoto, showOverlayPhotoViewport, showOverlayAC}) {
    return (
        <div className={"overlay"} onClick={() => showOverlayAC(false)}>
            <div hidden={!showOverlayPhotoViewport} className={"profile-photo-viewPort"}>
                <img className={"currently-viewing-photo"} src={photos[currentPhoto]} alt="photo"/>
            </div>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        photos: state.profilePage.defaultPhotos,
        currentPhoto: state.profilePage.selectedPhoto,
        showOverlayPhotoViewport: state.profilePage.showOverlayPhotoViewport,
    }
}

export default connect(mapStateToProps, {showOverlayAC})(Overlay);