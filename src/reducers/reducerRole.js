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
  // GET
  getSuccess: false,
  getError: false,
  dataRole: [],
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
      };
    case CREATE_ROLE_ERROR:
      return {
        ...state,
        createSuccess: false,
        createError: action.payload,
      };
    // DELETE
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteError: false
      };
    case DELETE_ROLE_ERROR:
      return {
        ...state,
        deleteSuccess: false,
        deleteError: action.payload
      };
    default:
      return state;
  }
}
