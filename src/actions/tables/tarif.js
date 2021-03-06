import axios from "axios";
import config from "../../config";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";

// bahan, type untuk dikirim ke reducers
export const GET_TARIF_SUCCESS = "GET_TARIF_SUCCESS";
export const GET_TARIF_ERROR = "GET_TARIF_ERROR";
export const CREATE_TARIF_SUCCESS = "CREATE_TARIF_SUCCESS";
export const CREATE_TARIF_ERROR = "CREATE_TARIF_ERROR";
export const DELETE_TARIF_SUCCESS = "DELETE_TARIF_SUCCESS";
export const DELETE_TARIF_ERROR = "DELETE_TARIF_ERROR";

// pengolah bahan, fungsi yang mengembalikan bahan
export const getTarifSuccess = data => {
  return {
    type: GET_TARIF_SUCCESS,
    data
  };
};
export const getTarifError = payload => {
  return {
    type: GET_TARIF_ERROR,
    payload
  };
};
export const createTarifSuccess = data => {
  return {
    type: CREATE_TARIF_SUCCESS,
    data
  };
};
export const createTarifError = payload => {
  return {
    type: CREATE_TARIF_ERROR,
    payload
  };
};
export const deleteTarifSuccess = data => {
  return {
    type: DELETE_TARIF_SUCCESS,
    data
  };
};
export const deleteTarifError = payload => {
  return {
    type: DELETE_TARIF_ERROR,
    payload
  };
};

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataTarif = currentPage => {
  return dispatch => {
    let url = currentPage ? "/api/tarif?page=" + currentPage : "/api/tarif";
    console.log(currentPage);
    axios
      .get(url)
      .then(res => {
        dispatch(getTarifSuccess(res.data.message));
      })
      .catch(err => {
        if (err.response) {
          dispatch(getTarifError(err.response.status));
        }
      });
  };
};
export const createDataTarif = postData => {
  return dispatch => {
    axios
      .post("/api/tarif/", postData)
      .then(res => {
        // jika success
        if (res.data.code >= 200 || res.data.code < 300) {
          console.log(res);
          // ketika Error masuk kesini, backend
          // dispatch(createSuccess(res.data.status))
          dispatch(createTarifSuccess(res.data.message.data));
        } else {
          // jika validasi dari server error
          // dispatch(createTarifError(res.data.message))
        }
        dispatch(getDataTarif());
      })
      .catch(err => {
        if (err.response) {
          dispatch(createTarifError(err.response.status));
        }
      });
  };
};
export const deleteDataTarif = id => {
  return dispatch => {
    axios
      .delete("/api/tarif/" + id)
      .then(res => {
        dispatch(getTarifSuccess(res.data.message.data));
        dispatch(getDataTarif());
      })
      .catch(err => {
        if (err.response) {
          dispatch(getTarifError(err.response.status));
        }
      });
  };
};
