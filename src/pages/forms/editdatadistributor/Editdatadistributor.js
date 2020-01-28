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
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDataDistributor } from "../../../actions/tables/distributor";

import s from "./editdatadistributor.module.scss";
import config from "../../../config";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class Editdatadistributor extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      isactive: "",
      name: "",
      contact: "",
      description: "",
      phone: "",
      email: "",
      tipe: "",
      distributor_id: null,
      updateStatus: null,
      updateError: null
    };
    //
    this.goBack = this.goBack.bind(this);
  }

  // GET data
  componentDidMount() {
    // id
    const id = this.props.match.params.id;
    axios
      .get(config.remote + "/api/area/" + id)
      .then(res => {
        console.log(res);
        //
        this.setState({
          code: this.state.code,
          isactive: this.state.isactive,
          name: this.state.name,
          contact: this.state.contact,
          description: this.state.description,
          phone: this.state.phone,
          email: this.state.email,
          tipe: this.state.tipe
        });
      })
      .catch(err => {
        console.log(err);
      });

    // DATA DISTRIBUTOR
    this.props.dispatch(getDataDistributor());
  }

  // UPDATE
  doUpdateDataArea = e => {
    e.preventDefault();
    const data = {
      code: this.state.code,
      isactive: this.state.isactive,
      name: this.state.name,
      contact: this.state.contact,
      description: this.state.description,
      phone: this.state.phone,
      email: this.state.email,
      tipe: this.state.tipe
    };

    // PUT
    const id = this.props.match.params.id;
    axios
      .put(config.remote + "/api/distributor/" + id, data)
      .then(res => {
        console.log(res);
        //
        if (res.status >= 200 || res.status < 300) {
          alert(res.data.status);
          this.setState({
            updateStatus: res.status
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          updateError: "Something Wrong"
        });
      });
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    // id
    console.log(this.props);
    console.log(this.state);

    const { dataDistributor } = this.props;

    // redirect jika succes update
    if (this.state.updateStatus === 200) {
      return <Redirect to="/app/tables/distributor" />;
    }

    // update error
    const updateError =
      this.state.updateError === null ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.state.updateError}</small>
        </div>
      );

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={12} className="text-center">
            <h1 className="page-title">
              Edit Data <span className="fw-semi-bold">Distributor</span>
            </h1>
          </Col>
          <Col lg={12}>
            <Widget refresh collapse className="px-5">
              <Form onSubmit={this.doUpdateDataArea} className="mt-4">
                {/* show ERROR */}
                <FormGroup className="bg-danger">{updateError}</FormGroup>
                <FormGroup>
                  <Label for="nama-input">Kode</Label>
                  <input
                    value={this.state.code}
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kode "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleIsActive">Status</Label>
                  <CustomInput
                    checked={this.state.isactive}
                    onChange={this.handleChange}
                    type="switch"
                    id="exampleIsActive"
                    name="isactive"
                    label="Turn on this if True"
                  />
                </FormGroup>
                {/* distributor_id */}
                <FormGroup>
                  <Label for="nama-input">Nama</Label>
                  <input
                    value={this.state.name}
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Nama"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nama-input">Kontak</Label>
                  <input
                    value={this.state.contact}
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kontak "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nama-input">Deskripsi</Label>
                  <input
                    value={this.state.description}
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kode "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nama-input">Telepon</Label>
                  <input
                    value={this.state.phone}
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Telepon "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nama-input">Email</Label>
                  <input
                    value={this.state.email}
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kode "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>

                <div>
                  <a
                    onClick={this.goBack}
                    className="text-dark btn btn-light px-5"
                  >
                    Kembali
                  </a>
                  <Button className="px-5 ml-3" color="primary" type="submit">
                    Update
                  </Button>
                </div>
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

export default connect(mapStateToProps)(Editdatadistributor);
