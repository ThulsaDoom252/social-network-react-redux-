import React from 'react';
import notFound from "./notFound.jpg"
import authHoc from "../HOC/authHoc";
import {compose} from "redux";
import {connect} from "react-redux";

const NotFoundPage = (props) => {
    return (
        <div className="not-found-container">
            <div>
                <img className="not-found-image" src={notFound}/>
                 <div className="not-found-text">Not found</div>
            </div>
        </div>
    );
}

let loginCheck = (state) => {
    return {
        auth: state.auth.isLogged
    }
}

export default compose(connect(loginCheck), authHoc)(NotFoundPage);
