// bahan dari actions
import {
  GET_PERANGKAT_SUCCESS,
  GET_PERANGKAT_ERROR,
  CREATE_PERANGKAT_SUCCESS,
  CREATE_PERANGKAT_ERROR,
  DELETE_PERANGKAT_SUCCESS,
  DELETE_PERANGKAT_ERROR
} from "../actions/tables/perangkat";
//
const defaultState = {
  // GET
  getSuccess: false,
  getError: false,
  dataPerangkat: [],
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

export default function reducerPerangkat(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_PERANGKAT_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataPerangkat: action.data
      };
    case GET_PERANGKAT_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataPerangkat: null
      };
    // CREATE
    case CREATE_PERANGKAT_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false
      };
    case CREATE_PERANGKAT_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload
      };
    // DELETE
    case DELETE_PERANGKAT_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_PERANGKAT_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
