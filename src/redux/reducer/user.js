import { ARR_SEARCH, SET_INFOR } from "../constant/user";

let userJson = localStorage.getItem("USER");
let user = JSON.parse(userJson);

const initialState = {
  info: user,
  arrSearch: [],
};

export let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFOR: {
      return { ...state, info: payload };
    }
    case ARR_SEARCH: {
      return { ...state, arrSearch: payload };
    }
    default:
      return state;
  }
};
