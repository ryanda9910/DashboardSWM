import axios from "axios";
// import config from "../../config";
// import jwt from "jsonwebtoken";
// import { toast } from "react-toastify";

// bahan, type untuk dikirim ke reducers
export const GET_ROLE_SUCCESS = "GET_ROLE_SUCCESS";
export const GET_ROLE_ERROR = "GET_ROLE_ERROR";
export const CREATE_ROLE_SUCCESS = "CREATE_ROLE_SUCCESS";
export const CREATE_ROLE_ERROR = "CREATE_ROLE_ERROR";
export const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_ERROR = "DELETE_ROLE_ERROR";

// pengolah bahan, fungsi yang mengembalikan bahan
export const getRoleSuccess = data => {
  return {
    type: GET_ROLE_SUCCESS,
    data
  };
};
export const getRoleError = payload => {
  return {
    type: GET_ROLE_ERROR,
    payload
  };
};
export const createRoleSuccess = data => {
  return {
    type: CREATE_ROLE_SUCCESS,
    data
  };
};
export const createRoleError = payload => {
  return {
    type: CREATE_ROLE_ERROR,
    payload
  };
};
export const deleteRoleSuccess = data => {
  return {
    type: DELETE_ROLE_SUCCESS,
    data
  };
};
export const deleteRoleError = payload => {
  return {
    type: DELETE_ROLE_ERROR,
    payload
  };
};

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataRole = currentPage => {
  return dispatch => {
    let url = currentPage ? "/api/role?page=" + currentPage : "/api/role";
    console.log(currentPage);
    axios
      .get(url)
      .then(res => {
        dispatch(getRoleSuccess(res.data.message));
      })
      .catch(err => {
        if (err.response) {
          dispatch(getRoleError(err.response.status));
        }
      });
  };
};
export const createDataRole = postData => {
  return dispatch => {
    axios
      .post("/api/role/", postData)
      .then(res => {
        // jika success
        if (res.data.code >= 200 || res.data.code < 300) {
          console.log(res);
          // ketika Error masuk kesini, backend
          // dispatch(createSuccess(res.data.status))
          dispatch(createRoleSuccess(res.data.message.data));
        }
        dispatch(getDataRole());
      })
      .catch(err => {
        if (err.response) {
          dispatch(createRoleError(err.response.status));
        }
      });
  };
};
export const deleteDataRole = id => {
  return dispatch => {
    axios
      .delete("/api/role/" + id)
      .then(res => {
        console.log(res.data);
        if (res.data.code >= 200 || res.data.code < 300) {
          dispatch(deleteRoleSuccess(res.data.message));
        }
        dispatch(getDataRole());
      })
      .catch(err => {
        if (err.response) {
          dispatch(deleteRoleError(err.response.status));
        }
      });
  };
};
