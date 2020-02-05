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
  FormFeedback,
  FormText
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
import Loader from "../../../components/Loader/Loader";
import s from "./Tarif.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataTarif,
  createDataTarif,
  deleteDataTarif
} from "../../../actions/tables/tarif";
// ambil distributor untuk create dan update
import { getDataDistributor } from "../../../actions/tables/distributor";
// react-js-pagination
import Pagination from "react-js-pagination";

class Tarif extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      name: "",
      distributor_id: null,
      isactive: false,
      description: "",
      emptyDistributorIdMsg: "",
      emptyCreateName: "",
      emptyCreateDescription: "",
      // ALERT
      showAlert: false,
      alertMessage: "data get action",
      alertBackground: "success",
      // MODALS
      modalCreate: false,
      // react-js-pagination
      pageCount: 0,
      limit: 0,
      total: 0,
      currentPage: 1,
      triggerPaginate: false
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.doCreateTarif = this.doCreateTarif.bind(this);
    // this.onShowAlert = this.onShowAlert.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // masih race condition, harusnya pas modals muncul aja
    // GET data
    this.receiveData();
  }

  componentWillReceiveProps() {
    // ALERT
    if (this.props.deleteSuccess) {
      this.setState({
        alertMessage: "delete success"
      });
      return this.onShowAlert();
    }
    if (this.props.deleteError) {
      this.setState({
        alertMessage: "delete error",
        alertBackground: "danger"
      });
      return this.onShowAlert();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataTarifPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataTarifPaginate.pages,
        limit: nextProps.dataTarifPaginate.limit,
        total: nextProps.dataTarifPaginate.total
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    if (this.props.dataTarifPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
    // console.log(this.props);
    // console.log(prevProps);
    // console.log(prevState.currentPage);
    // console.log(this.state.currentPage);
  }
  pageCount() {
    this.setState({
      pageCount: this.props.dataTarifPaginate.pages
    });
  }
  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataTarif(this.state.currentPage));
  }
  // handlePageClick = data => {
  //   const selectedPage = data.selected + 1;
  //   const offset = selectedPage * this.state.perPage;
  //   this.setState({ currentPage: selectedPage, offset: offset });
  //   //
  // this.props.dispatch(getDataArea(this.state.currentPage));
  // }
  // react-js-pagination
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
    //fetch a data
    //or update a query to get data
    // this.props.dispatch(getDataArea(this.state.currentPage));
    // this.receiveData();
  };

  // CREATE Tarif
  doCreateTarif = e => {
    let postData = {
      name: this.state.name,
      distributor_id: this.state.distributor_id,
      isactive: this.state.isactive,
      description: this.state.description
    };
    console.log(postData);
    e.preventDefault();
    // CREATE VALIDASI
    if (
      this.state.distributor_id === null ||
      this.state.distributor_id === ""
    ) {
      this.setState({
        emptyDistributorIdMsg: "wajib memasukan distributor!"
      });
      return false;
    } else if (this.state.name === "") {
      this.setState({
        emptyCreateName: "Field name harus diisi."
      });
    } else if (this.state.description === "") {
      this.setState({
        emptyCreateDescription: "Field description harus diisi."
      });
    } else {
      e.preventDefault();
      this.props.dispatch(createDataTarif(postData));
      this.setState({
        modalCreate: false,
        emptyDistributorIdMsg: ""
      });
    }
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
      this.props.dispatch(deleteDataTarif(id));
      // this.props.dispatch(getDataTarif());
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
            showAlert: false
            // alertMessage: ''
          });
        }, 2000);
      }
    );
  };

  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id],
      // message validasi akan hilang setiap kali toggle() di klik
      emptyDistributorIdMsg: ""
    }));
    // GET data distributor
    this.props.dispatch(getDataDistributor());
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
      this.props.dataTarif.length > 0 ? (
        this.props.dataTarif.map(item => {
          console.log(item);
          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
              <span className="badge btn-danger">FALSE</span>
            );
          return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
              <td>{isactive}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={"/app/forms/editdatatarifpelanggan/" + item._id}
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
                    Data<span> Tarif Pelanggan </span>
                  </li>
                </ol>
                {/* alert */}
                {/* <Alert
                  color={this.state.alertBackground}
                  className={cx(s.promoAlert, {
                    [s.showAlert]: this.state.showAlert
                  })}
                >
                  {this.state.alertMessage === '' ? null : this.state.alertMessage}
                </Alert> */}
                {/* handle 401 */}
                {/* <button onClick={() => document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'}>delete cookie</button> */}
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold"> Tarif Pelanggan</span>
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
                  color="default"
                  outline
                  onClick={() => this.toggle("modalCreate")}
                >
                  <i className="fa fa-plus mr-xs mb-xs" />
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
                          <th>Nama</th>
                          <th>ID Distributor</th>
                          <th>Status</th>
                          <th>Deskripsi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataTarif ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                  {/* react-pagination-library */}
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
            <Form id="formCreateDataTarif" onSubmit={this.doCreateTarif}>
              {/* name */}
              <FormGroup>
                <Label for="exampleNama">Nama</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="exampleNama"
                  placeholder="Nama"
                />
                <FormText className="text-danger">
                  {this.state.emptyCreateName === ""
                    ? null
                    : this.state.emptyCreateName}
                </FormText>
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleKode">ID Distributor</Label>
                <Input
                  required
                  value={this.state.distributor_id}
                  onChange={this.handleCreateChange}
                  name="distributor_id"
                  type="select"
                  id="exampleSelect"
                >
                  <option value={null}></option>
                  {dataDistributor.map(item => {
                    console.log(item._id);
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                <FormText className="text-danger">
                  {this.state.emptyDistributorIdMsg === ""
                    ? null
                    : this.state.emptyDistributorIdMsg}
                </FormText>
              </FormGroup>
              {/* Isactive */}
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
                  id="exampleDeskripsi"
                  placeholder="Deskripsi"
                />
                <FormText className="text-danger">
                  {this.state.emptyCreateDescription === ""
                    ? null
                    : this.state.emptyCreateDescription}
                </FormText>
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
    // alertMessage: state.reducerTarif.alertMessage,
    // GET
    getSuccess: state.reducerTarif.getSuccess,
    getError: state.reducerTarif.getError,
    dataTarif: state.reducerTarif.dataTarif,
    dataTarifPaginate: state.reducerTarif.dataTarifPaginate,
    // CREATE
    createSuccess: state.reducerTarif.createSuccess,
    createError: state.reducerTarif.createError,
    // DELETE
    deleteSuccess: state.reducerTarif.deleteSuccess,
    deleteError: state.reducerTarif.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default withRouter(connect(mapStateToProps)(Tarif));
