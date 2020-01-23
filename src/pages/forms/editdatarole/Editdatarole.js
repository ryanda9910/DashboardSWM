import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatarole.module.scss";
import { Link } from "react-router-dom";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class Editdatarole extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <h1 className="page-title">
            Edit Data <span className="fw-semi-bold"> Role</span>
          </h1>
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
                <Label md={3} xs={12} for="username-input">
                  Deskripsi
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
                  Aktif
                </Label>
                <FormGroup check inline>
                  <Label check>
                    <input
                      type="radio"
                      name="radio2"
                      className="radiobtn ml-5"
                      style={{ color: "orange" }}
                    />
                    Active
                  </Label>
                  <Label check>
                    <input
                      type="radio"
                      name="radio2"
                      className="radiobtn ml-5"
                      style={{ color: "orange" }}
                    />
                    Non Active
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup row>
                <Label md={3} xs={12} for="role-input">
                  Menu Akses
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
              <div className="float-right">
                <Link to="/app/tables/roledata">
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

export default Editdatarole;
