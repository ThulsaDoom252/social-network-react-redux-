import React from 'react';
import {updatePhotoTC} from "../../redux/profile-reducer";
import {connect} from "react-redux"

let UpdatePhoto = (props) => {
    const hiddenFileInput = React.useRef(null);

    let uploadPhoto = (e) => {
        props.updatePhotoTC(e.target.files[0])

    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div>
            <input ref={hiddenFileInput}
                   hidden={true} type={"file"}
                   className={'profile-page-update-photo-hidden-input'}
                   onChange={uploadPhoto}/>
            <div>
                <button className={props.nightMode ? "profile-page-update-photo-button-nightMode":"profile-page-update-photo-button"} onClick={handleClick}>Upload</button>
            </div>
        </div>
    );
}

export default connect(null, {updatePhotoTC})(UpdatePhoto);