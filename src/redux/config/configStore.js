import { combineReducers, createStore } from "redux";
import category from "../modules/category";
import post from "../modules/post";
import user from "../modules/user";
const rootReducers = combineReducers({
  post,
  user,
  category
});
const store = createStore(rootReducers);

export default store;
