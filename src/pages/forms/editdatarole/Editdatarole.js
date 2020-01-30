import React from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  CustomInput
} from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatarole.module.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";
// distributor
import { getDataDistributor } from "../../../actions/tables/distributor";

class Editdatarole extends React.Component {
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
      description: "",
      menuaccess: [],
      distributor_id: "",
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modal: false,
      // HANDLE MENUACCESS
      tarifversion: false,
      tarif: false,
      customerbilling: false,
      pelanggan: false
    };
    //
    this.goBack = this.goBack.bind(this);
    // // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // DATA TARIF SPESIFIC
    // get id
    const id = this.props.match.params.id;
    axios
      .get("/api/role/" + id)
      .then(res => {
        // console.log(res);
        // HANDLE MENUACCESS
        // console.log(res.data.data.menuaccess.indexOf('tarif') > -1);
        if (res.data.data.menuaccess.indexOf("tarif") > -1) {
          this.setState({
            tarif: true
          });
        }
        if (res.data.data.menuaccess.indexOf("tarifversion") > -1) {
          this.setState({
            tarifversion: true
          });
        }
        if (res.data.data.menuaccess.indexOf("pelanggan") > -1) {
          this.setState({
            pelanggan: true
          });
        }
        if (res.data.data.menuaccess.indexOf("customerbilling") > -1) {
          this.setState({
            customerbilling: true
          });
        }
        this.setState({
          //
          code: res.data.data.code,
          isactive: res.data.data.isactive,
          name: res.data.data.name,
          description: res.data.data.description,
          menuaccess: res.data.data.menuaccess,
          distributor_id: res.data.data.distributor_id,
          //
          statusGetSpesificsData: res.data.status
          // REACT_TAG_INPUT
          // tags: res.data.data.menuaccess,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          getError: "Something Wrong"
        });
      });

    // DATA DISTRIBUTOR
    this.props.dispatch(getDataDistributor());
  }

  // do UPDATE
  doUpdateRole = e => {
    e.preventDefault();
    // HANDLE MENU ACCESS
    const tarif = this.state.tarif === true ? "tarif" : "popTarif";
    const tarifversion =
      this.state.tarifversion === true ? "tarifversion" : "popTarifVersion";
    const customerbilling =
      this.state.customerbilling === true
        ? "customerbilling"
        : "popCustomerBilling";
    const pelanggan =
      this.state.pelanggan === true ? "pelanggan" : "popPelanggan";
    //
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
          this.state.menuaccess.indexOf("tarifversion"),
          1
        );
      }
    }
    if (this.state.menuaccess.indexOf("customerbilling") === -1) {
      if (customerbilling === "customerbilling") {
        this.state.menuaccess.push(customerbilling);
      }
    } else {
      if (customerbilling === "popCustomerBilling") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("customerbilling"),
          1
        );
      }
    }
    if (this.state.menuaccess.indexOf("pelanggan") === -1) {
      if (pelanggan === "pelanggan") {
        this.state.menuaccess.push(pelanggan);
      }
    } else {
      if (pelanggan === "popPelanggan") {
        this.state.menuaccess.splice(
          this.state.menuaccess.indexOf("pelanggan"),
          1
        );
      }
    }

    let postData = {
      code: this.state.code,
      isactive: this.state.isactive === true ? "true" : "false",
      name: this.state.name,
      description: this.state.description,
      menuaccess: this.state.menuaccess,
      distributor_id: this.state.distributor_id
    };

    console.log(postData);

    // UPDATE data
    const id = this.props.match.params.id;
    axios
      .put("/api/role/" + id, postData)
      .then(res => {
        console.log(res);
        this.setState({
          updateStatus: res.status
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          updateError: "Something Wrong"
        });
      });
  };

  // track change
  handleChange = e => {
    // handle checkedbox: https://stackoverflow.com/questions/55530348/react-how-to-pass-the-condition-when-checkbox-is-checked
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    this.setState({
      [name]: value
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    console.log(this.state);
    console.log(this.props);

    const { dataDistributor } = this.props;

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={6}>
            <h1 className="page-title">
              Edit Data <span className="fw-semi-bold"> Role</span>
            </h1>
            <Widget refresh collapse close className="px-5">
              <Form id="formDataRolegetDataRole" onSubmit={this.doUpdateRole}>
                {/* code */}
                <FormGroup>
                  <Label for="code">Kode </Label>
                  <Input
                    required
                    value={this.state.code}
                    onChange={this.handleChange}
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
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Masukkan Nama"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                <div className={s.root}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="exampleActive" className="switch">
                      <Input
                        required
                        checked={this.state.isactive}
                        onChange={this.handleChange}
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
                {/* description */}
                <FormGroup>
                  <Label for="exampleKode">Deskripsi</Label>
                  <Input
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
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
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
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
                {/* menuaccess */}
                <Label>Menu akses</Label>
                <FormGroup className="checkbox abc-checkbox abc-checkbox-primary">
                  <Input
                    checked={this.state.tarif}
                    type="checkbox"
                    onChange={this.handleChange}
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
                    checked={this.state.tarifversion}
                    type="checkbox"
                    onChange={this.handleChange}
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
                    checked={this.state.customerbilling}
                    type="checkbox"
                    onChange={this.handleChange}
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
                    checked={this.state.pelanggan}
                    type="checkbox"
                    onChange={this.handleChange}
                    id="pelanggan"
                    name="pelanggan"
                    label="pelanggan"
                    value="pelanggan"
                  />
                  <Label for="pelanggan" check>
                    pelanggan
                  </Label>
                </FormGroup>

                <Button color="dark" onClick={this.goBack}>
                  Kembali
                </Button>
                {/* craete */}
                <Button
                  color="warning"
                  className="my-5 px-5 ml-5"
                  type="submit"
                >
                  Perbarui Data
                </Button>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default connect(mapStateToProps)(Editdatarole);
