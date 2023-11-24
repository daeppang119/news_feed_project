const PREFIX = "category/";
const SET_INITIAL_LIST = `${PREFIX}SET_INITIAL_LIST`;
const UPDATE_LIST_COUNT = `${PREFIX}UPDATE_LIST_COUNT`;
// 이건 카테고리 추가 기능 넣을 수 있으면 넣고 아니면 삭제 부탁합니다.
const UPDATE_LIST = `${PREFIX}UPDATE_LIST`;

export const setInitialListCount = (payload) => ({
  type: SET_INITIAL_LIST,
  payload
});

export const updateListCount = (payload) => ({
  type: UPDATE_LIST_COUNT,
  payload
});
// 이건 카테고리 추가 기능 넣을 수 있으면 넣고 아니면 삭제 부탁합니다.
export const updateList = (payload) => ({
  type: UPDATE_LIST
});

const initialValue = {
  All: 0,
  Animation: 0,
  Game: 0,
  Sports: 0,
  Book: 0,
  Cook: 0
};

const category = (state = initialValue, { type, payload }) => {
  switch (type) {
    case SET_INITIAL_LIST:
      return payload;

    case UPDATE_LIST_COUNT:
      return payload;

    case UPDATE_LIST_COUNT:
      return payload;

    default:
      return state;
  }
};

export default category;
