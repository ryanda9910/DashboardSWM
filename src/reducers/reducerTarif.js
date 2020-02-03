// bahan dari actions
import {
  GET_TARIF_SUCCESS,
  GET_TARIF_ERROR,
  CREATE_TARIF_SUCCESS,
  CREATE_TARIF_ERROR,
  DELETE_TARIF_SUCCESS,
  DELETE_TARIF_ERROR
} from "../actions/tables/tarif";
//
const defaultState = {
  // GET
  getSuccess: false,
  getError: false,
  dataTarif: [],
  dataTarifPaginate: null,
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

export default function reducerTarif(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_TARIF_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataTarif: action.data.data,
        dataTarifPaginate: action.data.meta
      };
    case GET_TARIF_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataTarif: null,
        dataTarifPaginate: null
      };
    // CREATE
    case CREATE_TARIF_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false
      };
    case CREATE_TARIF_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload
      };
    // DELETE
    case DELETE_TARIF_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_TARIF_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
