import axios from 'axios';
import config from '../../config';
import jwt from "jsonwebtoken";

// bahan, type untuk dikirim ke reducers
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_ERROR = 'GET_ERROR';

// pengolah bahan, fungsi yang mengembalikan bahan
export const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data
  }
}
export const getError = (payload) => {
  return {
    type: GET_ERROR,
    payload
  }
}

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getData = () => {
  return (dispatch) => {
    axios.get('/api/tarif', config.axiosConfig)
    .then(res => {
      console.log(res.data.message.data);
      return dispatch(getSuccess(res.data.message.data));
    })
    .catch(err => {
      console.log(err.response);
      dispatch(getError(err.response.status));
    });
  }
}