import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import products from './products';
import register from './register';
import analytics from './analytics';
// tables
import reducerTarifPelanggan from './reducerTarifPelanggan';
import reducerDistributor from './reducerDistributor';

export default combineReducers({
  alerts,
  auth,
  navigation,
  products,
  register,
  analytics,
  reducerTarifPelanggan,
  reducerDistributor,
});
