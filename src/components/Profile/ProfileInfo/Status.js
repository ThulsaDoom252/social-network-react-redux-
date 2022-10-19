import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {updateStatusTC} from "../../../redux/profile-reducer";

const Status = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    const white = {"background-color": "white"}
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const toggleEditMode = () => {
        if (editMode) {
            setEditMode(false)
            props.updateStatusTC(status)
        } else {
            setEditMode(true)
        }
    }
    return (
        <div>
            <p className="status-label">Status:</p>
            <div className="status-container">
                {editMode ?
                    <input style={white}
                           autoFocus={true}
                           onBlur={toggleEditMode}
                           onChange={changeStatus}
                           type={"text"}
                           value={status}/> :
                    <p className="status" onDoubleClick={toggleEditMode}>{props.status || "No Status"}</p>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        status: state.profilePage.status
    }
}

export default connect(mapStateToProps, {updateStatusTC})(Status);