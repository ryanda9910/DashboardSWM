import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Alert,
  // MODALS
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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

import Loader from "../../../components/Loader/Loader";
import s from "./Userdata.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataUser,
  createDataUser,
  deleteDataUser
} from "../../../actions/tables/user";
// distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// role
import { getDataRole } from "../../../actions/tables/role";
// react-js-pagination
import Pagination from "react-js-pagination";

class Userdata extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      role_id: null,
      isactive: false,
      name: "",
      slug: "",
      description: "",
      email: "",
      phone: "",
      password: "",
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
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }
  // LIFE CIRCLE
  componentDidMount() {
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataUserPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataUserPaginate.pages,
        limit: nextProps.dataUserPaginate.limit,
        total: nextProps.dataUserPaginate.total
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    // handle content per page
    if (this.props.dataUserPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CIRCLE
  
  // COUNT PAGE
  pageCount() {
    this.setState({
      pageCount: this.props.dataUserPaginate.pages
    });
  }
  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataUser(this.state.currentPage));
    this.props.dispatch(getDataDistributor());
    this.props.dispatch(getDataRole());
  }
  // react-js-pagination
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
  };

  // CREATE User
  doCreateUser = e => {
    e.preventDefault();
    let postData = {
      role_id: this.state.role_id,
      isactive: this.state.isactive === true ? "true" : "user",
      name: this.state.name,
      slug: this.state.slug,
      description: this.state.description,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      distributor_id: this.state.distributor_id
    };
    console.log(postData);
    this.props.dispatch(createDataUser(postData));
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
      this.props.dispatch(deleteDataUser(id));
      // this.onShowAlert();
      this.props.dispatch(getDataUser());
    }
  }

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
      this.props.dataUser.length > 0 ? (
        this.props.dataUser.map(item => {
          console.log(item);

          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
              <span className="badge btn-danger">FALSE</span>
            );
          return (
            <tr key={item._id}>
              <td>{item.role_id ? item.role_id.name : "-"}</td>
              {/* <td>{item.distributor_id.code}</td> */}
              {/* <td>{isactive}</td> */}
              <td>{isactive}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.description}</td>
              <td>{item.email}</td>
              {/* <td>{item.password}</td> */}
              <td>{item.phone}</td>
              <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
              <td>
                <Link
                  to={"/app/forms/editdatausers/" + item._id}
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
                    Data<span> User</span>
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
                          {/* <th>Password</th> */}
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
            <Form id="formCreateDataUser" onSubmit={this.doCreateUser}>
              {/* role_id */}
              <FormGroup>
                <Label for="role_id">Role ID</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="select"
                  name="role_id"
                  id="role_id"
                >
                  <option value={null}></option>
                  {dataRole.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
              </FormGroup>
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
              {/* slug */}
              <FormGroup>
                <Label for="slug">Slug</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="slug"
                  id="slug"
                  placeholder="Masukkan Slug"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* description */}
              <FormGroup>
                <Label for="description">Deskripsi</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Masukkan Deskripsi"
                />
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
              </FormGroup>
              {/* password */}
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukkan Password"
                />
              </FormGroup>
              {/* phone */}
              <FormGroup>
                <Label for="phone">Telepon </Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Masukkan Telepon"
                />
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                <Label for="distributor_id">Distributor ID </Label>
                <Input
                  required
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
    alertMessage: state.reducerUser.alertMessage,
    // GET
    getSuccess: state.reducerUser.getSuccess,
    getError: state.reducerUser.getError,
    dataUser: state.reducerUser.dataUser,
    dataUserPaginate: state.reducerUser.dataUserPaginate,
    // CREATE
    createSuccess: state.reducerUser.createSuccess,
    createError: state.reducerUser.createError,
    // UPDATE
    // updateSuccess: state.reducerUser.updateSuccess,
    // updateError: state.reducerUser.updateError,
    // DELETE
    deleteSuccess: state.reducerUser.deleteSuccess,
    deleteError: state.reducerUser.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // ROLE
    dataRole: state.reducerRole.dataRole
  };
}

export default withRouter(connect(mapStateToProps)(Userdata));
