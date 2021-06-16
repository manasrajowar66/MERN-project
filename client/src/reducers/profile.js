import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export const profile = (state = initialState, action) => {
  const { type, playload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: playload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: playload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: playload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: playload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};
