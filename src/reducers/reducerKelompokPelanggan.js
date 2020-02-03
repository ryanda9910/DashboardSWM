// bahan dari actions
import {
  GET_KELOMPOK_PELANGGAN_SUCCESS,
  GET_KELOMPOK_PELANGGAN_ERROR,
  CREATE_KELOMPOK_PELANGGAN_SUCCESS,
  CREATE_KELOMPOK_PELANGGAN_ERROR,
  DELETE_KELOMPOK_PELANGGAN_SUCCESS,
  DELETE_KELOMPOK_PELANGGAN_ERROR
} from "../actions/tables/kelompokpelanggan";
//
const defaultState = {
  // GET
  getSuccess: false,
  getError: false,
  dataKelompokPelanggan: [],
  dataKelompokPelangganPaginate: null,
  // CREATE
  createSuccess: false,
  createError: false,
  // SHOW
  // DELETE
  deleteSuccess: false,
  deleteError: false
  // showSuccess: false,
  // showError: false,
  // showData: [],
};

export default function reducerKelompokPelanggan(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_KELOMPOK_PELANGGAN_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataKelompokPelanggan: action.data.data,
        dataKelompokPelangganPaginate: action.data.meta
      };
    case GET_KELOMPOK_PELANGGAN_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataKelompokPelanggan: null,
        dataKelompokPelangganPaginate: null
      };
    // CREATE
    case CREATE_KELOMPOK_PELANGGAN_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false
      };
    case CREATE_KELOMPOK_PELANGGAN_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload
      };
    // DELETE
    case DELETE_KELOMPOK_PELANGGAN_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_KELOMPOK_PELANGGAN_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
