import React from 'react';
import Switch from "./Switch";

function SettingsBlock(props) {
    let {label} = props
    return (
        <div className={"settings-block"}>
            <div className="sbl">
                <span className={"settings-block-label"}>{label}</span>
            </div>
            <div className="sbs">
                <button className={"settings-block-switch"}><Switch/></button>
            </div>
        </div>
    );
}

export default SettingsBlock;