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
import s from "./kelompokPelanggan.module.scss";
// react-js-pagination
import Pagination from "react-js-pagination";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataKelompokPelanggan,
  createDataKelompokPelanggan,
  deleteDataKelompokPelanggan
} from "../../../actions/tables/kelompokpelanggan";
// data distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// data tarif
import { getDataTarif } from "../../../actions/tables/tarif";

class kelompokPelanggan extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      parent_group: "",
      group: "",
      code: "",
      name: "",
      isactive: false,
      description: "",
      tarif_id: null,
      distributor_id: null,
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,

      //react-js-pagination
      pageCount: 0,
      currentPage: 1,
      limit: 0,
      total: 0,
      triggerPaginate: false
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }

  componentDidMount() {
    // GET data
    this.receiveData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataKelompokPelangganPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataKelompokPelangganPaginate.pages,
        limit: nextProps.dataKelompokPelangganPaginate.limit,
        total: nextProps.dataKelompokPelangganPaginate.total
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    if (
      this.props.dataKelompokPelangganPaginate.page !== this.state.currentPage
    ) {
      this.receiveData();
    }
  }
  pageCount() {
    this.setState({
      pageCount: this.props.dataKelompokPelangganPaginate.pages
    });
  }
  //RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataKelompokPelanggan(this.state.currentPage));
  }
  // react-js-pagination
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
  };
  // CREATE Tarif
  doCreateKelompokPelanggan = e => {
    e.preventDefault();
    let postData = {
      parent_group: this.state.parent_group,
      group: this.state.group,
      code: this.state.code,
      name: this.state.name,
      isactive: this.state.isactive,
      description: this.state.description,
      tarif_id: this.state.tarif_id,
      distributor_id: this.state.distributor_id
      // lat: this.state.lat,
      // long: this.state.long,
    };
    console.log(postData);
    this.props.dispatch(createDataKelompokPelanggan(postData));
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
      this.props.dispatch(deleteDataKelompokPelanggan(id));
    }
  }

  // onShowAlert = () => {
  //   this.setState(
  //     {
  //       showAlert: true
  //     },
  //     () => {
  //       window.setTimeout(() => {
  //         this.setState({
  //           showAlert: false,
  //           alertDestroy: false
  //         });
  //       }, 2000);
  //     }
  //   );
  // };

  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id]
    }));
    // GET data distributor
    this.props.dispatch(getDataDistributor());
    // GET data tarif
    this.props.dispatch(getDataTarif());
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const { modalCreate } = this.state;
    const { dataKelompokPelanggan, dataDistributor, dataTarif } = this.props;

    // create error
    const createError =
      this.props.createError === false ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.props.createError}</small>
        </div>
      );

    // search
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this)
          .val()
          .toLowerCase();
        $("#myTable tr").filter(function () {
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
      dataKelompokPelanggan.length > 0 ? (
        dataKelompokPelanggan.map(item => {
          console.log(item);
          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
              <span className="badge btn-danger">FALSE</span>
            );
          return (
            <tr key={item._id}>
              <td>{item.parent_group}</td>
              <td>{item.group}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{isactive}</td>
              <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
              <td>{item.tarif_id ? item.tarif_id.name : "-"}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={"/app/forms/editdatakelompokpelanggan/" + item._id}
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
                    Data <span> Kelompok Pelanggan </span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold"> Kelompok Pelanggan</span>
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
                          <th>Grup Parent</th>
                          <th>Grup</th>
                          <th>Kode</th>
                          <th>Nama</th>
                          <th>Status</th>
                          <th>ID Distributor</th>
                          <th>ID Tarif</th>
                          <th>Deskripsi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataKelompokPelanggan ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                  <Col lg={12} className="pt-3">
                    {/* react-js-pagination */}
                    <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={this.state.limit}
                      totalItemsCount={this.state.total}
                      pageRangeDisplayed={this.state.pageCount}
                      onChange={this.changeCurrentPage.bind(this)}
                    />
                  </Col>
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
              id="formCreateDataTarif"
              onSubmit={this.doCreateKelompokPelanggan}
            >
              {/* parent_group */}
              <FormGroup>
                <Label for="exampleParent">Parent Grup </Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="parent_group"
                  id="exampleParent"
                  placeholder=" Masukkan Parent Grup"
                />
              </FormGroup>
              {/* group */}
              <FormGroup>
                <Label for="exampleGroup">Grup</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="group"
                  id="exampleGroup"
                  placeholder="Masukkan Grup"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* code */}
              <FormGroup>
                <Label for="exampleKode">Kode</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="exampleKode"
                  placeholder="Masukkan Kode"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* name */}
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="exampleName"
                  placeholder="Masukkan Nama"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* Isactive */}
              <div className={s.root + " align-self-center"}>
                <FormGroup className="display-inline-block checkbox-ios">
                  <Label for="isactive" className="switch">
                    <Input
                      onChange={this.handleCreateChange}
                      type="checkbox"
                      id="isactive"
                      name="isactive"
                      className="ios"
                      label="Turn on this if True"
                    />
                    <i />
                    <Label for="isactive" className="pl-3">
                      Status
                    </Label>
                  </Label>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
              </div>

              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label>ID Distributor</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="select"
                  name="distributor_id"
                >
                  <option value={null}></option>
                  {dataDistributor.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* tarif_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label>ID Tarif</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="select"
                  name="tarif_id"
                >
                  <option value={null}></option>
                  {dataTarif.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* description */}
              <FormGroup>
                <Label for="exampleDesc">Deskripsi</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="description"
                  id="exampleDesc"
                  placeholder="Masukkan Deskripsi"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
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
    alertMessage: state.reducerKelompokPelanggan.alertMessage,
    // GET
    getSuccess: state.reducerKelompokPelanggan.getSuccess,
    getError: state.reducerKelompokPelanggan.getError,
    dataKelompokPelanggan: state.reducerKelompokPelanggan.dataKelompokPelanggan,
    dataKelompokPelangganPaginate:
      state.reducerKelompokPelanggan.dataKelompokPelangganPaginate,
    // CREATE
    createSuccess: state.reducerKelompokPelanggan.createSuccess,
    createError: state.reducerKelompokPelanggan.createError,
    // UPDATE
    updateSuccess: state.reducerKelompokPelanggan.updateSuccess,
    updateError: state.reducerKelompokPelanggan.updateError,
    // DELETE
    deleteSuccess: state.reducerKelompokPelanggan.deleteSuccess,
    deleteError: state.reducerKelompokPelanggan.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // DISTRIBUTOR
    dataTarif: state.reducerTarif.dataTarif
  };
}

export default withRouter(connect(mapStateToProps)(kelompokPelanggan));
