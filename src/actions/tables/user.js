import axios from "axios";
// import config from "../../config";
// import jwt from "jsonwebtoken";
// import { toast } from "react-toastify";

// bahan, type untuk dikirim ke reducers
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

// pengolah bahan, fungsi yang mengembalikan bahan
export const getUserSuccess = data => {
  return {
    type: GET_USER_SUCCESS,
    data
  };
};
export const getUserError = payload => {
  return {
    type: GET_USER_ERROR,
    payload
  };
};
export const createUserSuccess = data => {
  return {
    type: CREATE_USER_SUCCESS,
    data
  };
};
export const createUserError = payload => {
  return {
    type: CREATE_USER_ERROR,
    payload
  };
};
export const deleteUserSuccess = data => {
  return {
    type: DELETE_USER_SUCCESS,
    data
  };
};
export const deleteUserError = payload => {
  return {
    type: DELETE_USER_ERROR,
    payload
  };
};

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataUser = () => {
  return dispatch => {
    axios
      .get("/api/user")
      .then(res => {
        dispatch(getUserSuccess(res.data.message.data));
      })
      .catch(err => {
        if (err.response) {
          dispatch(getUserError(err.response.status));
        }
      });
  };
};
export const createDataUser = postData => {
  return dispatch => {
    axios
      .post("/api/user/", postData)
      .then(res => {
        // jika success
        if (res.data.code >= 200 || res.data.code < 300) {
          console.log(res);
          // ketika Error masuk kesini, backend
          // dispatch(createSuccess(res.data.status))
          dispatch(createUserSuccess(res.data.message.data));
        } else {
          // jika validasi dari server error
          // dispatch(createUserError(res.data.message))
        }
        dispatch(getDataUser());
      })
      .catch(err => {
        dispatch(createUserError(err.response.status));
      });
  };
};
export const deleteDataUser = id => {
  return dispatch => {
    axios
      .delete("/api/user/" + id)
      .then(res => {
        console.log(res.data);
        if (res.data.code >= 200 || res.data.code < 300) {
          dispatch(deleteUserSuccess(res.data.message));
        }
        dispatch(getDataUser());
      })
      .catch(err => {
        dispatch(deleteUserError(err.response.status));
      });
  };
};
