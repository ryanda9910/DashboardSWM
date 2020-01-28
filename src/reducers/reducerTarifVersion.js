// bahan dari actions
import {
  GET_TARIF_VERSION_SUCCESS,
  GET_TARIF_VERSION_ERROR,
  CREATE_TARIF_VERSION_SUCCESS,
  CREATE_TARIF_VERSION_ERROR,
  DELETE_TARIF_VERSION_SUCCESS,
  DELETE_TARIF_VERSION_ERROR,
} from "../actions/tables/tarifversion";
//
const defaultState = {
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataTarifVersion: [],
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

export default function reducerTarif(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_TARIF_VERSION_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataTarifVersion: action.data
      };
    case GET_TARIF_VERSION_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataTarifVersion: null
      };
    // CREATE
    case CREATE_TARIF_VERSION_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
        alertMessage: action.data
      };
    case CREATE_TARIF_VERSION_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_TARIF_VERSION_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_TARIF_VERSION_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
