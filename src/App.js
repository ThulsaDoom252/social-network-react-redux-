import React from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";
import {BrowserRouter, Routes, Router, Route} from "react-router-dom";
import Settings from "./components/Settings";
import News from "./components/News";
import Users from "./components/Users";

function App() {
  return (
      <BrowserRouter>
      <div className="container">
          <Header/>
          <Sidebar/>
          <section className={"section-content"}>
              <Routes>
                  <Route path={"/profile"} element={<Profile/>}/>
                  <Route path={"/users"} element={<Users/>}/>
                  <Route path={"/news"} element={<News/>}/>
                  <Route path={"/settings"} element={<Settings/>}/>
              </Routes>
              <Footer/>
          </section>
      </div>
      </BrowserRouter>
  );
}

export default App;
