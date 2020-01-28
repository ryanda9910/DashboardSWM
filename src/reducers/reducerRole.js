// bahan dari actions
import {
  GET_ROLE_SUCCESS,
  GET_ROLE_ERROR,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_ERROR,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_ERROR
} from "../actions/tables/role";
//
const defaultState = {
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataRole: [],
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

export default function reducerRole(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataRole: action.data
      };
    case GET_ROLE_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataRole: null
      };
    // CREATE
    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
        alertMessage: action.data
      };
    case CREATE_ROLE_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_ROLE_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
