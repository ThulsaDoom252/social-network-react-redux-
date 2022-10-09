import React from "react";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="container">
          <Header/>
          <Sidebar/>
          <section className={"section-content"}>
              <Profile/>
              <Footer/>
          </section>
      </div>
  );
}

export default App;
