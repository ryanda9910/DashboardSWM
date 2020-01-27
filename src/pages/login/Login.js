import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from "reactstrap";
import Widget from "../../components/Widget";
import { loginUser, receiveToken } from "../../actions/user";
import jwt from "jsonwebtoken";

// import microsoft from '../../images/microsoft.png';
// import config from "../../config";// assets
import logoMuzli from "../../images/Muzli-logo-1.svg";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    // if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    console.log(data);
    return date < data.exp;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  }

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");
    if (token) {
      this.props.dispatch(receiveToken(token));
    }
  }

  signUp() {
    this.props.history.push("/register");
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" }
    }; // eslint-disable-line

    // cant access login page while logged in
    if (Login.isAuthenticated(localStorage.getItem("token"))) {
      return <Redirect to={from} />;
    }
    return (
      <div className="auth-page">
        <Container>
          {/* <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}> */}
          <Widget className="widget-auth mx-auto pb-3">
            <div className="text-center py-3">
              <div className="pb-3 pt-3">
                <img src={logoMuzli} alt="logo" />
              </div>
              <p className="text-white login-title">Login Admin</p>
            </div>
            {/* <Alert className="alert-sm text-center mt-2 widget-middle-overflow rounded-0" color="secondary">
                  This is a real app with Node.js backend - use
                  <br/>
                  <span className="font-weight-bold">"admin@flatlogic.com / password"</span>
                  <br/>
                  to login!
              </Alert> */}
            <form onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert
                  className="text-center alert-sm widget-middle-overflow rounded-0"
                  color="danger"
                >
                  {/* {this.props.errorMessage.response.data.message} */}
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="text-white">
                <Label for="email">Email</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    className="bg-widget pl-3"
                    value={this.state.email}
                    onChange={this.changeEmail}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                    style={{ color: "#ffffff" }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-lock text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    autoComplete="on"
                    id="password"
                    className="bg-widget pl-3"
                    value={this.state.password}
                    onChange={this.changePassword}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    style={{ color: "#ffffff" }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="bg-widget auth-widget-footer">
                <Button
                  type="submit"
                  color="danger"
                  className="auth-btn mb-5"
                  size="sm"
                >
                  <span className="auth-btn-circle">
                    <i className="la la-caret-right" />
                  </span>
                  {this.props.isFetching ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          </Widget>
        </Container>
        <footer className="auth-footer text-white">
          2020 &copy; SWM Manangement
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

export default withRouter(connect(mapStateToProps)(Login));
