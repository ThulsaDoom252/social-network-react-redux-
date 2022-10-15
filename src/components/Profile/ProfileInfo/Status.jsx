import React, {useState, useEffect} from 'react';

const Status = (props, prevProps) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    let activateEditMode = () => {
        if (props.userId === `${props.currentId}`) {
            setEditMode(true)
        } else {
            alert('you can only change yours status!')
        }
    }

    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    return <div  style={{"color": props.nightMode && props.nightModeColors["nightMode-text-color"]}} className={"profile-page-status-container"}>
        <div>
            {!editMode &&
                <div>
                    <div hidden={props.status === null}>Status:</div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
                </div>}
            {editMode &&
                <div>
                    <div hidden={props.status === null}>Status:</div>
                    <input className={"profile-page-status-editMode"} autoFocus={true} onBlur={deactivateEditMode}
                           onChange={changeStatus} value={status}/>
                </div>
            }
        </div>
    </div>
}

export default Status