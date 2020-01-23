import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatakelompokpelanggan.module.scss";
import { Link } from "react-router-dom";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class EditdatakelompokPelanggan extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5">
          <h4 className="page-title fw-semi-bold ml-5">
            Edit Data Kelompok Pelanggan
          </h4>
          <Col lg={6}>
            <Form className="mt-5">
              <FormGroup row>
                <Label md={3} xs={12} for="nama-input">
                  Kode
                </Label>
                <Col md={9} xs={12}>
                  <input
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kode"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="email-input">
                  Nama
                </Label>
                <Col md={9} xs={12}>
                  <input
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Nama"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="username-input">
                  Status
                </Label>
                <Col md={9} xs={12}>
                  <FormGroup check inline>
                    <Label check>
                      <input
                        type="radio"
                        name="radio2"
                        className="radiobtn mt-3 ml-3"
                        style={{ color: "orange" }}
                      />
                      Active
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <input
                        type="radio"
                        name="radio2"
                        className="radiobtn mt-3 ml-3"
                        style={{ backgroundColor: "green" }}
                      />{" "}
                      Non Active
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="password-input">
                  Tarif
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Masukkan Jumlah"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="role-input">
                  Grup
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="status-input">
                  Parent Group
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="note-input">
                  Deskripsi
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Masukkan Deskripsi"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="lastlogin-input">
                  Last Login
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <div className="float-right">
                <Link to="/app/tables/kelompokpelanggan">
                  <Button
                    className="my-5 px-5 ml-5"
                    color="light"
                    type="submit"
                  >
                    Kembali
                  </Button>
                  <Button
                    className="my-5 px-5 ml-5"
                    color="primary"
                    type="submit"
                  >
                    Simpan
                  </Button>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditdatakelompokPelanggan;
