import firebase from "firebase";
import { auth } from "./firebase";

export default class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    console.log(authProvider);
    return auth().signInWithPopup(authProvider);
  }
}
