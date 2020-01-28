import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatarole.module.scss";
import { Link } from "react-router-dom";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class Editdatarole extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={6}>
            <h1 className="page-title">
              Edit Data <span className="fw-semi-bold"> Role</span>
            </h1>
            <Widget refresh collapse close className="px-5">
              <Form className="mt-5">
                <FormGroup row>
                  <Label for="nama-input">Kode</Label>
                  <Input
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Kode"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="email-input">Nama</Label>
                  <Input
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Nama"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="username-input">Deskripsi</Label>
                  <Input
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="password-input">Aktif</Label>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio2"
                        className="radiobtn ml-5"
                        style={{ color: "orange" }}
                      />
                      Active
                    </Label>
                    <Label check>
                      <Input
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
                  <Label for="role-input">Menu Akses</Label>
                  <Input
                    className="form-control"
                    id="inputlg"
                    placeholder="Masukkan Data"
                    aria-label="Search"
                    type="text"
                    style={{ color: "#FFF" }}
                  />
                </FormGroup>
                <div className="float-right">
                  <Button
                    className="my-5 px-5 ml-5"
                    color="light"
                    type="button"
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
                </div>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Editdatarole;
