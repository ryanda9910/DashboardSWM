// bahan dari actions
import {
  GET_AREA_SUCCESS,
  GET_AREA_ERROR,
  CREATE_AREA_SUCCESS,
  CREATE_AREA_ERROR,
  DELETE_AREA_SUCCESS,
  DELETE_AREA_ERROR,
} from "../actions/tables/area";
//
const defaultState = {
  // GET
  getSuccess: false,
  getError: false,
  dataArea: [],
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
    case GET_AREA_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataArea: action.data
      };
    case GET_AREA_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataArea: null
      };
    // CREATE
    case CREATE_AREA_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
      };
    case CREATE_AREA_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
      };
    // DELETE
    case DELETE_AREA_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_AREA_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
