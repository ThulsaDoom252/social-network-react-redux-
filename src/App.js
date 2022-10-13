import React, {useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";
import {BrowserRouter, Routes, Router, Route} from "react-router-dom";
import Settings from "./components/Settings";
import News from "./components/News";
import Users from "./components/Users";
import Login from "./components/Login";
import {connect} from "react-redux";
import Initialize from "./components/Initialize";
import {initializeTC} from "./redux/app-reducer";

function App(props) {
    useEffect(() => {
        props.initializeTC()
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
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"/users"} element={<Users/>}/>
                            <Route path={"/news"} element={<News/>}/>
                            <Route path={"/settings"} element={<Settings/>}/>
                            <Route path={"/login"} element={<Login/>}/>
                        </Routes>
                        <Footer/>
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
