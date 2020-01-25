// bahan dari actions
import {
  GET_DISTRIBUTOR_SUCCESS, GET_DISTRIBUTOR_ERROR,
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
      default:
          return state;
  }
}
