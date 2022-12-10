import React, {useEffect} from "react";
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import Initialize from "./components/Initialize";
import {initializeTC} from "./redux/app-reducer";
import NotFound from "./components/common/NotFound";
import Users from "./components/Users/Users";
import Messages from "./components/Messages/Messages";
import Overlay from "./components/Overlay/Overlay";
import Friends from "./components/Friends";
import EditProfileData from "./components/Profile/ProfileCenterPart/EditProfile/EditProfileData";
import Photos from "./components/Gallery";

function App(props) {
    useEffect(() => {
        props.initializeTC()
        console.log('once')
    }, [])


    if (!props.initialized) {
        return (
            <div className={"container"}>
                <Initialize/>
            </div>
        )
    } else {
        return (
            <BrowserRouter>
                <div style={{"height": props.auth && "auto"}} className={"container"}>
                    {props.overlayVisible && <Overlay/>}
                    <Header/>
                    <section className={props.auth ? "section-content" : null}>
                        <Routes>
                            <Route path={"/profile/:userId"} element={<Profile overlay={props.overlayVisible}
                                                                               showOverlay={props.showOverlayAC}/>}/>
                            <Route path="/messages" element={<Messages/>}/>
                            <Route path="/gallery" element={<Photos/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/edit" element={<EditProfileData/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="" element={<Login/>}/>
                            <Route path={"/friends"} element={<Friends/>}/>
                            <Route path="*" element={<NotFound/>}/>
                            <Route path="/profile/*" element={<NotFound/>}/>
                        </Routes>
                    </section>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
        auth: state.auth.isLogged,
        overlayVisible: state.profilePage.showOverlay,
    }
}

export default connect(mapStateToProps, {initializeTC})(App);
