// bahan dari actions
import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from "../actions/tables/user";
//
const defaultState = {
  // ALERT
  alertMessage: "",
  // GET
  getSuccess: false,
  getError: false,
  dataUser: [],
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

export default function reducerUser(state = defaultState, action) {
  switch (action.type) {
    // GET
    case GET_USER_SUCCESS:
      return {
        ...state,
        getSuccess: true,
        getError: false,
        dataUser: action.data
      };
    case GET_USER_ERROR:
      return {
        ...state,
        getSuccess: false,
        getError: action.payload,
        dataUser: null
      };
    // CREATE
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
        alertMessage: action.data
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
        alertMessage: null
      };
    // DELETE
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        alertMessage: action.data,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: true
      };
    default:
      return state;
  }
}
