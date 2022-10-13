import React from 'react';
import initializing from "./common/Initializing.gif"

const Initialize = (props) => {
    return (
        <div className={"initializing-image"}>
            <img src={initializing} alt="app is initializing"/>
        </div>

    );
}

export default Initialize;