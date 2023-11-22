import { combineReducers, createStore } from "redux";
import post from "../modules/post";
import user from "../modules/user";
const rootReducers = combineReducers({ user, post });
const store = createStore(rootReducers);

export default store;
