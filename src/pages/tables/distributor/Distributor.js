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
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
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
import s from "./Distributor.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
// import //   getDataKelompokPelanggan
// //   createDataKelompokPelanggan,
// //   deleteDataKelompokPelanggan
// "../../../actions/tables/kelompokpelanggan";
// data distributor
import {
  getDataDistributor,
  createDataDistributor,
  deleteDataDistributor
} from "../../../actions/tables/distributor";
// data tarif
// import { getDataTarif } from "../../../actions/tables/tarif";

class Distributor extends React.Component {
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
      contact: "",
      description: "",
      phone: "",
      email: "",
      tipe: "",
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
    this.props.dispatch(getDataDistributor());
  }

  // CREATE Tarif
  doCreate = e => {
    e.preventDefault();
    let postData = {
      code: this.state.code,
      isactive: this.state.isactive === true ? "true" : "false",
      name: this.state.name,
      contact: this.state.contact,
      description: this.state.description,
      phone: this.state.phone,
      email: this.state.email,
      tipe: this.state.tipe
      // lat: this.state.lat,
      // long: this.state.long,
    };
    console.log(postData);
    this.props.dispatch(createDataDistributor(postData));
    this.setState({
      modalCreate: false
    });
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
      this.props.dispatch(deleteDataDistributor(id));
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
    //     // GET data distributor
    //     this.props.dispatch(getDataDistributor());
    //     // GET data tarif
    //     this.props.dispatch(getDataTarif());
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const { modalCreate } = this.state;
    const { dataDistributor } = this.props;

    // create error
    // const createError =
    //   this.props.createError === false ? null : (
    //     <div className="text-center w-100 py-2">
    //       <small className="text-white">{this.props.createError}</small>
    //     </div>
    //   );

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
    const tableData = dataDistributor.length > 0 ? (
      dataDistributor.map(item => {
        console.log(item);
        const isactive = item.isactive ? (
          <span className="badge btn-success">TRUE</span>
        ) : (
          <span className="badge btn-danger">FALSE</span>
        );
        return (
          <tr>
            <td>{item.code}</td>
            <td>{isactive}</td>
            <td>{item.name}</td>
            <td>{item.contact}</td>
            <td>{item.description}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.tipe}</td>
            <td>
              <Link
                to={"/app/forms/editdatadistributor/" + item._id}
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
                    Data<span>Distributor</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Distributor</span>
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
                          <th>Kode</th>
                          <th>Status</th>
                          <th>Nama</th>
                          <th>Kontak</th>
                          <th>Deskripsi</th>
                          <th>Telepon</th>
                          <th>Email</th>
                          <th>Tipe</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataDistributor ? tableData : null}
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
            <Form id="formCreateDataTarif" onSubmit={this.doCreate}>
              {/* code */}
              <FormGroup>
                <Label for="code">Kode</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Masukkan Kode"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* isactive */}
              {/* isactive */}
              <div className={s.root}>
                <FormGroup className="display-inline-block checkbox-ios">
                  <Label for="exampleActive" className="switch">
                    <Input
                      required
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
              {/* contact */}
              <FormGroup>
                <Label for="contact">Kontak</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Masukkan Kontak"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* description */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="description">Deskripsi</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Masukkan Deskripsi"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* phone */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="phone">Telepon</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Masukkan Telepon"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* email */}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Masukkan Email"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* tipe */}
              <FormGroup>
                <Label for="tipe">Tipe</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="tipe"
                  id="tipe"
                  placeholder="Masukkan Tipe"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>

              {/* show ERROR */}
              {/* <FormGroup row className="bg-danger">
                {createError}
              </FormGroup> */}

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
    alertMessage: state.reducerDistributor.alertMessage,
    // GET
    getSuccess: state.reducerDistributor.getSuccess,
    getError: state.reducerDistributor.getError,
    // dataKelompokPelanggan: state.reducerKelompokPelanggan.dataKelompokPelanggan,
    // // CREATE
    // createSuccess: state.reducerKelompokPelanggan.createSuccess,
    // createError: state.reducerKelompokPelanggan.createError,
    // // UPDATE
    // updateSuccess: state.reducerKelompokPelanggan.updateSuccess,
    // updateError: state.reducerKelompokPelanggan.updateError,
    // // DELETE
    // deleteSuccess: state.reducerKelompokPelanggan.deleteSuccess,
    // deleteError: state.reducerKelompokPelanggan.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // DISTRIBUTOR
    dataTarif: state.reducerTarif.dataTarif
  };
}

export default withRouter(connect(mapStateToProps)(Distributor));
