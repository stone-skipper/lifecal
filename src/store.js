import { createStore } from "redux";

export default createStore(
  function (state, action) {
    if (state === undefined) {
      return { name: null, birthday: null, color1: null, color2: null };
    } else if (action.type === "PROFILE") {
      return {
        name: action.name,
        birthday: action.birthday,
        color1: action.color1,
        color2: action.color2,
      };
    } else if (action.type === "EVENT") {
      return {
        profile: action.profile,
        event: action.event,
      };
    }
    return state;
  },

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
