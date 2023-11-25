import { firebaseApp } from "../firebase/firebase";
import { auth } from "./firebase";

export default class AuthService {
  login(providerName) {
    const authProvider = new firebaseApp.auth[`${providerName}AuthProvider`]();
    console.log(authProvider);
    return auth().signInWithPopup(authProvider);
  }
}
