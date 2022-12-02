import React from 'react';

const  RightPart = (props) => {
    window.overlay = props.overlay
    const showOverlay = (toggle) => props.toggleOverlay(!props.overlay && true)
    return (
        <div className={"profile-page-right-part-container"}>
            <div className={"profile-page-right-part-photos-block"}>
                <p className={"profile-page-right-part-photos-block-label"}>Latest photos</p>
                {props.photos.map(photo => <span>
                    <img onClick={showOverlay} key={photo} className={"profile-page-right-part-photo"} src={photo} alt="default-photo"/>
                </span>)}
                <div className={"profile-photo-viewPort"}>
                </div>
            </div>
            <div className={"profile-page-right-part-suggestions-block"}>
                <p>suggestion for you</p>
            </div>
        </div>
    );
}

export default RightPart