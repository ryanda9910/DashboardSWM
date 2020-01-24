import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./createdatakelompokpelanggan.module.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import config from "../../../config";

// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class CreateDataKelompokPelanggan extends React.Component {
  state = {
    code: "",
    name: "",
    createStatus: null,
    createError: null
  };
  // CREATE
  doCreateDataArea = e => {
    e.preventDefault();
    if (config.token) {
      const data = {
        code: this.state.code,
        name: this.state.name
      };
      axios
        .post("/api/area", data, config.axiosConfig)
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            console.log(res);
            // alert(res.data.status);
            localStorage.setItem("isCreated", res.data.status);
            this.setState({
              createStatus: res.status
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            createError: "Kode Sudah Digunakan "
          });
        });
    }
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
    console.log(this.state);

    // redirect jika succes create
    if (this.state.createStatus === 200 || this.state.createStatus === 201) {
      return <Redirect to="/app/tables/area" />;
    }

    // update error
    const updateError =
      this.state.createError === null ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.state.createError}</small>
        </div>
      );

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={12} className="text-center">
            <h1 className="page-title">
              Create Kelompok <span className="fw-semi-bold"> Pelanggan</span>
            </h1>
          </Col>
          <Col lg={7}>
            <Widget refresh collapse className="px-5">
              <Form onSubmit={this.doCreateDataArea} className="mt-4">
                {/* show ERROR */}
                <FormGroup row className="bg-danger">
                  {updateError}
                </FormGroup>
                <FormGroup row>
                  <Label for="code-input">Kode</Label>
                  <input
                    name="code"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kode "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="nama-input">Nama</Label>
                  <input
                    name="nama"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Nama "
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="telepon-input">Tarif</Label>
                  <input
                    name="telepon"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="email-input">Grup</Label>
                  <input
                    name="email"
                    onChange={this.handleChange}
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="status-input">Status</Label>
                  <Label check>
                    <input
                      type="radio"
                      name="radio2"
                      className="radiobtn  ml-5"
                      style={{ color: "orange" }}
                    />
                    Online
                  </Label>
                  <Label check>
                    <input
                      type="radio"
                      name="radio2"
                      className="radiobtn  ml-5"
                      style={{ color: "orange" }}
                    />
                    Offline
                  </Label>
                </FormGroup>
                <div>
                  <Link
                    to="/app/tables/kelompokpelangggan"
                    className="btn btn-light px-5"
                  >
                    Kembali
                  </Link>
                  <Button className="px-5 ml-3" color="primary" type="submit">
                    Simpan
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

export default CreateDataKelompokPelanggan;
