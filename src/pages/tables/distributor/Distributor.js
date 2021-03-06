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
// react-js-pagination
import Pagination from "react-js-pagination";

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

// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// table-bootstrap-table2
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport  } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

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
      // MODALS
      modalCreate: false,
      // react-js-pagination
      pageCount: 0,
      currentPage: 1,
      limit: 0,
      total: 0,
      triggerPaginate: false,

      // RACE CONDITION HANDLE
      dataDistributorPaginate: [],
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }
  // LIFE CIRCLE
  componentDidMount() {
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDistributorPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataDistributorPaginate.pages,
        limit: nextProps.dataDistributorPaginate.limit,
        total: nextProps.dataDistributorPaginate.total,
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.dataDistributorPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CIRCLE
  pageCount() {
    this.setState({
      pageCount: this.props.dataDistributorPaginate.pages
    });
  }
  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataDistributor(this.state.currentPage));
  }
  // react-js-pagination
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
  };

  // CREATE distributor
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
        this.props.dispatch(deleteDataDistributor(id));
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
    //   dataDistributor.length > 0 ? (
    //     dataDistributor.map(item => {
    //       console.log(item);
    //       const isactive = item.isactive ? (
    //         <span className="badge btn-success">TRUE</span>
    //       ) : (
    //           <span className="badge btn-danger">FALSE</span>
    //         );
    //       return (
    //         <tr key={item._id}>
    //           <td>{item.code}</td>
    //           <td>{isactive}</td>
    //           <td>{item.name}</td>
    //           <td>{item.contact}</td>
    //           <td>{item.description}</td>
    //           <td>{item.phone}</td>
    //           <td>{item.email}</td>
    //           <td>{item.tipe}</td>
    //           <td>
    //             <Link
    //               to={"/app/forms/editdatadistributor/" + item._id}
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
          dataField: 'code',
          text: ' Kode',
        }, {
          dataField: 'isactive' ,
          text: 'Status',
        }, {
          dataField: 'name',
          text: 'Nama',
        }, 
        {
          dataField: 'contact',
          text: 'Kontak',
        }, 
        {
          dataField: 'description',
          text: 'Deskripsi',
        }, 
        {
          dataField: 'phone',
          text: 'Telepon',
        }, 
        {
          dataField: 'email',
          text: 'Email',
        }, 
        {
          dataField: 'tipe',
          text: 'Tipe',
        }, {
          dataField: '',
          text: 'Aksi',
          // column yang tidak akan di eksport
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <span>
                <Link
                  to={"/app/forms/editdataperangkat/" + row._id}
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
  



    return (
      <div className={s.root}>
        <Row className="pt-3">
          <Col lg={12}>
            <Row>
              <Col lg={12}>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">App</li>
                  <li className="breadcrumb-item active">
                    Data<span> Distributor</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              {/* <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Distributor</span>
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
    {/* //         <Row>
    //           <Col lg={12}>
    //             <Widget refresh collapse close className="px-2">
    //               <div className="table-responsive">
    //                 <Table className="table-hover">
    //                   <thead>
    //                     <tr>
    //                       <th>Kode</th>
    //                       <th>Status</th>
    //                       <th>Nama</th>
    //                       <th>Kontak</th>
    //                       <th>Deskripsi</th>
    //                       <th>Telepon</th>
    //                       <th>Email</th>
    //                       <th>Tipe</th>
    //                       <th>Aksi</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody id="myTable" className="position-relative">
    //          
    //                     {this.props.dataDistributor ? tableData : null}
    //                   </tbody>
    //                
    //                 </Table>
    //               </div>
    //               <Col lg={12} className="pt-3">
    //                
    //                 <div className={s.rootPaginate + " justify-content-center d-flex "}>
    //                  
    //                     activePage={this.state.currentPage}
    //                     itemsCountPerPage={this.state.limit}
    //                     totalItemsCount={this.state.total}
    //                     pageRangeDisplayed={this.state.pageCount}
    //                     onChange={this.changeCurrentPage.bind(this)}
    //                   />
    //                 </div>
    //               </Col>
    //             </Widget>
    //           </Col>
    //         </Row>
    //       </Col>
    //     </Row> */}
     {/* REACT-BOOTSTRAP-TABLE */}
     
            <Row>
              <Col lg={12}>
              <Widget title={<h3>Data <span className="fw-semi-bold">Distributor</span></h3>} collapse close>
                <ToolkitProvider
                  keyField="id"
                  data={dataDistributor}
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
                {/* create */}
                <Button color="warning" className="px-5" type="submit">
                  Tambah Data
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div >
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
    dataDistributorPaginate: state.reducerDistributor.dataDistributorPaginate,
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
    // TARIF
    dataTarif: state.reducerTarif.dataTarif
  };
}

export default withRouter(connect(mapStateToProps)(Distributor));
