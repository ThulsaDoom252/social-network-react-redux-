import React from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";
import {BrowserRouter, Routes, Router, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <div className="container">
          <Header/>
          <Sidebar/>
          <section className={"section-content"}>
              <Routes>
                  <Route path={"/profile"} element={<Profile/>}/>
              </Routes>
              <Footer/>
          </section>
      </div>
      </BrowserRouter>
  );
}

export default App;
