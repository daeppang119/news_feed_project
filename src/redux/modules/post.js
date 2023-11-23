const PREFIX = "post/";
const INITIAL_FETCH_POSTS = `${PREFIX}FETCH_POSTS`;
const UPDATE_POSTS = `${PREFIX}UPDATE_POSTS`;
const EDIT_POST = `${PREFIX}EDIT_POST`;
const FILTER_POSTS = `${PREFIX}FILTER_POSTS`;
const REMOVE_POST = `${PREFIX}REMOVE_POST`;

export const initialFetchPost = (payload) => ({
  type: INITIAL_FETCH_POSTS,
  payload
});

export const updatePost = (payload) => ({
  type: UPDATE_POSTS,
  payload
});
export const editPgost = (payload) => ({
  type: EDIT_POST,
  payload
});

export const filterPost = (payload) => ({
  type: FILTER_POSTS,
  payload
});

export const removePost = (payload) => ({
  type: REMOVE_POST,
  payload
});

const initialValue = [];

const post = (state = initialValue, action) => {
  switch (action.type) {
    case INITIAL_FETCH_POSTS:
      return action.payload;
    case UPDATE_POSTS:
      return action.payload;
    case EDIT_POST:
      return action.payload;
    case FILTER_POSTS:
      return action.payload;
    case REMOVE_POST:
      return action.payload;
    default:
      return state;
  }
};

export default post;
