import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import profileReducer from "./profile-reducer/profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import dialogsReducer from "./dialogs-reducer";
import settingsReducer from "./settings-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogsPage: dialogsReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store