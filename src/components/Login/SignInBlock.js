import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {getCaptchaTC, loginFetchAC, mainLoginTC} from "../../redux/auth-reducer";
import login from "./Login";

const SignInBlock = (props) => {
    let [fetch, isFetch] = useState(false)
    useEffect(() => !props.loginFetch ? isFetch(false) : isFetch(true), [props.loginFetch]
    )
    const formik = useFormik({
        initialValues: {
            login: 'xenolm252@gmail.com',
            password: 'devastator252',
            rememberMe: false,
            antiBotSymbols: '',
        },
        validationSchema: Yup.object({
            login: Yup.string().max(50, 'login must be shorter than 10 characters').required(),
            password: Yup.string().min(6, 'password must contain at least 6 characters').required(),
        }),
        onSubmit: ({login, password, rememberMe, antiBotSymbols}) => {
            props.mainLoginTC(login, password, rememberMe, antiBotSymbols)
        }
    })

    let values = formik.values
    let errors =  formik.errors
    let handleChange = formik.handleChange
    let handleSubmit = formik.handleSubmit
    let touched = formik.touched
    let handleBlur = formik.handleBlur
    window.ce = props.captchaError
    window.ca = props.captcha

    return (
        <form onSubmit={handleSubmit}>
            <div className={"login-page-right-part-signIn-block"}>
                <div>
                    <p className={"login-page-welcome-label"}>Welcome to React students community</p>
                    <p className={"login-page-signIn-label"}>Sign in</p>
                    <div className={"login-page-input-container"}>
                        {errors.login && touched.login ?
                            <p className={"login-page-input-error"}>{errors.login}</p> : null}
                        <input className={"login-page-inputs"}
                               id={"login"}
                               type="text"
                               placeholder={"userName"}
                               value={values.login}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    <div className={"login-page-input-container"}>
                        {touched.password && errors.password ?
                            <p className={"login-page-input-error"}>{errors.password}</p> : null}
                        <p className={"login-page-input-error"}>{errors.password && touched.password}</p>
                        <input className={"login-page-inputs"}
                               id={"password"}
                               placeholder={"password"}
                               type="password"
                               value={values.password}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    {props.captcha &&
                        <div className={"login-page-captcha-block"}>
                            <img
                                className={"login-page-captcha-image"}
                                src={props.captcha}/>
                            <div>
                                <input className={"login-page-captcha-input"} placeholder={'enter symbols'}
                                       value={values.antiBotSymbols} onChange={handleChange}
                                       id={'antiBotSymbols'}/>
                            </div>
                        </div>}
                    <div className={"login-page-rememberMe-container"}>
                        <input
                            id={"rememberMe"}
                            value={values.rememberMe}
                            checked={values.rememberMe}
                            type={"checkbox"}
                            className={"login-page-rememberMe-checkBox"}
                            onChange={handleChange}/>
                        <label>Remember me</label>
                    </div>
                    <div className={"login-page-login-button-container"}>
                        <button className={"login-page-login-button"} type={"submit"} disabled={fetch}>{fetch ?
                            "Please wait....": "Log in"}
                        </button>
                        {props.error &&
                            <p className={"login-page-auth-error"}>{props.errorMessage}</p>}
                    </div>
                </div>
            </div>
        </form>
    );
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.auth.id,
        auth: state.auth.isLogged,
        error: state.auth.error,
        apiKey: state.auth.apiKey,
        captcha: state.auth.captcha,
        loginFetch: state.auth.fetching,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps,
    {
        mainLoginTC, getCaptchaTC, loginFetchAC
    }
)(SignInBlock);