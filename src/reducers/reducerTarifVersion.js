// bahan dari actions
import {
  GET_SUCCESS,
  GET_ERROR,
  CREATE_SUCCESS,
  CREATE_ERROR,
  DELETE_SUCCESS,
  DELETE_ERROR
} from "../actions/tables/tarifversion";
//
const defaultState = {
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataTarifPelanggan: [],
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

export default function reducerTarifVersion(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataTarifPelanggan: action.data
      };
    case GET_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataTarifPelanggan: null
      };
    // CREATE
    case CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
        alertMessage: action.data
      };
    case CREATE_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
