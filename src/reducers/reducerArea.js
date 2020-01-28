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
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataArea: [],
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
        alertMessage: action.data
      };
    case CREATE_AREA_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_AREA_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_AREA_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
