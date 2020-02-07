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
} from "reactstrap";
import $ from "jquery";
import {
  Link,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Panelmeter extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      customer_id: null,
      distributor_id: null,
      code: "",
      valves: [],
      status: "",
      signal: "",
      battery_voltage: "",
      lat: "",
      long: "",
      serial_number: "",
      model: "",
      manufacture: "",
      data_com: "",
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
      customer_id: this.state.customer_id,
      distributor_id: this.state.distributor_id,
      code: this.state.code,
      valve: this.state.valve === true ? "true" : "false",
      status: this.state.status === true ? "true" : "false",
      signal: this.state.signal,
      battery_voltage: this.state.battery_voltage,
      lat: this.state.lat,
      long: this.state.long,
      serial_number: this.state.serial_number,
      model: this.state.model,
      manufacture: this.state.manufacture,
      data_com: this.state.data_com,

    };
    console.log(postData);
    this.props.dispatch(createDataPerangkat(postData));
    this.setState({ modalCreate: false });
  // ALERT
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Berhasil',
      text: 'Data baru ditambahkan.',
      icon: 'success',
    }).then(result => {
      console.log(result)
    })
  };
  
// DELETE
  handleDelete(id) {
    // ALERT
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58d777',
      cancelButtonColor: '#f45722',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result.value);
      if (result.value) {
        MySwal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        )
        this.props.dispatch(deleteDataPerangkat(id));
        // handle kondisi ketika contoh: page 2 data nya tinggal 1 dan ketika di hapus di page 2 selalu loading harusnya langsung ke page 1
        // console.log(this.state.pageCount);
        // console.log(this.state.currentPage);
        // console.log(this.props.dataAreaPaginate.pages);
        // console.log(this.props.dataAreaPaginate.page);
        // if(this.state.pageCount < this.state.currentPage){
        //    this.props.dispatch(getDataArea(this.state.pageCount));
        // }
      }
    })
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

  // TRACK CHANGE VALVE
  handleChange = e => {
    console.log(e.target);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      valves: [
        ...this.state.valves,
        {
          name: name,
          valve: value
        }
      ]
    });
  };
  // POST VALVE

  
  render() {
    console.log(this.state);
    console.log(this.props);
    
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
          const status = item.status ? (
            <span className="badge btn-success">AKTIF</span>
          ) : (
              <span className="badge btn-danger">TIDAK AKTIF</span>
            );
          const valve = item.valve ? (
            <a onClick={() => alert(`ok ${item._id}`)}>
              <span className="badge btn-success">ON</span>
            </a>
          ) : (
            <a onClick={() => alert(`ok ${item._id}`)}>
              <span className="badge btn-danger">OFF</span>
            </a>
          );
          // const isactive = item.isactive ? (
          //   <span className="badge btn-success">TRUE</span>
          // ) : ( 
          //   <span className="badge btn-danger">FALSE</span>
          // );
          return (
            <tr key={item._id}>
              {/* API DATA NOT FIX YET  */}
              <td>{item.customer_id.name}</td>
              <td>{item.distributor_id.name}</td>
              <td>{item.code}</td>
              <td>{valve}</td>
              <td>{item.data_com}</td>
              {/* <td>
                <FormGroup className="checkbox-ios">
                  <Label key={item._id} for="valve" className="switch">
                    <Input
                      onChange={this.handleChange}
                      type="checkbox"
                      id="valve"
                      name={item._id}
                      className="ios"
                    />
                    <i />
                  </Label>
                </FormGroup>
              </td> */}
              <td>{status}</td>
              <td>{item.signal}</td>
              <td>{item.battery_voltage}</td>
              <td>{item.lat}</td>
              <td>{item.long}</td>
              <td>{item.model}</td>
              <td>{item.serial_number}</td>
              <td>{item.manufacture}</td>
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
                          <th>ID Distributor</th>
                          <th>Kode</th>
                          <th>Valve</th>
                          <th>Data Com</th>
                          <th>Status</th>
                          <th>Sinyal</th>
                          <th>Voltase Baterai</th>
                          <th>Garis Lintang</th>
                          <th>Garis Bujur</th>
                          <th>Model</th>
                          <th>Nomor Serial</th>
                          <th>Manufaktur</th>
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
              {/* customer_id */}
              <FormGroup>
                <Label for="customer_id">Costumer ID </Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="select"
                  name="customer_id"
                  id="customer_id"
                >
                  <option value={null}></option>
                  {dataPelanggan.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                <Label for="distributor_id">Distributor ID </Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="select"
                  name="distributor_id"
                  id="distributor_id"
                >
                  <option value={null}></option>
                  {dataDistributor.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* code */}
              <FormGroup>
                <Label for="code">Kode</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Masukkan Kode"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* valve */}
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
              {/* signal */}
              <FormGroup>
                <Label for="signal">Sinyal</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="signal"
                  id="signal"
                  placeholder="Masukkan Sinyal"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* battery_voltage */}
              <FormGroup>
                <Label for="battery_voltage">Voltase Baterai</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="battery_voltage"
                  id="battery_voltage"
                  placeholder="Masukkan Voltase Baterai"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* lat */}
              <FormGroup>
                <Label for="lat">Latitude</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="lat"
                  id="lat"
                  placeholder="Masukkan Garis Lintang"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* long */}
              <FormGroup>
                <Label for="long">Longitude</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="long"
                  id="long"
                  placeholder="Masukkan Garis Bujur"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* model */}
              <FormGroup>
                <Label for="model">Model</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Masukkan Model"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* serial_number */}
              <FormGroup>
                <Label for="serial_number">Nomor Serial</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="serial_number"
                  id="serial_number"
                  placeholder="Masukkan Nomor Serial"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* manufacture */}
              <FormGroup>
                <Label for="manufacture">Manufaktur</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="manufacture"
                  id="manufacture"
                  placeholder="Masukkan Manufaktur"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* manufacture */}
              <FormGroup>
                <Label for="data_com">Data Comunication</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="data_com"
                  id="data_com"
                  placeholder="Masukkan Data Com"
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