const PREFIX = "user/";
const SIGN_UP = `${PREFIX}SIGN_UP`;
const SIGN_IN = `${PREFIX}SIGN_IN`;
const SIGN_OUT = `${PREFIX}SIGN_OUT`;
const UPDATE_INFO = `${PREFIX}UPDATE_INFO`;
const FAILED_LOGIN = `${PREFIX}FAILED_LOGIN`;
const INITIAL_FETECHED_POST = `${PREFIX}INITIAL_FETECHED_POST`;
export const signUpSetState = (payload) => ({ type: SIGN_UP, payload });
export const signInSetState = (payload) => ({ type: SIGN_IN, payload });
export const signOutSetState = (payload) => ({ type: SIGN_OUT, payload });
export const initialFetchedPost = (payload) => ({
  type: INITIAL_FETECHED_POST,
  payload
});
export const updateUserInfoSetState = (payload) => ({ type: UPDATE_INFO, payload });
export const failedLoginSetState = (payload) => ({ type: FAILED_LOGIN, payload });

const initialValue = {
  currentUser: false,
  email: "",
  pwd: "",
  uid: "",
  userName: "",
  profilePhotoUrl: "",
  intro: "",
  comment: [
    {
      category: "",
      imgurl: "",
      text: "",
      date: ""
    }
  ]
};

const user = (state = initialValue, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.payload;
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return initialValue;
    case UPDATE_INFO:
      return action.payload;
    case INITIAL_FETECHED_POST:
      return { ...state, comment: action.payload };
    case FAILED_LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default user;
