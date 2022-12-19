import React, {useEffect, useState} from 'react';

const Status = ({0: propStatus, 1: isCurrentUser, 2: updateStatus}) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(propStatus)
    const lengthError = status !== null && status.length > 300
    const changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    const white = {"background-color": "white"}
    useEffect(() => {
        setStatus(propStatus)
    }, [propStatus])
    const toggleEditMode = () => {
        if (editMode) {
            setEditMode(false)
            updateStatus(status)
        } else if (!editMode && isCurrentUser) {
            setEditMode(true)
        }
    }
    return (
        <div className="status-wrapper">
            <p hidden={!lengthError} style={{"color": "red"}}>Status length can't exceed 300 characters!</p>
            <div className="status-container">
                {editMode ?
                    <input style={white}
                           autoFocus={true}
                           onBlur={toggleEditMode}
                           onChange={changeStatus}
                           type={"text"}
                           value={status}/> :
                    <p className="status" onDoubleClick={toggleEditMode}>{propStatus || "No Status"}</p>}
            </div>
        </div>
    );
}

export default Status;