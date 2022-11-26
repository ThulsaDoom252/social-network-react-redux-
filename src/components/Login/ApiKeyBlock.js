import React, {useState} from 'react';
import {FaKey} from "react-icons/all";
import {connect} from "react-redux";
import {changeApiKey} from "../../redux/auth-reducer";

function ApiKeyBlock(props) {
    let [apiKey, changeApiKey] = useState("")
    return (
        <div>
            {props.preLogged ?
                <div>
                    <div className={"login-page-apiKey-container"}>
                        <p className={"login-page-apiKey-label"}>Enter your unique api key:</p>
                        <div className={"login-page-input-container"}>
                            <label
                                title={"Required to make your profile editable, you can find it at samurai.js site, in api-key section"}
                                className={"login-page-input-icons"}><FaKey/></label>
                            <input className={"login-page-inputs"}
                                   type="text"
                                   placeholder={"Api-key"}
                                   value={apiKey}
                                   onChange={(e) => changeApiKey(e.currentTarget.value)}
                            />
                        </div>
                        <button className={"login-page-submit-button"} onClick={() => props.changeApiKey(dispatch, apiKey)}>Submit</button>
                    </div>

                </div> : <div>You are not authorized yet...</div>
            }
        </div>
    );
}


let mapStateToProps = (state) => {
    return {
        preLogged: state.auth.preLogged
    }
}

export default connect(mapStateToProps, {changeApiKey})(ApiKeyBlock);