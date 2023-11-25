import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

class AuthService {
  constructor() {
    this.auth = getAuth();
    this.provider = {
      Google: GoogleAuthProvider,
      Github: GithubAuthProvider
    };
  }
  login(providerName) {
    try {
      const authProvider = new this.provider[providerName]();
      authProvider.setCustomParameters({
        prompt: "select_account"
      });
      return signInWithPopup(this.auth, authProvider);
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = this.provider[providerName].credentialFromError(error);
      console.log(credential);
      throw new Error(credential);
    }
  }
}

export default AuthService;
