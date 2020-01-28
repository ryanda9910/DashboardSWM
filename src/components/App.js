import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
import Login from '../pages/login';
import { logoutUser } from '../actions/user';
// import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
// import Register from '../pages/register';


const PrivateRoute = ({dispatch, component, ...rest }) => {
    if (!Login.isAuthenticated(localStorage.getItem('token'))) {
      dispatch(logoutUser());
      // jika logout gagal, remove token
      localStorage.removeItem('token');
      return (<Redirect to="/login"/>);
    } else {
        return ( // eslint-disable-line
            <Route {...rest} render={props => (React.createElement(component, props))}/>
        );
    }
};

const CloseButton = ({closeToast}) => <i onClick={closeToast} className="la la-close notifications-close"/>

class App extends React.PureComponent {
  render() {

    console.log(this.props);
    
    // HANDLE 401
    // note: karena setiapi request selalu mendapat 401, padahal token nya muncul di headers
    const { 
      // TARIF VERSION
      getTarifVersionError, createTarifVersionError, deleteTarifVersionError,
      // TARIF
      getTarifError, createTarifError, deleteTarifError,
    } = this.props;
    if(
        getTarifVersionError === 401 || createTarifVersionError === 401 || deleteTarifVersionError === 401 ||
        getTarifError === 401 || createTarifError === 401 || deleteTarifError === 401
    ){
      // hapus token
      localStorage.removeItem('token');
      window.location.reload();
    }


    return (
        <div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
            <HashRouter>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/app/main"/>}/>
                    <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>
                    <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    {/* <Route path="/documentation" exact
                           render={() => <Redirect to="/documentation/getting-started/overview"/>}/> */}
                    {/* <Route path="/documentation" component={DocumentationLayoutComponent}/> */}
                    {/* <Route path="/register" exact component={Register}/> */}
                    <Route path="/login" exact component={Login}/>
                    <Route path="/error" exact component={ErrorPage}/>
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
  // TARIF VERSION
  getTarifVersionError: state.reducerTarifVersion.getError,
  createTarifVersionError: state.reducerTarifVersion.createError,
  deleteTarifVersionError: state.reducerTarifVersion.deleteError,
  // TARIF
  getTarifError: state.reducerTarif.getError,
  createTarifError: state.reducerTarif.createError,
  deleteTarifError: state.reducerTarif.deleteError,

});

export default connect(mapStateToProps)(App);
