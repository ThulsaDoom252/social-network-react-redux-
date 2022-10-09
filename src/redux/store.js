import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import profileReducer from "./profile-reducer";

let reducers = combineReducers({
    profilePage: profileReducer

})

const store = createStore(combineReducers, applyMiddleware(thunkMiddleware))

export default store