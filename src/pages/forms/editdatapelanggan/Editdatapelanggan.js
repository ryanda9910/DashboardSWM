import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatapelanggan.module.scss";
import { Link } from "react-router-dom";
// import avatar from "../../images/people/a5.jpg";
// import { Image } from "@amcharts/amcharts4/core";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class Editdatapelanggan extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5">
          <h3 className="page-title fw-semi-bold">Edit Data Pelanggan</h3>
          <Col lg={6} className="py-5 mx-5 my-5">
            {/* <img src={avatar} alt="..." /> */}
            <Form className="py-5 px-5">
              <FormGroup row>
                <Label md={3} xs={12} for="nama-input">
                  Kode
                </Label>
                <Col md={9} xs={12}>
                  <input
                    className="form-control"
                    id="inputlg"
                    placeholder="Search"
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
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="email-input">
                  Alamat
                </Label>
                <Col md={9} xs={12}>
                  <input
                    className="form-control"
                    id="inputlg"
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="password-input">
                  Telepon
                </Label>
                <Col md={9} xs={12}>
                  <input
                    className="form-control "
                    id="inputlg"
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="role-input">
                  Email
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="status-input">
                  Tipe
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="note-input">
                  Status
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="lastlogin-input">
                  Catatan
                </Label>
                <Col md={9} xs={12}>
                  <input
                    class="form-control"
                    id="inputlg"
                    placeholder="Search"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </Col>
              </FormGroup>
              <div className="float-right">
                <Link to="/app/tables/pelanggan">
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

export default Editdatapelanggan;
