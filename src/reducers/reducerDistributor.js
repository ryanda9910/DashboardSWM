// bahan dari actions
import {
  GET_DISTRIBUTOR_SUCCESS, GET_DISTRIBUTOR_ERROR,
  CREATE_DISTRIBUTOR_SUCCESS, CREATE_DISTRIBUTOR_ERROR,
  DELETE_DISTRIBUTOR_SUCCESS, DELETE_DISTRIBUTOR_ERROR,
} from '../actions/tables/distributor';
// 
const defaultState = {
  // GET
  getSuccess: false,
  getError: false,
  dataDistributor: [],
};

export default function reducerTarifPelanggan(state = defaultState, action) {
  switch (action.type) {
      // GET
      case GET_DISTRIBUTOR_SUCCESS:
        return {
          ...state,
          getSuccess: true,
          getError: false,
          dataDistributor: action.data
        };
      case GET_DISTRIBUTOR_ERROR:
        return {
          ...state,
          getSuccess: false,
          getError: action.payload,
          dataDistributor: null
        };
      // CREATE
      case CREATE_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createError: false,
        alertMessage: action.data
      };
      case CREATE_DISTRIBUTOR_ERROR:
        return {
          ...state,
          createSuccess: false,
          createError: action.payload,
          alertMessage: null
        };
      // DELETE
      case DELETE_DISTRIBUTOR_SUCCESS:
        return {
          ...state,
          alertMessage: action.data,
          deleteSuccess: true,
          deleteError: false
        };
      case DELETE_DISTRIBUTOR_ERROR:
        return {
          ...state,
          deleteSuccess: false,
          deleteError: true
        };
      default:
          return state;
  }
}
