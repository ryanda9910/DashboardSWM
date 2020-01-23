import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatausers.module.scss";
import { Link } from "react-router-dom";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class Editdatausers extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <h1 className="page-title">
            Edit Data <span className="fw-semi-bold"> User</span>
          </h1>
          <h1 className="mt-5 mr-5">picture</h1>
          <Col lg={6}>
            <Form className="mt-5">
              <FormGroup row>
                <Label md={3} xs={12} for="nama-input">
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
                  Email
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
                  Username
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
                  Password
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
                  Role
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
                <Label md={3} xs={12} for="status-input">
                  Status
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
                <Label md={3} xs={12} for="note-input">
                  Note
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
                <Label md={3} xs={12} for="lastlogin-input">
                  Last Login
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
                <Link to="/app/tables/userdata">
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

export default Editdatausers;
