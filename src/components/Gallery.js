import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import authHoc from "./HOC/authHoc";
import {showOverlayAC} from "../redux/profile-reducer/profile-reducer";

function Gallery(props) {
    const {photos, showOverlayAC : toggleOverlay} = props
    return (
        <div className={"gallery-container"}>
            {photos.map((photo, index) => <div className={"photo-block"}><img  onClick={() => toggleOverlay(true, index)} className={"photo"} src={photo} alt={`photo${index}`}/></div>)}
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