// bahan dari actions
import {
  GET_PELANGGAN_SUCCESS,
  GET_PELANGGAN_ERROR,
  CREATE_PELANGGAN_SUCCESS,
  CREATE_PELANGGAN_ERROR,
  DELETE_PELANGGAN_SUCCESS,
  DELETE_PELANGGAN_ERROR,
} from "../actions/tables/pelanggan";
//
const defaultState = {
  // GET
  getSuccess: false,
  getError: false,
  dataPelanggan: [],
  // CREATE
  createSuccess: false,
  createError: false,
  // DELETE
  deleteSuccess: false,
  deleteError: false
  // SHOW
  // showSuccess: false,
  // showError: false,
  // showData: [],
};

export default function reducerArea(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_PELANGGAN_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataPelanggan: action.data
      };
    case GET_PELANGGAN_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataPelanggan: null
      };
    // CREATE
    case CREATE_PELANGGAN_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
      };
    case CREATE_PELANGGAN_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
      };
    // DELETE
    case DELETE_PELANGGAN_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_PELANGGAN_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
