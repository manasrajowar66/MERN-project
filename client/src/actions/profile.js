import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

//get current user profile

export const getCurrentUserProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch({
        type: GET_PROFILE,
        playload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

//Create or update profile

export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: CREATE_PROFILE,
        playload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

//Add Experience

export const addExperience = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put("/api/profile/experience", formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        playload: res.data,
      });
      dispatch(setAlert("Experience Added", "success"));
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

// Delete Experience

export const deleteExperience = (expId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${expId}`);
      dispatch({
        type: UPDATE_PROFILE,
        playload: res.data,
      });
      dispatch(setAlert("Experience Deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

//Add Education

export const addEducation = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put("/api/profile/education", formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        playload: res.data,
      });
      dispatch(setAlert("Education Added", "success"));
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

// Delete Education

export const deleteEducation = (eduId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${eduId}`);
      dispatch({
        type: UPDATE_PROFILE,
        playload: res.data,
      });
      dispatch(setAlert("Education Deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

// Account & Profile & Posts Delete

export const deleteAccount = () => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    return async (dispatch) => {
      try {
        await axios.delete("/api/profile");
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: ACCOUNT_DELETED,
        });
        dispatch(setAlert("Your account permanently deleted"));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          playload: {
            msg: err.response ? err.response.statusText:'error undefined',
            status: err.response.status,
          },
        });
      }
    };
  }
};

//Get all profiles

export const getProfiles = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: GET_PROFILES,
        playload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

//Get profile by id

export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch({
        type: GET_PROFILE,
        playload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};

// Get users github repos

export const getGithubRepos = (gitHubUsername) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/github/${gitHubUsername}`);
      dispatch({
        type: GET_REPOS,
        playload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        playload: { msg: err.response ? err.response.statusText:'error undefined', status: err.response.status },
      });
    }
  };
};
