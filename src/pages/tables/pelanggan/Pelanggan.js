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
import s from "./Pelanggan.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataPelanggan,
  createDataPelanggan,
  deleteDataPelanggan
} from "../../../actions/tables/pelanggan";
// data distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// data kelompok pelanggan
import { getDataKelompokPelanggan } from "../../../actions/tables/kelompokpelanggan";
// data area
import { getDataArea } from "../../../actions/tables/area";

// react-js-pagination
import Pagination from "react-js-pagination";

// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// table-bootstrap-table2
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport  } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

class Pelanggan extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      customer_group_id: null,
      name: "",
      code: "",
      email: "",
      address: "",
      phone: "",
      status: "",
      notes: "",
      distributor_id: null,
      area_id: null,
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,
      // EMPTY DATA
      emptyData: "",
      // react-js-pagination
      pageCount: 0,
      currentPage: 1,
      limit: 0,
      total: 0,
      triggerPaginate: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // LIFE CYCLE
  componentDidMount() {
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPelangganPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataPelangganPaginate.pages,
        limit: nextProps.dataPelangganPaginate.limit,
        total: nextProps.dataPelangganPaginate.total,
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    if (this.props.dataPelangganPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CYCLE

  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataPelanggan(this.state.currentPage));
    this.props.dispatch(getDataDistributor());
    this.props.dispatch(getDataKelompokPelanggan());
    this.props.dispatch(getDataArea());
  }
  // CURRENT PAGE
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
  };
  // COUNT PAGE
  pageCount() {
    this.setState({
      pageCount: this.props.dataPelangganPaginate.pages
    });
  }

  // CREATE
  doCreatePelanggan = e => {
    e.preventDefault();
    let postData = {
      customer_group_id: this.state.customer_group_id,
      name: this.state.name,
      code: this.state.code,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      status: this.state.status,
      notes: this.state.notes,
      distributor_id: this.state.distributor_id,
      area_id: this.state.area_id
    };
    // console.log(postData);
    this.props.dispatch(createDataPelanggan(postData));
    this.setState({
      modalCreate: false
    });
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
        this.props.dispatch(deleteDataPelanggan(id));
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
  handleChange = e => {
    console.log(e.target);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  // MODAL
  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id]
    }));
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const { modalCreate } = this.state;
    const {
      dataArea,
      dataDistributor,
      dataKelompokPelanggan,
      dataPelanggan
    } = this.props;

    // create error
    const createError =
      this.props.createError === false ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.props.createError}</small>
        </div>
      );

    // search
    // $(document).ready(function () {
    //   $("#myInput").on("keyup", function () {
    //     var value = $(this)
    //       .val()
    //       .toLowerCase();
    //     $("#myTable tr").filter(function () {
    //       $(this).toggle(
    //         $(this)
    //           .text()
    //           .toLowerCase()
    //           .indexOf(value) > -1
    //       );
    //     });
    //   });
    // });

    // // table data
    // const tableData =
    //   this.props.dataPelanggan.length > 0 ? (
    //     this.props.dataPelanggan.map(item => {
    //       console.log(item);
    //       // const isactive = item.isactive ? (
    //       //   <span className="badge btn-success">TRUE</span>
    //       // ) : (
    //       //   <span className="badge btn-danger">FALSE</span>
    //       // );
    //       return (
    //         <tr key={item._id}>
    //           {/* <td>{item.distributor_id.name}</td> */}
    //           {/* <td>{isactive}</td> */}
    //           <td>{item.name}</td>
    //           <td>{item.code}</td>
    //           <td>
    //             {item.customer_group_id ? item.customer_group_id.name : "-"}
    //           </td>
    //           <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
    //           <td>{item.area_id ? item.area_id.name : "-"}</td>
    //           <td>{item.email}</td>
    //           <td>{item.address}</td>
    //           <td>{item.phone}</td>
    //           <td>{item.status}</td>
    //           <td>{item.notes}</td>
    //           <td>
    //             <Link
    //               to={"/app/forms/editdatapelanggan/" + item._id}
    //               className="mr-1"
    //             >
    //               <span className="text-success">
    //                 <i className="far fa-edit"></i>
    //                 Ubah
    //               </span>
    //             </Link>
    //             <a onClick={() => this.handleDelete(item._id)} className="ml-1">
    //               <span className="text-danger">
    //                 <i className="fas fa-trash"></i>
    //                 Hapus
    //               </span>
    //             </a>
    //           </td>
    //         </tr>
    //       );
    //     })
    //   ) : (
    //       <Loader size={35} className="pt-5 position-absolute" />
    //     );

    // react-bootstrap-table
        const customTotal = (from, to, size) => (
          <span className="react-bootstrap-table-pagination-total">
            Menampilkan { from } sampai { to } dari { size } Hasil
          </span>
        );
        const pageButtonRenderer = ({
          page,
          active,
          disable,
          title,
          onPageChange
        }) => {
          const handleClick = (e) => {
            e.preventDefault();
            onPageChange(page);
          };
          const activeStyle = {
            padding: '4px 10px',
          };
          if (active) {
            activeStyle.backgroundColor = '#474d84';
            activeStyle.color = 'white';
          } else {
            activeStyle.backgroundColor = '#17193b';
            activeStyle.color = 'white';
          }
          if (typeof page === 'string') {
            activeStyle.backgroundColor = 'rgba(255,255,255,.4)';
            activeStyle.color = 'white';
          }
          return (
            <li className="page-item">
              <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
            </li>
          );
        };
        const options = {
          // 
          pageButtonRenderer,
          paginationSize: 3,
          pageStartIndex: 1,
          // alwaysShowAllBtns: true, // Always show next and previous button
          // withFirstAndLast: false, // Hide the going to First and Last page button
          hideSizePerPage: true, // Hide the sizePerPage dropdown always
          // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
          firstPageText: 'First',
          prePageText: 'Back',
          nextPageText: 'Next',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          showTotal: true,
          paginationTotalRenderer: customTotal,
          sizePerPageList: [{
            text: '25', value: 10
          }, {
            text: 'All', value: 1000
          },] // A numeric array is also available. the purpose of above example is custom the text
        };
        const columns = [{
          dataField: 'customer_group_id.name',
          text: 'Grup Customer'
        }, {
          dataField: 'name',
          text: 'Nama'
        }, {
          dataField: 'code',
          text: 'Kode',
        }, 
         {
          dataField: 'email',
          text: 'Email',
        },
         {
          dataField: 'address',
          text: 'Alamat',
        },
         {
          dataField: 'phone',
          text: 'Telepon',
        },
         {
          dataField: 'status',
          text: 'Telepon',
        },
         {
          dataField: 'notes',
          text: 'Catatan',
        },
           {
          dataField: 'distributor_id.name',
          text: 'Distributor',
        },
           {
          dataField: 'area_id.name',
          text: 'Area',
        },
        {
          dataField: '',
          text: 'Aksi',
          // column yang tidak akan di eksport
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <span>
                <Link
                  to={"/app/forms/editdatapelanggan/" + row._id}
                  className="mr-1"
                >
                  <span className="text-success">
                    <i className="far fa-edit"></i>
                    Ubah
                  </span>
                </Link>
                <a onClick={ () => this.handleDelete(row._id) }>
                  <span className="text-danger">
                    <i className="fas fa-trash"></i>
                    Hapus
                  </span>
                </a>
              </span>
            );
          }
        }];
        const ExportCSVCustom = (props) => {
          const handleClick = () => {
            props.onExport();
          };
          return (
            <div>
              <Button outline color="primary" className="ml-1" onClick={ handleClick }>Export CSV</Button>
            </div>
          );
        };
        const ImportCSV = (tes) => {
          const handleClick = () => {
            alert('ok')
          };
          return (
            <div>
              <Button outline color="success" className="mr-1" onClick={ handleClick }>Import CSV</Button>
            </div>
          );
        };

    return (
      <div className={s.root}>
        <Row className="pt-3">
          <Col lg={12}>
            <Row>
              <Col lg={12}>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">App</li>
                  <li className="breadcrumb-item active">
                    Data<span> Pelanggan</span>
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
              {/* <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Pelanggan</span>
                </h3>
              </Col> */}
              {/* <Col lg={4}>
                <Input
                  className="form-control my-3"
                  id="myInput"
                  placeholder="Search"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col> */}
              <Col lg={12} className="text-right">
                {/* BUTTON MODALS CREATE */}
                <Button
                  className="my-3"
                  color="default"
                  outline
                  onClick={() => this.toggle("modalCreate")}
                >
                  <i className="fa fa-plus mr-xs mb-xs" />
                  Tambah Data
                </Button>
              </Col>
            </Row>
            {/* <Row>
              <Col lg={12}>
                <Widget refresh collapse close className="px-2">
             
                  <div className="table-responsive">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Kode</th>
                          <th>ID Costumer Grup</th>
                          <th>ID Distributor</th>
                          <th>ID Area</th>
                          <th>Email</th>
                          <th>Alamat</th>
                          <th>Telepon</th>
                          <th>Status</th>
                          <th>Catatan</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                        {dataPelanggan ? tableData : null}
                      </tbody>

                    </Table>
                  </div>
                  <Col lg={12} className="pt-3">
                  
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
        </Row> */}

           {/* REACT-BOOTSTRAP-TABLE */}
            <Row>
              <Col lg={12}>
              <Widget title={<h3>Data <span className="fw-semi-bold">Pelanggan</span></h3>} collapse close>
                <ToolkitProvider
                  keyField="id"
                  data={dataPelanggan}
                  columns={columns}
                  search
                >
                  {
                    props => (
                      <div> 
                        <Row className="justify-content-between pt-3">
                          <Col lg={4} md={5} sm={6} xs={12}>
                            <SearchBar { ...props.searchProps } />
                          </Col>
                          <Col lg={4} md={5} sm={6} xs={12} className="d-flex justify-content-end">
                            <ImportCSV  />
                            <ExportCSVCustom { ...props.csvProps } />
                          </Col>
                        </Row>
                        <hr />
                        <BootstrapTable
                          { ...props.baseProps }
                          pagination={paginationFactory(options)}
                          striped
                          hover
                          wrapperClasses="table-responsive mb-5"
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
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
              id="formCreateDataPelanggan"
              onSubmit={this.doCreatePelanggan}
            >
              {/* customer_group_id */}
              <FormGroup>
                <Label for="customer_group_id">ID Kelompok Pelanggan</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="select"
                  name="customer_group_id"
                  id="customer_group_id"
                >
                  <option value={null}></option>
                  {dataKelompokPelanggan.map(item => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* name */}
              <FormGroup>
                <Label for="name">Nama</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Masukkan Nama"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* code */}
              <FormGroup>
                <Label for="code">Kode</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Masukkan kode"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* email */}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Masukkan Email"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* address */}
              <FormGroup>
                <Label for="address">Alamat</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="textarea"
                  name="address"
                  id="address"
                  placeholder="Masukkan Alamat"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* phone */}
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Masukkan No.Telp"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* status */}
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Masukkan Status"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* notes */}
              <FormGroup>
                <Label for="notes">Catatan</Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="text"
                  name="notes"
                  id="notes"
                  placeholder="Masukkan Catatan"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="distributor_id">Distributor ID </Label>
                <Input
                  required
                  onChange={this.handleChange}
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
              {/* area_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleKode">Area ID </Label>
                <Input
                  required
                  onChange={this.handleChange}
                  type="select"
                  name="area_id"
                  id="exampleSelect"
                >
                  <option value={null}></option>
                  {dataArea.map(item => {
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
    alertMessage: state.reducerPelanggan.alertMessage,
    // GET
    getSuccess: state.reducerPelanggan.getSuccess,
    getError: state.reducerPelanggan.getError,
    dataPelanggan: state.reducerPelanggan.dataPelanggan,
    dataPelangganPaginate: state.reducerPelanggan.dataPelangganPaginate,
    // CREATE
    createSuccess: state.reducerPelanggan.createSuccess,
    createError: state.reducerPelanggan.createError,
    // UPDATE
    updateSuccess: state.reducerPelanggan.updateSuccess,
    updateError: state.reducerPelanggan.updateError,
    // DELETE
    deleteSuccess: state.reducerPelanggan.deleteSuccess,
    deleteError: state.reducerPelanggan.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // AREA
    dataArea: state.reducerArea.dataArea,
    // KELOMPOK PELANGGAN
    dataKelompokPelanggan: state.reducerKelompokPelanggan.dataKelompokPelanggan
  };
}

export default withRouter(connect(mapStateToProps)(Pelanggan));
