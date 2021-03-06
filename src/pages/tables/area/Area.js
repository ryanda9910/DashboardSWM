import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  // MODALS
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
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
// react-js-pagination
import Pagination from "react-js-pagination";
// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Widget from "../../../components/Widget/Widget";
// actions
import {
  getDataArea,
  createDataArea,
  deleteDataArea
} from "../../../actions/tables/area";
// DISTRIBUTOR
import { getDataDistributor } from "../../../actions/tables/distributor";
import classnames from 'classnames';
// table-bootstrap-table2
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport  } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

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
      // react-js-paginate
      currentPage: 1,
      pageCount: 0,
      limit: 0,
      total: 0,
      triggerPaginate: false,
    };
    //
    this.handleCreateChange = this.handleCreateChange.bind(this);
  }
  // LIFE CYCLE
  componentDidMount() {
    this.receiveData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataAreaPaginate !== null) {
      this.setState({
        pageCount: nextProps.dataAreaPaginate.pages,
        limit: nextProps.dataAreaPaginate.limit,
        total: nextProps.dataAreaPaginate.total
      });
    } else {
      window.location.reload();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataAreaPaginate.page !== this.state.currentPage) {
      this.receiveData();
    }
  }
  // END LIFE CYCLE
  pageCount() {
    this.setState({
      pageCount: this.props.dataAreaPaginate.pages
    });
  }
  // RECEIVE DATA
  receiveData() {
    this.props.dispatch(getDataArea(this.state.currentPage));
  }
  // react-js-paginate
  changeCurrentPage = numPage => {
    console.log(`active page is ${numPage}`);
    this.setState({ currentPage: numPage, triggerPaginate: true });
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
    this.setState({
      modalCreate: false,
      emptyDistributorIdMsg: ""
    });
    // ALERT
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Berhasil',
      text: 'Data baru ditambahkan.',
      icon: 'success',
    }).then(result => {
      console.log(result)
      this.props.dispatch(createDataArea(postData));
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
        this.props.dispatch(deleteDataArea(id));
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

  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id]
    }));
    this.props.dispatch(getDataDistributor());
  }

  
  
  
  
  render() {
    console.log(this.state);
    console.log(this.props);
    
    const { modalCreate } = this.state;
    const { dataAreaPaginate, dataArea, dataDistributor } = this.props;
    
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
      //     .val()
      //     .toLowerCase();
      //     $("#myTable tr").filter(function () {
      //       $(this).toggle(
      //         $(this)
      //         .text()
      //         .toLowerCase()
      //         .indexOf(value) > -1
      //         );
      //       });
      //     });
      //   });
        
        // table data
        // const tableData =
        // dataArea.length > 0 ? (
        //   dataArea.map(item => {
        //     // console.log(item);
        //     return (
        //       <tr key={item._id}>
        //       <td>{item.code}</td>
        //       <td>{item.name}</td>
        //       <td>{item.distributor_id ? item.distributor_id.name : "-"}</td>
        //       <td>
        //         <Link
        //           to={"/app/forms/editdataarea/" + item._id}
        //           className="mr-1"
        //         >
        //           <span className="text-success">
        //             <i className="far fa-edit"></i>
        //             Ubah
        //           </span>
        //         </Link>
        //         <a onClick={() => this.handleDelete(item._id)} className="ml-1">
        //           <span className="text-danger">
        //             <i className="fas fa-trash"></i>
        //             Hapus
        //           </span>
        //         </a>
        //       </td>
        //     </tr>
        //   );
        // })
        // ) : (
        //   <Loader size={35} className="pt-5 position-absolute" />
        // );
        


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
          text: 'Kode'
        }, {
          dataField: 'name',
          text: 'Nama'
        }, {
          dataField: 'distributor_id.name',
          text: 'ID Distributor',
        }, {
          dataField: '',
          text: 'Aksi',
          // column yang tidak akan di eksport
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <span>
                <Link
                  to={"/app/forms/editdataarea/" + row._id}
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
                    Data<span> Area</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              {/* <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Area</span>
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
            {/* TABLE */}
            {/* <Row>
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
                        {dataArea ? tableData : null}
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
              <Widget title={<h3>Data <span className="fw-semi-bold">Area</span></h3>} collapse close>
                <ToolkitProvider
                  keyField="id"
                  data={dataArea}
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
                          wrapperClasses="table-responsive"
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