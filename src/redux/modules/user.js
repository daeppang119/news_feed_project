const PREFIX = "user/";
const SIGN_UP = `${PREFIX}SIGN_UP`;
const SIGN_IN = `${PREFIX}SIGN_IN`;
const SIGN_OUT = `${PREFIX}SIGN_OUT`;
const UPDATE_INFO = `${PREFIX}UPDATE_INFO`;
const FAILED_LOGIN = `${PREFIX}FAILED_LOGIN`;
const INITIAL_FETECHED_USER_POST = `${PREFIX}INITIAL_FETECHED_USER_POST`;
const SOCIAL_LOGIN = `${PREFIX}SOCIAL_LOGIN`;

// 추가한 actionValue입니다.
const ADD_POST = `${PREFIX}ADD_POST`;

export const signUpSetState = (payload) => ({ type: SIGN_UP, payload });
export const signInSetState = (payload) => ({ type: SIGN_IN, payload });
export const signOutSetState = (payload) => ({ type: SIGN_OUT, payload });
export const initialFetchedUserPost = (payload) => ({
  type: INITIAL_FETECHED_USER_POST,
  payload
});
export const updateUserInfoSetState = (payload) => ({ type: UPDATE_INFO, payload });
export const failedLoginSetState = (payload) => ({ type: FAILED_LOGIN, payload });
export const signInAuthService = (payload) => ({ type: SOCIAL_LOGIN, payload });

// 추가한 actionCreator입니다.
export const addPostSetState = (payload) => ({
  type: ADD_POST,
  payload
});

const initialValue = {
  currentUser: false,
  // profile에 들어갈 email,
  email: "",
  // 로그인한 user의 고유 아이디
  uid: "",
  // profile에 들어갈 userName
  userName: "",
  // profile에 들어갈 사진 url
  photoUrl: "",
  // 수정할 때-> 기존 photoUrl 삭제해줘야하므로
  profilePhotoKey: "",
  // profile에 넣어도 되고 안넣어도 되는 한줄 자기소개
  intro: "자신을 소개해보세요",
  post: [
    {
      category: "",
      imgurl: "",
      text: "",
      date: "",
      // 로그인한 user의 고유 아이디 입니다.
      uid: "",
      // 이 객체가 firebase에 저장될 때 생성된 고유 아이디 입니다.
      id: "",
      isEdit: false,
      key: "",
      userName: "",
      email: ""
    }
  ]
};

const user = (state = initialValue, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, ...action.payload };
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return initialValue;
    case UPDATE_INFO:
      return { ...state, ...action.payload };
    case INITIAL_FETECHED_USER_POST:
      return { ...state, post: action.payload };
    case FAILED_LOGIN:
      return { ...state, ...action.payload };
    case SOCIAL_LOGIN:
      return { ...state, ...action.payload };
    case ADD_POST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default user;
