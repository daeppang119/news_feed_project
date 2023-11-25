import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

class AuthService {
  constructor() {
    this.auth = getAuth();
    this.provider = {
      Google: new GoogleAuthProvider(),
      Github: new GithubAuthProvider()
    };
  }
  login(providerName) {
    try {
      const authProvider = this.provider[providerName];
      return signInWithPopup(this.auth, authProvider);
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  }
}

export default AuthService;
