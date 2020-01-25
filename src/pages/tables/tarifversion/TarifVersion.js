import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  Alert
} from "reactstrap";
import axios from "axios";
import $ from "jquery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt from "jsonwebtoken";
// MODAL CREATE
import cx from "classnames";
import config from "../../../config";
import Loader from "../../../components/Loader/Loader";
import s from "./TarifVersion.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getData,
  createData,
  deleteData
} from "../../../actions/tables/tarifversion";

class TarifVersion extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    // if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    return date < data.exp;
  }

  constructor(props) {
    super(props);
    this.state = {
      // GET
      // dataTarifVersion: [],
      // getSucces: false,
      // getError: false,
      // ALERT
      showAlert: false,
      alertDestroy: false,
      isCreated: false,
      showAlert: false
    };
  }

  componentDidMount() {
    // GET data
    this.props.dispatch(getData());

    // ALERT
    return this.props.alertMessage ? this.onShowAlert() : null;
  }

  // DELETE
  handleDelete(id) {
    let confirm = window.confirm("delete data, are you sure?");
    console.log(confirm);
    if (confirm) {
      this.props.dispatch(deleteData(id));
      this.onShowAlert();
      this.props.dispatch(getData());
    }
  }

  onShowAlert = () => {
    this.setState(
      {
        showAlert: true
      },
      () => {
        window.setTimeout(() => {
          this.setState({
            showAlert: false,
            alertDestroy: false
          });
        }, 2000);
      }
    );
    localStorage.removeItem("isCreated");
  };

  render() {
    // console.log(this.state);
    // console.log(this.props);

    // jika error karena 401 atau lainnya, tendang user dengan hapus cookie
    // if(this.props.getError){
    //   return document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // }

    // search
    $(document).ready(function() {
      $("#myInput").on("keyup", function() {
        var value = $(this)
          .val()
          .toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(value) > -1
          );
        });
      });
    });

    // table data
    const tableData =
      this.props.dataTarifVersion.length > 0 ? (
        this.props.dataTarifVersion.map(item => {
          console.log(item);
          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
            <span className="badge btn-danger">FALSE</span>
          );
          const isprogressive = item.isprogressive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
            <span className="badge btn-danger">FALSE</span>
          );
          return (
            <tr>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{isactive}</td>
              <td>{isprogressive}</td>
              <td>{item.volfrom1}</td>
              <td>{item.price1}</td>
              <td>{item.volfrom2}</td>
              <td>{item.price2}</td>
              <td>
                <Link
                  to={"/app/forms/editdatatarifpelanggan/" + item._id}
                  className="mr-1"
                >
                  <span className="text-success">
                    <i class="far fa-edit"></i>
                    Ubah
                  </span>
                </Link>
                <a onClick={() => this.handleDelete(item._id)} className="ml-1">
                  <span className="text-danger">
                    <i class="fas fa-trash"></i>
                    Hapus
                  </span>
                </a>
              </td>
            </tr>
          );
        })
      ) : (
        <Loader size={35} className="pt-5 position-absolute" />
      );

    return (
      <div className={s.root}>
        <Row className="pt-3">
          <Col lg={12}>
            <Row>
              <Col lg={12}>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">YOU ARE HERE</li>
                  <li className="breadcrumb-item active">
                    Tarif <span>Version</span>
                  </li>
                </ol>
                {/* alert */}
                <Alert
                  color="success"
                  className={cx(s.promoAlert, {
                    [s.showAlert]: this.state.showAlert
                  })}
                >
                  {this.props.alertMessage || "Data get actions"}
                </Alert>
                {/* handle 401 */}
                {/* <button onClick={() => document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'}>delete cookie</button> */}
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Tarif Pelanggan</span>
                </h3>
              </Col>
              <Col lg={4}>
                <input
                  class="form-control my-3"
                  id="myInput"
                  placeholder="Search"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col>
              <Col lg={4} className="text-right">
                {/* <button className="btn btn-primary">Create</button> */}
                {/* <CreateModal /> */}
                <Link
                  to="/app/forms/createdatatarifpelanggan"
                  className="btn bg-warning text-white"
                >
                  Tambah Data
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Widget refresh collapse close className="px-2">
                  <div className="table-responsive">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>ValidFrom</th>
                          <th>Price 1</th>
                          <th>Volume 1</th>
                          <th>Price 2</th>
                          <th>Volume 2</th>
                          <th>Price 3 </th>
                          <th>Volume 3</th>
                          <th>Distributor Id </th>
                          <th>Tarif Id </th>
                          {/* <th>Status</th> */}
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataTarifVersion ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // ALERT
    alertMessage: state.reducerTarifVersion.alertMessage,
    // GET
    getSuccess: state.reducerTarifVersion.getSuccess,
    getError: state.reducerTarifVersion.getError,
    dataTarifVersion: state.reducerTarifVersion.dataTarifVersion,
    // CREATE
    createSuccess: state.reducerTarifVersion.createSuccess,
    createError: state.reducerTarifVersion.createError,
    // UPDATE
    updateSuccess: state.reducerTarifVersion.updateSuccess,
    updateError: state.reducerTarifVersion.updateError,
    // DELETE
    deleteSuccess: state.reducerTarifVersion.deleteSuccess,
    deleteError: state.reducerTarifVersion.deleteError
  };
}

export default withRouter(connect(mapStateToProps)(TarifVersion));
