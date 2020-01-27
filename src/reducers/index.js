import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import alerts from "./alerts";
import products from "./products";
import register from "./register";
import analytics from "./analytics";
// tables
import reducerTarif from './reducerTarif';
import reducerTarifVersion from './reducerTarifVersion';
import reducerDistributor from './reducerDistributor';
import reducerArea from './reducerArea';

export default combineReducers({
  alerts,
  auth,
  navigation,
  products,
  register,
  analytics,
  // tables
  reducerTarif,
  reducerTarifVersion,
  reducerDistributor,
  reducerArea,
});
