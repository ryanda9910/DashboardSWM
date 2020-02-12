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
import $ from "jquery";
import {
  Link,
  useRouteMatch,
  useParams,
  withRouter,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// MODAL CREATE
import cx from "classnames";
import Loader from "../../../components/Loader/Loader";
import s from "./TarifVersion.module.scss";

import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataTarifVersion,
  createDataTarifVersion,
  deleteDataTarifVersion
} from "../../../actions/tables/tarifversion";
// ambil distributor untuk create dan update
import { getDataDistributor } from "../../../actions/tables/distributor";
// ambil data tarif
import { getDataTarif } from "../../../actions/tables/tarif";
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
      tarif_id: null,
      volume1: "",
      price1: "",
      volume2: "",
      price2: "",
      volume3: "",
      price3: "",
      validFrom: null,
      // validasi
      emptyDistributorIdMsg: "",
      emptyCreateName: "",
      emptyCreateDescription: "",
      emptyTarifIdMsg: "",
      // ALERT
      showAlert: false,
      alertMessage: "data get action",
      alertBackground: "success",
      // MODALS
      modalCreate: false,
      // react-pagination-library
      pageCount: 0,
      currentPage: 1,
      limit: 0,
      total: 0,
      triggerPaginate: false
    };
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.doCreateTarifVersion = this.doCreateTarifVersion.bind(this);
  }

  // LIFE CYCLE
  componentDidMount() {
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataTarifVersionPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataTarifVersionPaginate.pages,
        limit: nextProps.dataTarifVersionPaginate.limit,
        total: nextProps.dataTarifVersionPaginate.total,
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate() {
    if (this.props.dataTarifVersionPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CYCLE

  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataTarifVersion(this.state.currentPage));
  }
  // COUNT PAGE
  pageCount() {
    this.setState({
      pageCount: this.props.dataTarifVersionPaginate.pages
    });
  }
  // CURRENT PAGE
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, triggerPaginate: true });
  };

  // MODAL
  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id],
      // message validasi akan hilang setiap kali toggle() di klik
      emptyDistributorIdMsg: ""
    }));
    // GET data distributor
    this.props.dispatch(getDataDistributor());
    // GET data tarif
    this.props.dispatch(getDataTarif());
  }
  // CREATE
  doCreateTarifVersion = e => {
    let postData = {
      name: this.state.name,
      distributor_id: this.state.distributor_id,
      tarif_id: this.state.tarif_id,
      volume1: this.state.volume1,
      price1: this.state.price1,
      volume2: this.state.volume2,
      price2: this.state.price2,
      volume3: this.state.volume3,
      price3: this.state.price3,
      validFrom: this.state.validFrom
    };
    // console.log(postData);
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
      console.log(postData);
      this.props.dispatch(createDataTarifVersion(postData));
      this.setState({
        modalCreate: false,
        emptyDistributorIdMsg: ""
      });
    }
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
        this.props.dispatch(deleteDataTarifVersion(id));
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
    const { dataDistributor, dataTarif,dataTarifVersion } = this.props;

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
    //   this.props.dataTarifVersion.length > 0 ? (
    //     this.props.dataTarifVersion.map(item => {
    //       console.log(item);
    //       const isactive = item.isactive ? (
    //         <span className="badge btn-success">TRUE</span>
    //       ) : (
    //           <span className="badge btn-danger">FALSE</span>
    //         );
    //       const validFrom = item.validFrom;
    //       const validFromChange = validFrom.substr(
    //         0,
    //         validFrom.lastIndexOf("T")
    //       );
    //       return (
    //         <tr key={item._id}>
    //           <td>{item.name}</td>
    //           <td>{item.tarif_id ? item.tarif_id.name : "-"}</td>
    //           <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
    //           <td>{isactive}</td>
    //           <td>
    //             {item.volume1}M<sup>3</sup>
    //           </td>
    //           <td>{item.price1}</td>
    //           <td>
    //             {item.volume2}M<sup>3</sup>
    //           </td>
    //           <td>{item.price2}</td>
    //           <td>
    //             {item.volume3}M<sup>3</sup>
    //           </td>
    //           <td>{item.price3}</td>
    //           <td>{item.validFrom === null ? "-" : validFromChange}</td>
    //           <td>
    //             <Link
    //               to={"/app/forms/editdatatarifversion/" + item._id}
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
          dataField: 'name',
          text: ' Nama',
        }, {
          dataField: 'distributor_id.name' ,
          text: 'Distributor',
        }, {
          dataField: 'tarif_id.name',
          text: 'Tarif',
        }, 
        {
          dataField: 'volume1',
          text: 'Volume 1',
        }, 
        {
          dataField: 'price1',
          text: 'Harga 1',
        }, 
        {
          dataField: 'volume2',
          text: 'Volume 2',
        }, 
        {
          dataField: 'price2',
          text: 'Harga 2',
        }, 
        {
          dataField: 'volume3',
          text: 'Volume 3',
        },
        {
          dataField: 'price3',
          text: 'Harga 3',
        },
        {
          dataField: 'validFrom',
          text: 'Valid From',
        },{
          dataField: '',
          text: 'Aksi',
          // column yang tidak akan di eksport
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <span>
                <Link
                  to={"/app/forms/editdatatarifversion/" + row._id}
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
                    Data <span> Versi Tarif</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              {/* <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Versi Tarif</span>
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
                          <th>ID Tarif</th>
                          <th>ID Distributor</th>
                          <th>Status</th>
                          <th>Volume 1</th>
                          <th>Price 1</th>
                          <th>Volume 2</th>
                          <th>Price 2</th>
                          <th>Volume 3</th>
                          <th>Price 3</th>
                          <th>Valid From</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody id="myTable" className="position-relative">
              
                        {this.props.dataTarifVersion ? tableData : null}
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
            </Row> */}
         {/* REACT-BOOTSTRAP-TABLE */}
            <Row>
              <Col lg={12}>
              <Widget title={<h3>Data <span className="fw-semi-bold">Versi Tarif</span></h3>} collapse close>
                <ToolkitProvider
                  keyField="id"
                  data={dataTarifVersion}
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
            <Form id="formCreateDataTarif" onSubmit={this.doCreateTarifVersion}>
              {/* name */}
              <FormGroup>
                <Label for="name">Nama</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="name"
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
                <Label>ID Distributor</Label>
                <Input
                  required
                  value={this.state.distributor_id}
                  onChange={this.handleCreateChange}
                  name="distributor_id"
                  type="select"
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
              {/* tarif_id */}
              <FormGroup>
                <Label>ID Tarif</Label>
                <Input
                  required
                  value={this.state.tarif_id}
                  onChange={this.handleCreateChange}
                  name="tarif_id"
                  type="select"
                >
                  <option value={null}></option>
                  {dataTarif.map(item => {
                    console.log(item._id);
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Input>
                <FormText className="text-danger">
                  {this.state.emptyTarifIdMsg === ""
                    ? null
                    : this.state.emptyTarifIdMsg}
                </FormText>
              </FormGroup>
              {/* volume 1 */}
              <FormGroup>
                <Label for="volume1">Volume 1</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="number"
                  name="volume1"
                  id="volume1"
                  placeholder="Volume 1"
                />
              </FormGroup>
              {/* price 1 */}
              <FormGroup>
                <Label for="price1">Price 1</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="number"
                  name="price1"
                  id="price1"
                  placeholder="Price 1"
                />
              </FormGroup>
              {/* volume 2 */}
              <FormGroup>
                <Label for="volume2">Volume 2</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="number"
                  name="volume2"
                  id="volume2"
                  placeholder="Volume 2"
                />
              </FormGroup>
              {/* price 2 */}
              <FormGroup>
                <Label for="price2">Price 2</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="number"
                  name="price2"
                  id="price2"
                  placeholder="Price 2"
                />
              </FormGroup>
              {/* volume 3 */}
              <FormGroup>
                <Label for="volume3">Volume 2</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="number"
                  name="volume3"
                  id="volume3"
                  placeholder="Volume 3"
                />
              </FormGroup>
              {/* price 3 */}
              <FormGroup>
                <Label for="price3">Price 2</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="number"
                  name="price3"
                  id="price3"
                  placeholder="Price 3"
                />
              </FormGroup>
              {/* validFrom */}
              <FormGroup>
                <Label for="validFrom">Valid From</Label>
                <Input
                  required
                  onChange={this.handleCreateChange}
                  type="date"
                  name="validFrom"
                  id="validFrom"
                  placeholder="Valid From"
                />
              </FormGroup>

              {/* show ERROR */}
              <FormGroup row className="bg-danger">
                {createError}
              </FormGroup>

              <ModalFooter>
                <Button color="dark" onClick={() => this.toggle("modalCreate")}>
                  Kembali
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
    // alertMessage: state.reducerTarifVersion.alertMessage,
    // GET
    getSuccess: state.reducerTarifVersion.getSuccess,
    getError: state.reducerTarifVersion.getError,
    dataTarifVersion: state.reducerTarifVersion.dataTarifVersion,
    dataTarifVersionPaginate:
      state.reducerTarifVersion.dataTarifVersionPaginate,
    // CREATE
    createSuccess: state.reducerTarifVersion.createSuccess,
    createError: state.reducerTarifVersion.createError,
    // DELETE
    deleteSuccess: state.reducerTarifVersion.deleteSuccess,
    deleteError: state.reducerTarifVersion.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // TARIF
    dataTarif: state.reducerTarif.dataTarif
  };
}

export default withRouter(connect(mapStateToProps)(Tarif));
