import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export const alert = (state = initialState, action) => {
  const { type, playload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, playload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== playload);
    default:
      return state;
  }
};
