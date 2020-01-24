// bahan dari actions
import {
  GET_SUCCESS, GET_ERROR
} from '../actions/tables/tarifpelanggan';
// 
const defaultState = {
  getSuccess: false,
  getError: false,
  dataTarifPelanggan: [],
};


export default function reducerTarifPelanggan(state = defaultState, action) {
  switch (action.type) {
      case GET_SUCCESS:
        return {
          ...state,
          getSuccess: true,
          getError: false,
          dataTarifPelanggan: action.data
        };
      case GET_ERROR:
        return {
          ...state,
          getSuccess: false,
          getError: action.payload,
          dataTarifPelanggan: null
        };
      default:
          return state;
  }
}
