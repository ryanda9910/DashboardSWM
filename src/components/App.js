import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

/* eslint-disable */
import ErrorPage from "../pages/error";
/* eslint-enable */

import "../styles/theme.scss";
import LayoutComponent from "../components/Layout";
import Login from "../pages/login";
import { logoutUser } from "../actions/user";
// import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
// import Register from '../pages/register';

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!Login.isAuthenticated(localStorage.getItem("token"))) {
    dispatch(logoutUser());
    // jika logout gagal, remove token
    localStorage.removeItem("token");
    return <Redirect to="/login" />;
  } else {
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={props => React.createElement(component, props)}
      />
    );
  }
};

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

class App extends React.PureComponent {
  render() {
    console.log(this.props);

    // HANDLE 401
    // note: karena setiapi request selalu mendapat 401, padahal token nya muncul di headers
    const {
      // AREA
      getAreaError,
      createAreaError,
      deleteAreaError,
      // DISTRIBUTOR
      getDistributorError,
      createDistributorError,
      deleteDistributorError,
      // KELOMPOK PELANGGAN
      getKelompokPelangganError,
      createKelompokPelangganError,
      deleteKelompokPelangganError,
      // PELANGGAN
      getPelangganError,
      createPelangganError,
      deletePelangganError,
      // ROLE
      getRoleError,
      createRoleError,
      deleteRoleError,
      // TARIF
      getTarifError,
      createTarifError,
      deleteTarifError,
      // TARIF VERSION
      getTarifVersionError,
      createTarifVersionError,
      deleteTarifVersionError,
      // USER
      getUserError,
      createUserError,
      deleteUserError,
      //PERANGKAT
      getPerangkatError,
      createPerangkatError,
      deletePerangkatError
    } = this.props;
    if (
      getAreaError === 401 ||
      createAreaError === 401 ||
      deleteAreaError === 401 ||
      getDistributorError === 401 ||
      createDistributorError === 401 ||
      deleteDistributorError === 401 ||
      getKelompokPelangganError === 401 ||
      createKelompokPelangganError === 401 ||
      deleteKelompokPelangganError === 401 ||
      getPelangganError === 401 ||
      createPelangganError === 401 ||
      deletePelangganError === 401 ||
      getRoleError === 401 ||
      createRoleError === 401 ||
      deleteRoleError === 401 ||
      getTarifVersionError === 401 ||
      createTarifVersionError === 401 ||
      deleteTarifVersionError === 401 ||
      getTarifError === 401 ||
      createTarifError === 401 ||
      deleteTarifError === 401 ||
      getUserError === 401 ||
      createUserError === 401 ||
      deleteUserError === 401 ||
      getPerangkatError === 401 ||
      createPerangkatError === 401 ||
      deletePerangkatError === 401
    ) {
      // hapus token
      localStorage.removeItem("token");
      window.location.reload();
    }

    return (
      <div>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <HashRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/app" />} />
            {/* <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/> */}
            <PrivateRoute
              path="/app"
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            />
            {/* <Route path="/documentation" exact
                           render={() => <Redirect to="/documentation/getting-started/overview"/>}/> */}
            {/* <Route path="/documentation" component={DocumentationLayoutComponent}/> */}
            {/* <Route path="/register" exact component={Register}/> */}
            <Route path="/login" exact component={Login} />
            <Route path="/error" exact component={ErrorPage} />
            {/* <Redirect from="*" to="/app/main/visits"/> */}
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  // 401
  // AREA
  getAreaError: state.reducerArea.getError,
  createAreaError: state.reducerArea.createError,
  deleteAreaError: state.reducerArea.deleteError,
  // DISTRIBUTOR
  getDistributorError: state.reducerDistributor.getError,
  createDistributorError: state.reducerDistributor.createError,
  deleteDistributorError: state.reducerDistributor.deleteError,
  // KELOMPOK PELANGGAN
  getKelompokPelangganError: state.reducerKelompokPelanggan.getError,
  createKelompokPelangganError: state.reducerKelompokPelanggan.createError,
  deleteKelompokPelangganError: state.reducerKelompokPelanggan.deleteError,
  // PELANGGAN
  getPelangganError: state.reducerPelanggan.getError,
  createPelangganError: state.reducerPelanggan.createError,
  deletePelangganError: state.reducerPelanggan.deleteError,
  // ROLE
  getRoleError: state.reducerRole.getError,
  createRoleError: state.reducerRole.createError,
  deleteRoleError: state.reducerRole.deleteError,
  // TARIF
  getTarifError: state.reducerTarif.getError,
  createTarifError: state.reducerTarif.createError,
  deleteTarifError: state.reducerTarif.deleteError,
  // TARIF VERSION
  getTarifVersionError: state.reducerTarifVersion.getError,
  createTarifVersionError: state.reducerTarifVersion.createError,
  deleteTarifVersionError: state.reducerTarifVersion.deleteError,
  // USER
  getUserError: state.reducerUser.getError,
  createUserError: state.reducerUser.createError,
  deleteUserError: state.reducerUser.deleteError,
  //PERANGKAT
  getPerangkatError: state.reducerPerangkat.getError,
  createPerangkatError: state.reducerPerangkat.createError,
  deletePerangkatError: state.reducerPerangkat.deleteError
});

export default connect(mapStateToProps)(App);
