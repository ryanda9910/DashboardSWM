import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Alert,
  // MODALS
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
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
// import cx from "classnames";
// import config from "../../../config";
import Loader from "../../../components/Loader/Loader";
import s from "./Roledata.module.scss";
// react-pagination-library
import Pagination from "react-pagination-library";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataRole,
  createDataRole,
  deleteDataRole
} from "../../../actions/tables/role";
// ambil distributor untuk create dan update
import { getDataDistributor } from "../../../actions/tables/distributor";

class Roledata extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      code: "",
      isactive: "",
      name: "",
      description: "",
      menuaccess: [],
      distributor_id: "",
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,
      // HANDLE MENUACCESS
      tarifversion: false,
      tarif: false,
      cutomerbilling: false,
      pelanggan: false,
      // react-pagination-library
      pageCount: 0,
      currentPage: 1,
      triggerPaginate: false
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }

  componentDidMount() {
    // GET data
    this.receiveData();
    // GET data distributor
    this.props.dispatch(getDataDistributor());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      pageCount: nextProps.dataRolePaginate.pages
    });
  }
  componentDidUpdate() {
    if (this.props.dataRolePaginate.page !== this.state.currentPage) {
      this.receiveData();
      this.props.dispatch(getDataDistributor());
    }
  }
  pageCount() {
    this.setState({
      pageCount: this.props.dataRolePaginate.pages
    });
  }
  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataRole(this.state.currentPage));
  }
  // react-pagination-library
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
    //fetch a data
    //or update a query to get data
    // this.props.dispatch(getDataArea(this.state.currentPage));
    // this.receiveData();
  };

  // CREATE Role
  doCreateRole = e => {
    e.preventDefault();
    // HANDLE MENU ACCESS
    const tarif = this.state.tarif === true ? "tarif" : "popTarif";
    const tarifversion =
      this.state.tarifversion === true ? "tarifversion" : "popTarifVersion";
    const customerbilling =
      this.state.customerbilling === true
        ? "customerbilling"
        : "popCustomerBilling";
    const pelanggan =
      this.state.pelanggan === true ? "pelanggan" : "popPelanggan";
    //
    if (this.state.menuaccess.indexOf("tarif") === -1) {
      if (tarif === "tarif") {
        this.state.menuaccess.push(tarif);
      }
    } else {
      if (tarif === "popTarif") {
        this.state.menuaccess.splice(this.state.menuaccess.indexOf("tarif"), 1);
      }
    }
    if (this.state.menuaccess.indexOf("tarifversion") === -1) {
      if (tarifversion === "tarifversion") {
        this.state.menuaccess.push(tarifversion);
      }
    } else {
      if (tarifversion === "popTarifVersion") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("tarifversion"),
          1
        );
      }
    }
    if (this.state.menuaccess.indexOf("customerbilling") === -1) {
      if (customerbilling === "customerbilling") {
        this.state.menuaccess.push(customerbilling);
      }
    } else {
      if (customerbilling === "popCustomerBilling") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("customerbilling"),
          1
        );
      }
    }
    if (this.state.menuaccess.indexOf("pelanggan") === -1) {
      if (pelanggan === "pelanggan") {
        this.state.menuaccess.push(pelanggan);
      }
    } else {
      if (pelanggan === "popPelanggan") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("pelanggan"),
          1
        );
      }
    }

    let postData = {
      code: this.state.code,
      isactive: this.state.isactive === true ? "true" : "false",
      name: this.state.name,
      description: this.state.description,
      menuaccess: this.state.menuaccess,
      distributor_id: this.state.distributor_id
    };
    console.log(postData);
    this.props.dispatch(createDataRole(postData));
    this.setState({ modalCreate: false });
  };
  // track change
  handleCreateChange = e => {
    console.log(e.target);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  // DELETE
  handleDelete(id) {
    let confirm = window.confirm("delete data, are you sure?");
    console.log(confirm);
    if (confirm) {
      this.props.dispatch(deleteDataRole(id));
      this.onShowAlert();
      this.props.dispatch(getDataRole());
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
  };

  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id]
    }));
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const { modalCreate } = this.state;
    const { dataRole, dataDistributor } = this.props;

    // create error
    const createError =
      this.props.createError === false ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.props.createError}</small>
        </div>
      );

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
      dataRole.length > 0 ? (
        dataRole.map(item => {
          // console.log(item);
          // handle isactive
          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
            <span className="badge btn-danger">FALSE</span>
          );
          // handle menuaccess
          // let menuaccess = "";
          // for (var a = 0; a < item.menuaccess.length; a++) {
          //   menuaccess += item.menuaccess[a]+" ";
          // }
          return (
            <tr key={item._id}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{isactive}</td>
              {/* <td>{menuaccess}</td> */}
              <td>{item.distributor_id.name}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={"/app/forms/editdatarole/" + item._id}
                  className="mr-1"
                >
                  <span className="text-success">
                    <i className="far fa-edit"></i>
                    Ubah
                  </span>
                </Link>
                <a onClick={() => this.handleDelete(item._id)} className="ml-1">
                  <span className="text-danger">
                    <i className="fas fa-trash"></i>
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
                    Data<span> Role</span>
                  </li>
                </ol>
                {/* alert */}
                {/* <Alert
                  color="success"
                  className={cx(s.promoAlert, {
                    [s.showAlert]: this.state.showAlert
                  })}
                >
                  {this.props.alertMessage || "Data get actions"}
                </Alert> */}
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold"> Role </span>
                </h3>
              </Col>
              <Col lg={4}>
                <Input
                  className="form-control my-3"
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
                {/* <Link
                  to="/app/forms/createdatatarifpelanggan"
                  className="btn bg-warning text-white"
                >
                  Tambah Data
                </Link> */}
                {/* BUTTON MODALS CREATE */}
                <Button
                  className="mr-sm"
                  color="warning"
                  onClick={() => this.toggle("modalCreate")}
                >
                  Tambah Data
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Widget refresh collapse close className="px-2">
                  {/* react-pagination-library */}
                  <Col lg={12}>
                    <Pagination
                      currentPage={this.state.currentPage}
                      totalPages={this.state.pageCount}
                      changeCurrentPage={this.changeCurrentPage}
                      theme="bottom-border"
                    />
                  </Col>
                  <div className="table-responsive">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nama</th>
                          <th>Status</th>
                          {/* <th>Akses Menu</th> */}
                          <th>ID Distributor</th>
                          <th>Deskripsi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataRole ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* MODALS */}
        <Modal
          size="md"
          isOpen={modalCreate}
          toggle={() => this.toggle("modalCreate")}
        >
          <ModalHeader toggle={() => this.toggle("modalCreate")}>
            Tambah Data
          </ModalHeader>
          <ModalBody>
            <Form
              id="formCreateDataRolegetDataRole"
              onSubmit={this.doCreateRole}
            >
              {/* code */}
              <FormGroup>
                <Label for="code">Kode </Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="code"
                  placeholder=" Masukkan Kode"
                />
              </FormGroup>
              {/* name */}
              <FormGroup>
                <Label for="name">Nama</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Masukkan Nama"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* isactive */}
              <div className={s.root}>
                <FormGroup className="display-inline-block checkbox-ios">
                  <Label for="exampleActive" className="switch">
                    <Input
                      onChange={this.handleCreateChange}
                      type="checkbox"
                      id="exampleActive"
                      name="isactive"
                      className="ios"
                      label="Turn on this if True"
                    />
                    <i />
                    Status
                  </Label>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
              </div>
              {/* description */}
              <FormGroup>
                <Label for="exampleKode">Deskripsi</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="description"
                  id="exampleDescription"
                  placeholder="Masukkan Deskripsi"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleKode">Distributor ID </Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="select"
                  name="distributor_id"
                  id="exampleSelect"
                >
                  <option value={null}></option>
                  {dataDistributor.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* menuaccess */}
              <Label>Menu akses</Label>
              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="tarif"
                  name="tarif"
                  label="tarif"
                  value="tarif"
                />
                <Label for="tarif" check>
                  tarif
                </Label>
              </FormGroup>

              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="tarifversion"
                  name="tarifversion"
                  label="tarifversion"
                  value="tarifversion"
                />
                <Label for="tarifversion" check>
                  tarif version
                </Label>
              </FormGroup>
              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="customerbilling"
                  name="customerbilling"
                  label="customerbilling"
                  value="customerbilling"
                />
                <Label for="customerbilling" check>
                  customer billing
                </Label>
              </FormGroup>

              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="pelanggan"
                  name="pelanggan"
                  label="pelanggan"
                  value="pelanggan"
                />
                <Label for="pelanggan" check>
                  pelanggan
                </Label>
              </FormGroup>

              {/* show ERROR */}
              <FormGroup row className="bg-danger">
                {createError}
              </FormGroup>

              <ModalFooter>
                <Button color="dark" onClick={() => this.toggle("modalCreate")}>
                  Close
                </Button>
                {/* create */}
                <Button color="warning" className="px-5" type="submit">
                  Tambah Data
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // ALERT
    alertMessage: state.reducerRole.alertMessage,
    // GET
    getSuccess: state.reducerRole.getSuccess,
    getError: state.reducerRole.getError,
    dataRole: state.reducerRole.dataRole,
    dataRolePaginate: state.reducerRole.dataRolePaginate,
    // CREATE
    createSuccess: state.reducerRole.createSuccess,
    createError: state.reducerRole.createError,
    // UPDATE
    updateSuccess: state.reducerRole.updateSuccess,
    updateError: state.reducerRole.updateError,
    // DELETE
    deleteSuccess: state.reducerRole.deleteSuccess,
    deleteError: state.reducerRole.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default withRouter(connect(mapStateToProps)(Roledata));
