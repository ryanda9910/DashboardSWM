import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdataperangkat.module.scss";
import { Link } from "react-router-dom";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class Editdataperangkat extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5">
          <h3 className="page-title fw-semi-bold">Edit Data Perangkat </h3>
          <Col lg={6} className="py-5 mx-5 my-5">
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
                  Serial Number
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
                  Tipe
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
                  Model
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
                <Label md={3} xs={12} for="role-input">
                  Parent
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
                  Last Update
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
                  Value
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
                  Signal
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
                  Baterry Voltage
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
                  Wilayah/Area
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
                <Label md={3} xs={12} for="password-input">
                  Status
                </Label>
                <FormGroup check inline>
                  <Label check>
                    <input
                      type="radio"
                      name="radio2"
                      className="radiobtn ml-5"
                      style={{ color: "orange" }}
                    />
                    Online
                  </Label>
                  <Label check>
                    <input
                      type="radio"
                      name="radio2"
                      className="radiobtn ml-5"
                      style={{ color: "orange" }}
                    />
                    Offline
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="lastlogin-input">
                  Exp
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
                <Link to="/app/tables/panelmeter/">
                  <Button
                    className="my-5 px-5 ml-5"
                    color="light"
                    type="submit"
                  >
                    Kembali
                  </Button>
                  <Button
                    className=" ml-5 px-5 mx-5"
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

export default Editdataperangkat;
