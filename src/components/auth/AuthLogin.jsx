import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as St from "../../StyledComponents/modules/StyledLogin/StyledLogin";
import AuthService from "../../firebase/auth_service";
import { signInAuthService } from "../../redux/modules/user";
const AuthLogin = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSocialLogin = (e) => {
    authService
      .login(e.currentTarget.name)
      .then((userCredential) => {
        dispatch(
          signInAuthService({
            currentUser: true,
            email: userCredential.user.email,
            photoUrl: userCredential.user.photoURL,
            userName: userCredential.user.displayName,
            uid: userCredential.user.uid
          })
        );
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <St.EasyLoginCon>
        <St.HorizontalBox></St.HorizontalBox>
        <St.EasyLogin>간편로그인</St.EasyLogin>
        <St.HorizontalBox></St.HorizontalBox>
      </St.EasyLoginCon>
      <div>
        <St.SnsBtn name="Google" onClick={handleSocialLogin}>
          Login with Google
        </St.SnsBtn>
      </div>
      <div>
        <St.SnsBtn name="Github" onClick={handleSocialLogin}>
          Login with GitHub
        </St.SnsBtn>
      </div>
    </>
  );
};

export default AuthLogin;
