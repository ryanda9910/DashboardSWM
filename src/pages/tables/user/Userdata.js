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
  Input,
  CustomInput
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
import s from "./Userdata.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataUser,
  createDataUser,
  deleteDataUser
} from "../../../actions/tables/user";
// ambil distributor untuk create dan update
import { getDataDistributor } from "../../../actions/tables/distributor";

class Userdata extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      role_id: "",
      isactive: "",
      name: "",
      slug: "",
      description: "",
      email: "",
      phone: "",
      password: "",
      distributor_id: "",
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }

  componentDidMount() {
    // masih race condition, harusnya pas modals muncul aja
    // GET data
    this.props.dispatch(getDataUser());
    // GET data distributor
    // if(this.state.modalCreate === true){
    this.props.dispatch(getDataDistributor());
    // }

    // ALERT
    // return this.props.alertMessage ? this.onShowAlert() : null;
  }

  // CREATE User
  doCreateUser = e => {
    e.preventDefault();
    let postData = {
      role_id: this.state.role_id,
      isactive: this.state.isactive,
      name: this.state.name,
      slug: this.state.slug,
      description: this.state.description,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.phone,
      distributor_id: this.state.distributor_id
    };
    console.log(postData);
    // this.props.dispatch(createDataUser(postData))
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
      this.props.dispatch(deleteDataUser(id));
      this.onShowAlert();
      this.props.dispatch(getDataUser());
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

  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id]
    }));
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    // jika error karena 401 atau lainnya, tendang user dengan hapus cookie
    // if(this.props.getError){
    //   return document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // }

    const { modalCreate } = this.state;
    const { createSuccess, dataDistributor } = this.props;

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
      this.props.length > 0 ? (
        this.props.dataUser.map(item => {
          console.log(item);

          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
            <span className="badge btn-danger">FALSE</span>
          );
          return (
            <tr>
              <td>{item.role_id}</td>
              {/* <td>{item.distributor_id.code}</td> */}
              {/* <td>{isactive}</td> */}
              <td>{isactive}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.description}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.distributor_id.name}</td>
              <td>
                <Link
                  to={"/app/forms/editdatauser/" + item._id}
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
                    Data<span>User</span>
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
                  Data <span className="fw-semi-bold">User</span>
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
                  <div className="table-responsive">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th>Role ID</th>
                          <th>Status</th>
                          <th>Nama</th>
                          <th>Slug</th>
                          <th>Deskripsi</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>ID Distributor</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataUser ? tableData : null}
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
            <Form id="formCreateDataUser" onSubmit={this.doCreateUser}>
              {/* code */}
              <FormGroup>
                <Label for="exampleNama">Role ID </Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="role_id"
                  id="exampleRole"
                  placeholder=" Masukkan Role_id"
                />
              </FormGroup>
              {/* nama */}
              <FormGroup>
                <Label for="exampleKode">Is Active</Label>
                <CustomInput
                  onChange={this.handleCreateChange}
                  type="switch"
                  id="exampleIsActive"
                  name="isactive"
                  label="Turn on this if True"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Nama</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="exampleName"
                  placeholder="Masukkan Nama"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Slug</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="slug"
                  id="exampleSlug"
                  placeholder="Masukkan Slug"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Deskripsi</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="description"
                  id="exampleDescription"
                  placeholder="Masukkan Deskripsi"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Email</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="email"
                  id="exampleEmail"
                  placeholder="Masukkan Email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Telepon </Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="phone"
                  id="examplePhone"
                  placeholder="Masukkan Telepon"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Distributor ID </Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="select"
                  name="distributor_id"
                  id="exampleSelect"
                >
                  {dataDistributor.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
              </FormGroup>

              {/* show ERROR */}
              <FormGroup row className="bg-danger">
                {createError}
              </FormGroup>

              <ModalFooter>
                <Button color="dark" onClick={() => this.toggle("modalCreate")}>
                  Close
                </Button>
                {/* craete */}
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
    alertMessage: state.reducerUser.alertMessage,
    // GET
    getSuccess: state.reducerUser.getSuccess,
    getError: state.reducerUser.getError,
    dataUser: state.reducerUser.dataUser,
    // CREATE
    createSuccess: state.reducerUser.createSuccess,
    createError: state.reducerUser.createError,
    // UPDATE
    updateSuccess: state.reducerUser.updateSuccess,
    updateError: state.reducerUser.updateError,
    // DELETE
    deleteSuccess: state.reducerUser.deleteSuccess,
    deleteError: state.reducerUser.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default withRouter(connect(mapStateToProps)(Userdata));
