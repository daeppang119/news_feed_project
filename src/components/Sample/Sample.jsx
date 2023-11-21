import React from "react";
import * as St from "../../StyledComponents/modules/StyledTest/StyledTest";

// 모든 Styled Component를 St로 바꾸어서 아래와 같이 사용하기로 약속합시다.
function Sample() {
  return (
    <St.LayOutHeader>
      <St.LayOutContainer>다 이해하셨으면 지워주세요 media Query를 적용 해썽욤</St.LayOutContainer>
    </St.LayOutHeader>
  );
}

export default Sample;
