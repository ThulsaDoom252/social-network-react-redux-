import React from 'react';

function ProfilePageInput(props) {
    return (
        <input className="profile-page-input"
               autoFocus={true}
               onBlur={() => {
                   props.editMode(props.state, props.changeState)
               }}
               type="text" value={props.value}
               onChange={(e) => {
                   props.changeValue(e.currentTarget.value)
               }}/>
    );
}

export default ProfilePageInput;