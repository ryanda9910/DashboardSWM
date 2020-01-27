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
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataPelanggan: [],
  // CREATE
  createSuccess: false,
  createError: false,
  // SHOW
  showSuccess: false,
  showError: false,
  showData: [],
  // DELETE
  deleteSuccess: false,
  deleteError: false
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
        alertMessage: action.data
      };
    case CREATE_PELANGGAN_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_PELANGGAN_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_PELANGGAN_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
