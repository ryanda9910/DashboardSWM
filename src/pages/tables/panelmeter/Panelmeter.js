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
import s from "./Panelmeter.module.scss";
// react-js-pagination
import Pagination from "react-js-pagination";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataPerangkat,
  createDataPerangkat,
  deleteDataPerangkat
} from "../../../actions/tables/perangkat";
// ambil distributor untuk create dan update
import { getDataDistributor } from "../../../actions/tables/distributor";

//ambil data pelanggan untuk create dan update
import { getDataPelanggan } from "../../../actions/tables/pelanggan";

class Panelmeter extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      costumer_id: "",
      code: "",
      tipe: "",
      model: "",
      manufaktur: "",
      lat: "",
      long: "",
      valve: "",
      status: "",
      distributor_id: null,
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,
      // react-js-pagination
      pageCount: 0,
      currentPage: 1,
      limit: 0,
      total: 0,
      triggerPaginate: false
    };
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }
  // LIFE CYCLE
  componentDidMount() {
    this.receiveData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPerangkatPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataPerangkatPaginate.pages,
        limit: nextProps.dataPerangkatPaginate.limit,
        total: nextProps.dataPerangkatPaginate.total
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    if (this.props.dataPerangkatPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CYCLE

  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataPerangkat(this.state.currentPage));
    this.props.dispatch(getDataDistributor());
    this.props.dispatch(getDataPelanggan());
  }
  // COUNT PAGE
  pageCount() {
    this.setState({
      pageCount: this.props.dataPerangkatPaginate.pages
    });
  }
  // CURRENT PAGE
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
  };

  // MODAL
  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id]
    }));
  }

  // CREATE
  doCreatePerangkat = e => {
    e.preventDefault();
    let postData = {
      // API DATA NOT FIX YET
      costumer_id: this.state.costumer_id,
      code: this.state.code,
      // tipe: this.state.tipe,
      serial_number: this.state.serial_number,
      model: this.state.model,
      manufacture: this.state.manufaktur,
      lat: this.state.lat,
      long: this.state.long,
      valve: this.state.valve === true ? "true" : "false",
      status: this.state.status === true ? "true" : "false",
      distributor_id: this.state.distributor_id
    };
    console.log(postData);
    this.props.dispatch(createDataPerangkat(postData));
    this.setState({ modalCreate: false });
  };
  // DELETE
  handleDelete(id) {
    let confirm = window.confirm("delete data, are you sure?");
    console.log(confirm);
    if (confirm) {
      this.props.dispatch(deleteDataPerangkat(id));
      this.onShowAlert();
      this.props.dispatch(getDataPerangkat());
    }
  }
  // TRACK CHANGE
  handleCreateChange = e => {
    console.log(e.target);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(this.state);
    console.log(this.props);

    // jika error karena 401 atau lainnya, tendang user dengan hapus cookie
    // if(this.props.getError){
    //   return document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // }

    const { modalCreate } = this.state;
    const { dataPelanggan, dataDistributor } = this.props;

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
      this.props.dataPerangkat.length > 0 ? (
        this.props.dataPerangkat.map(item => {
          console.log(item);
          const status = item.status ? (
            <span className="badge btn-success">OPEN</span>
          ) : (
              <span className="badge btn-danger">CLOSE</span>
            );
          const valve = item.valve ? (
            <span className="badge btn-success">ON</span>
          ) : (
              <span className="badge btn-danger">OFF</span>
            );
          // const isactive = item.isactive ? (
          //   <span className="badge btn-success">TRUE</span>
          // ) : ( 
          //   <span className="badge btn-danger">FALSE</span>
          // );
          return (
            <tr key={item._id}>
              {/* API DATA NOT FIX YET  */}
              <td>{item.costumer_id}</td>
              <td>{item.code}</td>
              <td>{item.tipe}</td>
              <td>{item.model}</td>
              <td>{item.manufacture}</td>
              <td>{item.lat}</td>
              <td>{item.long}</td>
              <td>{valve}</td>
              <td>{status}</td>
              <td>{item.distributor_id.name}</td>
              <td>
                <Link
                  to={"/app/forms/editdataperangkat/" + item._id}
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
                    Data<span>Perangkat</span>
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
                  Data <span className="fw-semi-bold">Perangkat</span>
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
                          <th>ID Costumer</th>
                          <th>Kode</th>
                          <th>Tipe</th>
                          <th>Model</th>
                          <th>Manufaktur</th>
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Valve</th>
                          <th>Status</th>
                          <th>ID Distributor</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {this.props.dataPerangkat ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                  <Col lg={12} className="pt-3">
                    {/* react-js-pagination */}
                    <div className={s.rootPaginate + " justify-content-center d-flex "}>
                      <Pagination
                        activePage={this.state.currentPage}
                        itemsCountPerPage={this.state.limit}
                        totalItemsCount={this.state.total}
                        pageRangeDisplayed={this.state.pageCount}
                        onChange={this.changeCurrentPage.bind(this)}
                      />
                    </div>
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
              id="formCreateDataPerangkat"
              onSubmit={this.doCreatePerangkat}
            >
              {/* code */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleSelect">Costumer ID </Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="select"
                  name="costumer_id"
                  id="exampleSelect"
                >
                  {dataPelanggan.map(item => {
                    return <option value={item._id}>{item.code}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* nama */}
              <FormGroup>
                <Label for="exampleCode">Kode</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="exampleCode"
                  placeholder="Masukkan Kode"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleTipe">Tipe</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="tipe"
                  id="exampleTipe"
                  placeholder="Masukkan Tipe"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleModel">Model</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="model"
                  id="exampleModel"
                  placeholder="Masukkan Model"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleManufaktur">Manufaktur</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="manufaktur"
                  id="exampleManufaktur"
                  placeholder="Masukkan Manufaktur"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleKode">Latitude</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="lat"
                  id="exampleLat"
                  placeholder="Masukkan Latitude"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleLong">Longitude</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="long"
                  id="exampleLong"
                  placeholder="Masukkan Longitude"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* Valve */}
              <div className={s.root}>
                <FormGroup className="display-inline-block checkbox-ios pt-4">
                  <Label for="valve" className="switch">
                    <Input
                      onChange={this.handleCreateChange}
                      type="checkbox"
                      id="valve"
                      name="valve"
                      className="ios"
                      label="Turn on this if True"
                    />
                    <i />
                    <Label for="valve" className="pl-3">
                      Valve
                    </Label>
                  </Label>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
              </div>
              {/* status*/}
              <div className={s.root}>
                <FormGroup className="display-inline-block checkbox-ios">
                  <Label for="status" className="switch">
                    <Input
                      onChange={this.handleCreateChange}
                      type="checkbox"
                      id="status"
                      name="status"
                      className="ios"
                      label="Turn on this if True"
                    />
                    <i />
                    <Label for="status" className="pl-3">
                      Status
                    </Label>
                  </Label>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
              </div>

              {/* <FormGroup>
                <Label for="exampleIsActive">Valve</Label>
                <CustomInput
                  onChange={this.handleCreateChange}
                  type="switch"
                  id="exampleValve"
                  name="valve"
                  label="Turn on this if True"
                />
              </FormGroup> */}
              {/* <FormGroup>
                <Label for="exampleIsActive">Status</Label>
                <CustomInput
                  onChange={this.handleCreateChange}
                  type="switch"
                  id="exampleStatus"
                  name="status"
                  label="Turn on this if True"
                />
              </FormGroup> */}
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleSelect">Distributor ID </Label>
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
    alertMessage: state.reducerPerangkat.alertMessage,
    // GET
    getSuccess: state.reducerPerangkat.getSuccess,
    getError: state.reducerPerangkat.getError,
    dataPerangkat: state.reducerPerangkat.dataPerangkat,
    dataPerangkatPaginate: state.reducerPerangkat.dataPerangkatPaginate,
    // CREATE
    createSuccess: state.reducerPerangkat.createSuccess,
    createError: state.reducerPerangkat.createError,
    // UPDATE
    updateSuccess: state.reducerPerangkat.updateSuccess,
    updateError: state.reducerPerangkat.updateError,
    // DELETE
    deleteSuccess: state.reducerPerangkat.deleteSuccess,
    deleteError: state.reducerPerangkat.deleteError,
    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // PELANGGAN
    dataPelanggan: state.reducerPelanggan.dataPelanggan
  };
}

export default withRouter(connect(mapStateToProps)(Panelmeter));
