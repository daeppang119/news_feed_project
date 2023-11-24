import { combineReducers, createStore } from "redux";
import post from "../modules/post";
import user from "../modules/user";

const rootReducers = combineReducers({
  post,
  user
});
const store = createStore(rootReducers);

export default store;
