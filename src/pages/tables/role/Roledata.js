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
  Input
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
// import cx from "classnames";
// import config from "../../../config";
import Loader from "../../../components/Loader/Loader";
import s from "./Roledata.module.scss";
// react-js-pagination
import Pagination from "react-js-pagination";

// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataRole,
  createDataRole,
  deleteDataRole
} from "../../../actions/tables/role";
// ambil distributor untuk create dan update
import { getDataDistributor } from "../../../actions/tables/distributor";
// table-bootstrap-table2
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport  } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

class Roledata extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      code: "",
      name: "",
      description: "",
      menuaccess: [],
      distributor_id: "",
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,
      // HANDLE MENUACCESS
      tarifversion: false,
      tarif: false,
      cutomerbilling: false,
      pelanggan: false,
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

  // LIFE CYCLE
  componentDidMount() {
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataRolePaginate !== null) {
      this.setState({
        pageCount: nextProps.dataRolePaginate.pages,
        limit: nextProps.dataRolePaginate.limit,
        total: nextProps.dataRolePaginate.total
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    if (this.props.dataRolePaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CYCLE

  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataRole(this.state.currentPage));
    this.props.dispatch(getDataDistributor());
  }
  // COUNT PAGE
  pageCount() {
    this.setState({
      pageCount: this.props.dataRolePaginate.pages
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
  doCreateRole = e => {
    e.preventDefault();
    // HANDLE MENU ACCESS
    const tarif = this.state.tarif === true ? "tarif" : "popTarif";
    const tarifversion = this.state.tarifversion === true ? "tarifversion" : "popTarifVersion";
    const customerbilling = this.state.customerbilling === true ? "customerbilling" : "popCustomerBilling";
    const pelanggan = this.state.pelanggan === true ? "pelanggan" : "popPelanggan";
    if (this.state.menuaccess.indexOf("tarif") === -1) {
      if (tarif === "tarif") {
        this.state.menuaccess.push(tarif);
      }
    } else {
      if (tarif === "popTarif") {
        this.state.menuaccess.splice(this.state.menuaccess.indexOf("tarif"), 1);
      }
    }
    if (this.state.menuaccess.indexOf("tarifversion") === -1) {
      if (tarifversion === "tarifversion") {
        this.state.menuaccess.push(tarifversion);
      }
    } else {
      if (tarifversion === "popTarifVersion") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("tarifversion"), 1);
      }
    }
    if (this.state.menuaccess.indexOf("customerbilling") === -1) {
      if (customerbilling === "customerbilling") {
        this.state.menuaccess.push(customerbilling);
      }
    } else {
      if (customerbilling === "popCustomerBilling") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("customerbilling"), 1);
      }
    }
    if (this.state.menuaccess.indexOf("pelanggan") === -1) {
      if (pelanggan === "pelanggan") {
        this.state.menuaccess.push(pelanggan);
      }
    } else {
      if (pelanggan === "popPelanggan") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("pelanggan"), 1);
      }
    }
    // data to post
    let postData = {
      code: this.state.code,
      name: this.state.name,
      description: this.state.description,
      menuaccess: this.state.menuaccess,
      distributor_id: this.state.distributor_id
    };
    // console.log(postData);
    this.props.dispatch(createDataRole(postData));
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
        this.props.dispatch(deleteDataRole(id));
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
    //   dataRole.length > 0 ? (
    //     dataRole.map(item => {
    //       // console.log(item);
    //       // handle isactive
    //       const isactive = item.isactive ? (
    //         <span className="badge btn-success">TRUE</span>
    //       ) : (
    //           <span className="badge btn-danger">FALSE</span>
    //         );
    //       // handle menuaccess
    //       // let menuaccess = "";
    //       // for (var a = 0; a < item.menuaccess.length; a++) {
    //       //   menuaccess += item.menuaccess[a]+" ";
    //       // }
    //       return (
    //         <tr key={item._id}>
    //           <td>{item.code}</td>
    //           <td>{item.name}</td>
    //           <td>{isactive}</td>
    //           {/* <td>{menuaccess}</td> */}
    //           <td>{item.distributor_id.name}</td>
    //           <td>{item.description}</td>
    //           <td>
    //             <Link
    //               to={"/app/forms/editdatarole/" + item._id}
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
          text: 'Kode',
        }, {
          dataField: 'name' ,
          text: 'Nama',
        }, {
          dataField: 'description',
          text: 'Deskripsi',
        }, 
        {
          dataField: 'menuaccess',
          text: 'Akses Menu',
        }, 
        {
          dataField: 'distributor_id.name',
          text: 'Distributor',
        }, {
          dataField: '',
          text: 'Aksi',
          // column yang tidak akan di eksport
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <span>
                <Link
                  to={"/app/forms/editdatarole/" + row._id}
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
                    Data<span> Role</span>
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
                  Data <span className="fw-semi-bold"> Role </span>
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
            {/* <Row>
              <Col lg={12}>
                <Widget refresh collapse close className="px-2">
                  <div className="table-responsive">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nama</th>
                          <th>Status</th>
                        
                          <th>ID Distributor</th>
                          <th>Deskripsi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
                      
                        {this.props.dataRole ? tableData : null}
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
              <Widget title={<h3>Data <span className="fw-semi-bold">Role</span></h3>} collapse close>
                <ToolkitProvider
                  keyField="id"
                  data={dataRole}
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
            <Form
              id="formCreateDataRolegetDataRole"
              onSubmit={this.doCreateRole}
            >
              {/* code */}
              <FormGroup>
                <Label for="code">Kode </Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="code"
                  id="code"
                  placeholder=" Masukkan Kode"
                />
              </FormGroup>
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
              {/* description */}
              <FormGroup>
                <Label for="exampleKode">Deskripsi</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="description"
                  id="exampleDescription"
                  placeholder="Masukkan Deskripsi"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label for="exampleKode">Distributor ID </Label>
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
              {/* menuaccess */}
              <Label>Menu akses</Label>
              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="tarif"
                  name="tarif"
                  label="tarif"
                  value="tarif"
                />
                <Label for="tarif" check>
                  tarif
                </Label>
              </FormGroup>

              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="tarifversion"
                  name="tarifversion"
                  label="tarifversion"
                  value="tarifversion"
                />
                <Label for="tarifversion" check>
                  tarif version
                </Label>
              </FormGroup>
              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="customerbilling"
                  name="customerbilling"
                  label="customerbilling"
                  value="customerbilling"
                />
                <Label for="customerbilling" check>
                  customer billing
                </Label>
              </FormGroup>

              <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                <Input
                  type="checkbox"
                  onChange={this.handleCreateChange}
                  id="pelanggan"
                  name="pelanggan"
                  label="pelanggan"
                  value="pelanggan"
                />
                <Label for="pelanggan" check>
                  pelanggan
                </Label>
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
    alertMessage: state.reducerRole.alertMessage,
    // GET
    getSuccess: state.reducerRole.getSuccess,
    getError: state.reducerRole.getError,
    dataRole: state.reducerRole.dataRole,
    dataRolePaginate: state.reducerRole.dataRolePaginate,
    // CREATE
    createSuccess: state.reducerRole.createSuccess,
    createError: state.reducerRole.createError,
    // UPDATE
    updateSuccess: state.reducerRole.updateSuccess,
    updateError: state.reducerRole.updateError,
    // DELETE
    deleteSuccess: state.reducerRole.deleteSuccess,
    deleteError: state.reducerRole.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default withRouter(connect(mapStateToProps)(Roledata));
