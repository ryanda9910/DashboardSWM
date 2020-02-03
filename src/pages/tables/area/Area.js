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
import s from "./Area.module.scss";
// paginate
import ReactPaginate from "react-paginate";
// react-pagination-library
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataArea,
  createDataArea,
  deleteDataArea
} from "../../../actions/tables/area";

// DISTRIBUTOR
import { getDataDistributor } from "../../../actions/tables/distributor";

class Area extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      code: "",
      name: "",
      distributor_id: "",
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,
      // PAGINATE
      // offset: 0,
      // perPage: 25,
      // pageCount: 0,
      // currentPage: 0,
      // react-pagination-library
      pageCount: 0,
      currentPage: 1,
      triggerPaginate: false
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }

  componentDidMount() {
    // masih race condition, harusnya pas modals muncul aja
    // GET data
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    //
    this.setState({
      pageCount: nextProps.dataAreaPaginate.pages
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataAreaPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
    // console.log(this.props);
    // console.log(prevProps);
    // console.log(prevState.currentPage);
    // console.log(this.state.currentPage);
  }
  pageCount() {
    this.setState({
      pageCount: this.props.dataAreaPaginate.pages
    });
  }
  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataArea(this.state.currentPage));
  }
  // handlePageClick = data => {
  //   const selectedPage = data.selected + 1;
  //   const offset = selectedPage * this.state.perPage;
  //   this.setState({ currentPage: selectedPage, offset: offset });
  //   //
  // this.props.dispatch(getDataArea(this.state.currentPage));
  // }
  // react-pagination-library
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
    //fetch a data
    //or update a query to get data
    // this.props.dispatch(getDataArea(this.state.currentPage));
    // this.receiveData();
  };

  // CREATE Tarif
  doCreateArea = e => {
    e.preventDefault();
    let postData = {
      code: this.state.code,
      name: this.state.name,
      distributor_id: this.state.distributor_id
    };
    console.log(postData);
    this.props.dispatch(createDataArea(postData));
    this.setState({
      modalCreate: false,
      emptyDistributorIdMsg: ""
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
      this.props.dispatch(deleteDataArea(id));
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
    // GET data distributor
    // if(this.state.modalCreate === true){
    this.props.dispatch(getDataDistributor());
    // }
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const { modalCreate } = this.state;
    const { dataArea, dataDistributor } = this.props;

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
      dataArea.length > 0 ? (
        dataArea.map(item => {
          // console.log(item);
          return (
            <tr key={item._id}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
              <td>
                <Link
                  to={"/app/forms/editdataarea/" + item._id}
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
                    Data<span> Area</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Area</span>
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
                          <th>Nama</th>
                          <th>ID Distributor</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {/* eslint-disable */}
                        {dataArea ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                  <Col lg={12}>
                    {/* react-paginate */}
                    {/* <ReactPaginate
                      previousLabel={"← Previous"}
                      nextLabel={"Next →"}
                      breakLabel={<span className="gap">...</span>}
                      pageCount={this.state.pageCount}
                      onPageChange={this.handlePageClick}
                      forcePage={this.state.currentPage}
                      containerClassName={"pagination"}
                      previousLinkClassName={"previous_page"}
                      nextLinkClassName={"next_page"}
                      disabledClassName={"disabled"}
                      activeClassName={"active"}
                    /> */}
                    {/* react-pagination-library */}
                    <Pagination
                      currentPage={this.state.currentPage}
                      totalPages={this.state.pageCount}
                      changeCurrentPage={this.changeCurrentPage}
                      theme="bottom-border"
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
            <Form id="formCreateDataTarif" onSubmit={this.doCreateArea}>
              {/* code */}
              <FormGroup>
                <Label for="exampleNama">Kode</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="exampleCode"
                  placeholder=" Masukkan Kode"
                />
              </FormGroup>
              {/* nama */}
              <FormGroup>
                <Label for="exampleKode">Nama</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="exampleNama"
                  placeholder="Masukkan Nama Area"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleKode">ID Distributor</Label>
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
    alertMessage: state.reducerArea.alertMessage,
    // GET
    getSuccess: state.reducerArea.getSuccess,
    getError: state.reducerArea.getError,
    dataArea: state.reducerArea.dataArea,
    dataAreaPaginate: state.reducerArea.dataAreaPaginate,
    // CREATE
    createSuccess: state.reducerArea.createSuccess,
    createError: state.reducerArea.createError,
    // UPDATE
    updateSuccess: state.reducerArea.updateSuccess,
    updateError: state.reducerArea.updateError,
    // DELETE
    deleteSuccess: state.reducerArea.deleteSuccess,
    deleteError: state.reducerArea.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default withRouter(connect(mapStateToProps)(Area));
