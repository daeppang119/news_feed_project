import React, { useState } from "react";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import Animate from "../StyledComponents/modules/StyledProgress/StyledProgress";
import AuthLogin from "../components/auth/AuthLogin";
import EmailLogin from "../components/auth/EmailLogin";
function Login() {
  const [isLoging, setIsLoging] = useState(false);
  <>
    <St.LoginLayout>
      <EmailLogin isLoging={isLoging} setIsLoging={setIsLoging} />
      {/* social Login */}
      <AuthLogin />
    </St.LoginLayout>
    {isLoging && (
      <Animate.ProgressContainer>
        <div>
          {Animate.EffectionsNumber.map((a) => {
            return <Animate.ProgressSpan key={a} $i={a} />;
          })}
        </div>
      </Animate.ProgressContainer>
    )}
  </>;
}
export default Login;
