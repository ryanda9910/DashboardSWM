import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";

import s from "./editdatarole.module.scss";
import { Link } from "react-router-dom";

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
                {/* Isactive */}
                <div className={s.root + " align-self-center"}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="isactive" className="switch">
                      <Input
                        onChange={this.handleCreateChange}
                        type="checkbox"
                        id="isactive"
                        name="isactive"
                        className="ios"
                        label="Turn on this if True"
                      />
                      <i />
                      <Label for="isactive" className="pl-3">
                        Is Active
                      </Label>
                    </Label>
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                    {/* <FormText>Example help text that remains unchanged.</FormText> */}
                  </FormGroup>
                </div>
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
