import axios from 'axios';
import config from '../../config';
import jwt from "jsonwebtoken";
import { toast } from 'react-toastify';

// bahan, type untuk dikirim ke reducers
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_ERROR = 'GET_ERROR';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_ERROR = 'CREATE_ERROR';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';

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
export const createSuccess = (data) => {
  return {
    type: CREATE_SUCCESS,
    data
  }
}
export const createError = (payload) => {
  return {
    type: CREATE_ERROR,
    payload
  }
}
export const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}
export const deleteError = (payload) => {
  return {
    type: DELETE_ERROR,
    payload
  }
}

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getData = () => {
  return (dispatch) => {
    axios.get('/api/tarif')
    .then(res => {
      // console.log(res.data.message.data);
      return dispatch(getSuccess(res.data.message.data));
    })
    .catch(err => {
      // console.log(err.response);
      dispatch(getError(err.response.status));
    });
  }
}
export const createData = (postData) => {
  return (dispatch) => {
    axios.post("/api/tarif/", postData)
    .then(res => {
      // console.log(res);
      if (res.status === 200 || res.status === 201) {
        dispatch(createSuccess(res.data.status))
      }
    })
    .catch(err => {
      // console.log(err);
      dispatch(createSuccess(err.response.data.message))     
    });
  }
}
export const deleteData = (id) => {
  return (dispatch) => {
    axios.delete("/api/tarif/" + id)
      .then(res => {
        console.log(res.data.message)
        return dispatch(deleteSuccess(res.data.message))
      })
      .catch(err => {
        console.log(err.data.message)
        dispatch(deleteError(err.data.message))
      });
  }
}