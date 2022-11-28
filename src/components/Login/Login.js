import React, {useState} from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import SignUpBlock from "./SignUpBlock";
import SignInBlock from "./SignInBlock";

const LoginPage = (props) => {
    if (props.auth) return <Navigate to={'/profile'}/>
    let [showSignInBlock, toggleShowSignInBlock] = useState(true)
    let [signButtonDisabled, disableSignButton] = useState(false)
    const switchRelay = () => showSignInBlock ? toggleShowSignInBlock(false) : toggleShowSignInBlock(true)
    const disableRelay = () => {
        switchRelay()
        disableSignButton(true)
        setTimeout(() => {
            disableSignButton(false)
        }, 1000)

    }

    return (
        <div className={"login-page-container"}>
            <div className={"login-page-wallpaper"}>
                <div className={"login-page-left-part"}>
                    <div className={"login-page-left-part-slogan-block"}>
                        <p>React Samurai's</p>
                        <p>Social Network</p>
                    </div>
                    <hr className={"login-page-left-part-line"}/>
                    <div className={"login-page-left-part-content"}>
                        <p className={"login-page-left-part-content-first-line"}>We are</p>
                        <h1 className={"login-page-left-part-content-second-line"}>Community of react-developers from
                            all over the world</h1>
                        <p className={"login-page-left-part-content-third-line"}>Exceed yourself</p>
                        <p className={"login-page-left-part-content-last-line"}>Make it right. Make it fast. Make it
                            work &copy;</p>
                    </div>
                    <div className={"login-page-left-part-signUp-block"}>
                        <p>{showSignInBlock ? "Not a member?" : "Already have an account?"}</p>
                        <button
                            disabled={signButtonDisabled}
                            onClick={disableRelay}
                            className={"login-page-left-part-content-signIn-button"}>{showSignInBlock ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
            <div className={"login-page-right-part-container"}>
                {!showSignInBlock && <SignUpBlock/>}
                {showSignInBlock && <SignInBlock/>}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
        preLogged: state.auth.preLogged
    }
}

export default connect(mapStateToProps, null)(LoginPage)



