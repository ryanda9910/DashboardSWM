import axios from 'axios';
import config from '../../config';
import jwt from "jsonwebtoken";
import { toast } from 'react-toastify';

// bahan, type untuk dikirim ke reducers
export const GET_TARIF_VERSION_SUCCESS = 'GET_TARIF_VERSION_SUCCESS';
export const GET_TARIF_VERSION_ERROR = 'GET_TARIF_VERSION_ERROR';
export const CREATE_TARIF_VERSION_SUCCESS = 'CREATE_TARIF_VERSION_SUCCESS';
export const CREATE_TARIF_VERSION_ERROR = 'CREATE_TARIF_VERSION_ERROR';
export const DELETE_TARIF_VERSION_SUCCESS = 'DELETE_TARIF_VERSION_SUCCESS';
export const DELETE_TARIF_VERSION_ERROR = 'DELETE_TARIF_VERSION_ERROR';

// pengolah bahan, fungsi yang mengembalikan bahan
export const getTarifVersionSuccess = (data) => {
  return {
    type: GET_TARIF_VERSION_SUCCESS,
    data
  }
}
export const getTarifVersionError = (payload) => {
  return {
    type: GET_TARIF_VERSION_ERROR,
    payload
  }
}
export const createTarifVersionSuccess = (data) => {
  return {
    type: CREATE_TARIF_VERSION_SUCCESS,
    data
  }
}
export const createTarifVersionError = (payload) => {
  return {
    type: CREATE_TARIF_VERSION_ERROR,
    payload
  }
}
export const deleteTarifVersionSuccess = (data) => {
  return {
    type: DELETE_TARIF_VERSION_SUCCESS,
    data
  }
}
export const deleteTarifVersionError = (payload) => {
  return {
    type: DELETE_TARIF_VERSION_ERROR,
    payload
  }
}

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataTarifVersion = () => {
  return (dispatch) => {
    axios.get('/api/tarifversion')
    .then(res => {
      console.log(res);
      // jika 200 an suucces, jika error 401 maka tendang
      dispatch(getTarifVersionSuccess(res.data.message.data));
    })
    .catch(err => {
      if(err.response){
        dispatch(getTarifVersionError(err.response.status))
      }
    })
  }
}
export const createDataTarifVersion = (postData) => {
  return (dispatch) => {
    axios.post("/api/tarifversion/", postData)
    .then(res => {
      console.log(res)
      // jika success
      if (res.data.code >= 200 || res.data.code < 300) {
        // ketika Error masuk kesini, backend
        // dispatch(createSuccess(res.data.status))
        dispatch(createTarifVersionSuccess(res.data.status))
      }
      dispatch(getDataTarifVersion())
    })
    .catch(err => {
      if(err.response){
        dispatch(createTarifVersionError(err.response.status))
      }
    })
  }
}
export const deleteDataTarifVersion = (id) => {
  return (dispatch) => {
    axios.delete("/api/tarifversion/" + id)
      .then(res => {
        console.log(res)
        if (res.data.code >= 200 || res.data.code < 300){
          dispatch(deleteTarifVersionSuccess(res.data.message))
        }
        dispatch(getDataTarifVersion())
      })
      .catch(err => {
        if(err.response){
          dispatch(deleteTarifVersionError(err.response.status))
        }
      })
  }
}