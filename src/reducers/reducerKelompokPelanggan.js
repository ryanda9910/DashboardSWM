// bahan dari actions
import {
  GET_KELOMPOK_PELANGGAN_SUCCESS,
  GET_KELOMPOK_PELANGGAN_ERROR,
  CREATE_KELOMPOK_PELANGGAN_SUCCESS,
  CREATE_KELOMPOK_PELANGGAN_ERROR,
  DELETE_KELOMPOK_PELANGGAN_SUCCESS,
  DELETE_KELOMPOK_PELANGGAN_ERROR,
} from "../actions/tables/kelompokpelanggan";
//
const defaultState = {
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataKelompokPelanggan: [],
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
    case GET_KELOMPOK_PELANGGAN_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataKelompokPelanggan: action.data
      };
    case GET_KELOMPOK_PELANGGAN_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataKelompokPelanggan: null
      };
    // CREATE
    case CREATE_KELOMPOK_PELANGGAN_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
        alertMessage: action.data
      };
    case CREATE_KELOMPOK_PELANGGAN_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_KELOMPOK_PELANGGAN_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_KELOMPOK_PELANGGAN_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
