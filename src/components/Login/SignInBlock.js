import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {specialChars} from "@testing-library/user-event";
import {connect} from "react-redux";
import {getCaptchaTC, loginFetchAC, mainLoginTC} from "../../redux/auth-reducer";
import {BsInfoLg, FaKey, FaLock, FaUser} from "react-icons/all";
import Logo from "../common/logo.png"
import {Link} from "react-router-dom";

const SignInBlock = (props) => {
    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            login: 'xenolm252@gmail.com',
            password: 'devastator252',
            rememberMe: false,
            fetch: false,
            antiBotSymbols: '',
            key: 'ecd08681-6048-43b3-9ce2-877a7dbc2176',
            loginFetch: props.loginFetch
        },
        validationSchema: Yup.object({
            login: Yup.string().max(50, 'login must be shorter than 10 characters').required(),
            password: Yup.string().min(6, 'password must contain at least 6 characters').required(),
            key: Yup.string().min(36, "key must be at least 36 characters, including letters, numbers & special characters").matches(["a-z"] & [0 - 9] & specialChars, "It's not looking like an api-key!").required(),

        }),
        onSubmit: ({login, password, rememberMe, antiBotSymbols, key}) => {
            // props.changeState(login, password, rememberMe, antiBotSymbols)
            props.mainLoginTC(login, password, rememberMe, antiBotSymbols, key)
            console.log(key)
            // props.send()
            props.loginFetchAC(true)
        }
    })
    window.rem = values.rememberMe
    return (
        <form onSubmit={handleSubmit}>
            <div className={"login-page-right-part-signIn-block"}>
                <div>
                    <p className={"login-page-welcome-label"}>Welcome to React students community</p>
                    <p className={"login-page-signIn-label"}>Sign in</p>
                    <div className={"login-page-input-container"}>
                        {errors.login && touched.login ? <p className={"login-page-input-error"}>{errors.login}</p> : null}
                        <label className={"login-page-input-icons"}><FaUser/></label>
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
                        {touched.password && errors.password ? <p className={"login-page-input-error"}>{errors.password}</p> : null}
                        <p className={"login-page-input-error"}>{errors.password && touched.password}</p>
                        <label className={"login-page-input-icons"}><FaLock/></label>
                        <input className={"login-page-inputs"}
                               id={"password"}
                               placeholder={"password"}
                               type="password"
                               value={values.password}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </div>
                    {/*<div className={"login-page-input-container"}>*/}
                    {/*    <label*/}
                    {/*        title={"BETA: sign-in social-network.samuraijs.com - it will be in your's account section"}*/}
                    {/*        className={"login-page-input-icons"}><FaKey/></label>*/}
                    {/*    <input className={"login-page-inputs"} type="text" placeholder={"Api-key"}/>*/}
                    {/*</div>*/}
                    {props.captcha &&
                        <div className={"login-page-captcha-block"}>
                            <img
                                className={"login-page-captcha-image"}
                                src={props.captcha}/>
                            <div>
                                <input className={"login-page-captcha-input"} placeholder={'enter symbols'}
                                       value={values.antiBotSymbols} onChange={handleChange}
                                       id={'antiBotSymbols'}/>
                                value={values.antiBotSymbols} onChange={handleChange} id={'antiBotSymbols'}/>
                            </div>
                        </div>}
                    <div className={"login-page-rememberMe-container"}>
                                <input
                                    id={"rememberMe"}
                                    value = {values.rememberMe}
                                    checked={values.rememberMe}
                                    type={"checkbox"}
                                    className={"login-page-rememberMe-checkBox"}
                                    onChange={handleChange}/>
                        <label>Remember me</label>
                            </div>
                    <button className={"login-page-login-button"} disabled={values.loginFetch === true}
                     type={"submit"}>Log in</button>
                    {/*    <img className={"login-page-logo"} src={Logo}></img>*/}
                    {/*    <h4 className={"login-page-title"}>*/}
                    {/*        React devs community*/}
                    {/*    </h4>*/}
                    {/*    <h4 className={"login-page-animation"}>Never Surrender</h4>*/}
                    {/*    <div className="login-page-inputs-block">*/}
                    {/*        <div>*/}
                    {/*            <label><FaUser/></label>*/}
                    {/*            <input className={"login-page-login-input login-page-input-fields"} id={'login'}*/}
                    {/*                   placeholder={'login'}*/}
                    {/*                   value={values.login}*/}
                    {/*                   onChange={handleChange('login')} onBlur={handleBlur}/>*/}
                    {/*        </div>*/}
                    {/*        {touched.login && errors.login ? (*/}
                    {/*            <div className={"login-page-errors"}>{errors.login}</div>) : null}*/}
                    {/*        <div>*/}
                    {/*            <label><FaLock/> </label>*/}
                    {/*            <input className={"login-page-password-input login-page-input-fields"}*/}
                    {/*                   id={'password'}*/}
                    {/*                   placeholder={'password'}*/}
                    {/*                   type={"password"}*/}
                    {/*                   value={values.password}*/}
                    {/*                   onChange={handleChange('password')} onBlur={handleBlur}/>*/}
                    {/*        </div>*/}
                    {/*        {touched.password && errors.password ? (*/}
                    {/*            <div className={"login-page-errors"}>{errors.password}</div>) : null}*/}
                    {/*        <div>*/}
                    {/*            <label><FaKey/> </label>*/}
                    {/*            <label*/}
                    {/*                title={"BETA: sign-in social-network.samuraijs.com - it will be in your's account section "}><BsInfoLg/></label>*/}
                    {/*            <input className={"login-page-key-input login-page-input-fields"} id={'key'}*/}
                    {/*                   placeholder={"key"}*/}
                    {/*                   type={"key"}*/}
                    {/*                   value={values.key}*/}
                    {/*                   onChange={handleChange('key')} onBlur={handleBlur}/>*/}
                    {/*        </div>*/}
                    {/*        {touched.key && errors.key ? (*/}
                    {/*            <div className="login-page-key-error-container">*/}
                    {/*                <div className="login-page-errors"*/}
                    {/*                >{errors.key}</div>*/}
                    {/*            </div>) : null}*/}
                    {/*    </div>*/}
                    {/*    <div className={"login-page-remember-checkBox"}>*/}
                    {/*        <input id={'rememberMe'} onChange={handleChange} value={values.rememberMe}*/}
                    {/*               type={"checkbox"}/>*/}
                    {/*        <label>Remember me</label>*/}
                    {/*    </div>*/}
                    {/*    {props.captcha &&*/}
                    {/*        <div className={"login-page-captcha-block"}><img*/}
                    {/*            className={"login-page-captcha-image"}*/}
                    {/*            src={props.captcha}/>*/}
                    {/*            <div>*/}
                    {/*                <input className={"login-page-captcha-input"} placeholder={'enter symbols'}*/}
                    {/*                       value={values.antiBotSymbols} onChange={handleChange}*/}
                    {/*                       id={'antiBotSymbols'}/>*/}
                    {/*                value={values.antiBotSymbols} onChange={handleChange} id={'antiBotSymbols'}/>*/}
                    {/*            </div>*/}
                    {/*        </div>}*/}
                    {/*    <div>*/}
                    {/*        <button className={"login-page-login-button"} disabled={values.loginFetch === true}*/}
                    {/*                type={"submit"}>Login*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*    {props.error &&*/}
                    {/*        <div className={"login-page-auth-error login-page-errors"}>Wrong Email or*/}
                    {/*            password</div>}*/}
                    {/*    <div>Not a member? <div><Link className={"login-page-signUp-button"}*/}
                    {/*                                  to="//social-network.samuraijs.com/signUp"*/}
                    {/*                                  target="_blank">Sign up</Link></div>*/}
                    {/*    </div>*/}
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
        loginFetch: state.auth.fetching
    }
}

export default connect(mapStateToProps,
    {
        mainLoginTC, getCaptchaTC, loginFetchAC
    }
)(SignInBlock);