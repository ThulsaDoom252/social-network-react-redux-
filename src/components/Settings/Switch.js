import React from 'react';

function Switch(props) {
    return (
        <div className={"settings-switch"}>
            <label className="switch switch-small">
                <div className="switch-body">
                    <input className="switch-input" type="checkbox"/>
                    <span className="switch-left">Yes</span>
                    <span className="switch-right">No</span>
                </div>
            </label>
        </div>

    );
}

export default Switch;