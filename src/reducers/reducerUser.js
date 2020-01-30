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
  // GET
  getSuccess: false,
  getError: false,
  dataUser: [],
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
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
      };
    // DELETE
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
