import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
const AuthLogin = ({ authService }) => {
  const onSocialLogin = (e) => {
    authService.login(e.currentTarget.textContent);
  };
  return (
    <>
      <St.EasyLoginCon>
        <St.HorizontalBox></St.HorizontalBox>
        <St.EasyLogin>간편로그인</St.EasyLogin>
        <St.HorizontalBox></St.HorizontalBox>
      </St.EasyLoginCon>
      <div>
        <St.SnsBtn onClick={onSocialLogin}>Google</St.SnsBtn>
      </div>
      <div>
        <St.SnsBtn onClick={onSocialLogin}>Github</St.SnsBtn>
      </div>
    </>
  );
};

export default AuthLogin;
