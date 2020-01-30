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
  FormText,
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
  deleteDataTarifVersion, 
} from '../../../actions/tables/tarifversion';
// ambil distributor untuk create dan update
import {
  getDataDistributor
} from '../../../actions/tables/distributor';
// ambil data tarif
import { getDataTarif } from '../../../actions/tables/tarif';

class Tarif extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      name: '',
      distributor_id: null,
      tarif_id: null,
      volume1: '',
      price1: '',
      volume2: '',
      price2: '',
      volume3: '',
      price3: '',
      validFrom: null,
      // validasi
      emptyDistributorIdMsg: '',
      emptyCreateName: '',
      emptyCreateDescription: '',
      emptyTarifIdMsg: '',
      // ALERT
      showAlert: false,
      alertMessage: 'data get action',
      alertBackground: 'success',
      // MODALS
      modalCreate:false,
    };
    // 
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.doCreateTarifVersion = this.doCreateTarifVersion.bind(this);
    // this.onShowAlert = this.onShowAlert.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // masih race condition, harusnya pas modals muncul aja
    // GET data
    this.props.dispatch(getDataTarifVersion());
  }

  componentWillReceiveProps(){
    // ALERT
    if(this.props.deleteSuccess){
      this.setState({
        alertMessage: 'delete success'
      })
      return this.onShowAlert()
    }
    if(this.props.deleteError){
      this.setState({
        alertMessage: 'delete error',
        alertBackground: 'danger'
      })
      return this.onShowAlert()
    }
  }

  // CREATE Tarif
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
      validFrom: this.state.validFrom,
    };
    console.log(postData);
    e.preventDefault();
    // CREATE VALIDASI
    if(this.state.distributor_id === null || this.state.distributor_id === ''){
      this.setState({
        emptyDistributorIdMsg: 'wajib memasukan distributor!'
      });
      return false;
    }
    else if(this.state.name === ''){
      this.setState({
        emptyCreateName: 'Field name harus diisi.'
      })
    }
    else if(this.state.description === ''){
      this.setState({
        emptyCreateDescription: 'Field description harus diisi.'
      })
    }
    else{
      e.preventDefault();
      console.log(postData);
      this.props.dispatch(createDataTarifVersion(postData))
      this.setState({
        modalCreate: false,
        emptyDistributorIdMsg: '',
      })
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
      this.props.dispatch(deleteDataTarifVersion(id));
    }
  }

  onShowAlert = ()=>{
    this.setState({
      showAlert:true,
    },
    ()=>{
      window.setTimeout(()=>{
        this.setState({
          showAlert:false,
          // alertMessage: ''
        })
      },2000)     
    });
  }

  toggle(id) {
    this.setState(prevState => ({
      [id]: !prevState[id],
      // message validasi akan hilang setiap kali toggle() di klik
      emptyDistributorIdMsg: '',
    }));
    // GET data distributor
    this.props.dispatch(getDataDistributor());
    // GET data tarif
    this.props.dispatch(getDataTarif())
  }


  render() {
    console.log(this.state);
    console.log(this.props);

    // jika error karena 401 atau lainnya, tendang user dengan hapus cookie
    // if(this.props.getError || this.props.createError || this.props.deleteError){
    //   localStorage.removeItem('token');
    //   window.location.reload(false);
    // }

    const { modalCreate } = this.state;
    const { dataDistributor, dataTarif } = this.props;


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
      this.props.dataTarifVersion.length > 0 ? (
        this.props.dataTarifVersion.map(item => {
          console.log(item);
          const isactive = item.isactive ? (
            <span className="badge btn-success">TRUE</span>
          ) : (
            <span className="badge btn-danger">FALSE</span>
          );
          const validFrom =  item.validFrom;
          const validFromChange = validFrom.substr(0, validFrom.lastIndexOf('T'));
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.tarif_id.name}</td>
              <td>{item.distributor_id.name}</td>
              <td>{isactive}</td>
              <td>{item.volume1}M<sup>3</sup></td>
              <td>{item.price1}</td>
              <td>{item.volume2}M<sup>3</sup></td>
              <td>{item.price2}</td>
              <td>{item.volume3}M<sup>3</sup></td>
              <td>{item.price3}</td>
              <td>{item.validFrom === null ? "-" : validFromChange}</td>
              <td>
                <Link
                  to={"/app/forms/editdatatarifversion/" + item._id}
                  className="mr-1"
                >
                  <span className="text-success">
                    <i class="far fa-edit"></i>
                    Ubah
                  </span>
                </Link>
                <a onClick={() => this.handleDelete(item._id)} className="ml-1">
                  <span className="text-danger">
                    <i class="fas fa-trash"></i>
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
                    Tarif <span>Version</span>
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
                  Data <span className="fw-semi-bold">Tarif Version</span>
                </h3>
              </Col>
              <Col lg={4}>
                <input
                  class="form-control my-3"
                  id="myInput"
                  placeholder="Search"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col>
              <Col lg={4} className="text-right">
                {/* BUTTON MODALS CREATE */}
                <Button className="mr-sm" color="warning" onClick={() => this.toggle('modalCreate')}>Tambah Data</Button>
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
                          <th>ID Tarif</th>
                          <th>ID Distributor</th>
                          <th>is Active</th>
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
                        {/* eslint-disable */}
                        {this.props.dataTarifVersion ? tableData : null}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* MODALS */}
        <Modal size="md" isOpen={modalCreate} toggle={() => this.toggle('modalCreate')}>
          <ModalHeader toggle={() => this.toggle('modalCreate')}>Tambah Data</ModalHeader>
          <ModalBody>
          <Form id="formCreateDataTarif" onSubmit={this.doCreateTarifVersion}>

              {/* name */}
              <FormGroup>
                <Label for="name">Nama</Label>
                <Input
                  onChange={this.handleCreateChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nama"
                />
                <FormText className="text-danger">{this.state.emptyCreateName === '' ? null : this.state.emptyCreateName}</FormText>
              </FormGroup>
              {/* distributor_id */}
              <FormGroup>
                {/* tampilkan distributor name dan id nya sebagai value */}
                <Label>ID Distributor</Label>
                <Input value={this.state.distributor_id} onChange={this.handleCreateChange} name="distributor_id" type="select">
                  <option value={null}></option>
                  {
                    dataDistributor.map(item => {
                    console.log(item._id)
                      return (
                        <option value={item._id}>{item.name}</option>
                      )
                    })
                  }
                </Input>
                <FormText className="text-danger">{this.state.emptyDistributorIdMsg === '' ? null : this.state.emptyDistributorIdMsg}</FormText>
              </FormGroup>
              {/* tarif_id */}
              <FormGroup>
                <Label>ID Tarif</Label>
                <Input value={this.state.tarif_id} onChange={this.handleCreateChange} name="tarif_id" type="select">
                  <option value={null}></option>
                  {
                    dataTarif.map(item => {
                    console.log(item._id)
                      return (
                        <option value={item._id}>{item.name}</option>
                      )
                    })
                  }
                </Input>
                <FormText className="text-danger">{this.state.emptyTarifIdMsg === '' ? null : this.state.emptyTarifIdMsg}</FormText>
              </FormGroup>
              {/* volume 1 */}
              <FormGroup>
                <Label for="volume1">Volume 1</Label>
                <Input
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
                <Button color="dark" onClick={() => this.toggle('modalCreate')}>Close</Button>
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
    // CREATE
    createSuccess: state.reducerTarifVersion.createSuccess,
    createError: state.reducerTarifVersion.createError,
    // DELETE
    deleteSuccess: state.reducerTarifVersion.deleteSuccess,
    deleteError: state.reducerTarifVersion.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // TARIF
    dataTarif: state.reducerTarif.dataTarif,
  };
}

export default withRouter(connect(mapStateToProps)(Tarif));
