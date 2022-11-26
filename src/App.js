import React, {useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";
import {BrowserRouter, Routes, Router, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import Initialize from "./components/Initialize";
import {initializeTC} from "./redux/app-reducer";
import Greetings from "./components/Greetings";
import NotFound from "./components/common/NotFound";
import Users from "./components/Users/Users";
import Messages from "./components/Messages/Messages";

function App(props) {
    useEffect(() => {
        props.initializeTC()
        console.log("once")
    }, [])
    if (!props.initialized) {
        return (
            <Initialize/>
        )
    } else {
        return (
            <BrowserRouter>
                <div className={props.auth ? "container" : "container-logout"}>
                    <Header/>
                    <Sidebar/>
                    <section className={props.auth ? "section-content" : "section-content-logout"}>
                        <Routes>
                            <Route path="" element={<Greetings/>}/>
                            <Route path={"/profile/:userId"} element={<Profile/>}/>
                            <Route path="/messages" element={<Messages/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="*" element={<NotFound/>}/>
                            <Route path="/profile/*" element={<NotFound/>}/>
                        </Routes>
                        {/*<Footer/>*/}
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
    }
}

export default connect(mapStateToProps, {initializeTC})(App);
