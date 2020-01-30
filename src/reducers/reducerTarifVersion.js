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
  // GET
  getSuccess: false,
  getError: false,
  dataTarifVersion: [],
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
      };
    case CREATE_TARIF_VERSION_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
      };
    // DELETE
    case DELETE_TARIF_VERSION_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_TARIF_VERSION_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
