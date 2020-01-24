import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./createdatabillingcostumer.module.scss";
import { Link } from "react-router-dom";

import Widget from "../../../components/Widget";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class CreateDataBillingCostumer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="py-5 px-5">
          <Col lg={12}>
            <Widget refresh collapse close className="px-5">
              <h2 className="page-title justify-content-center">
                Create Costumer Billing
              </h2>
              <h5 className="py-5 fw-semi-bold ">
                Informasi Profile Pelanggan
              </h5>
              <Form>
                <FormGroup row>
                  <Label lg={3} xs={12} for="nama-input">
                    Kode
                  </Label>
                  <Col lg={6} xs={12}>
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
                    Nama Pelanggan
                  </Label>
                  <Col lg={6} xs={12}>
                    <input
                      className="form-control"
                      id="inputlg"
                      placeholder="Masukkan Nama Pelanggan"
                      aria-label="Search"
                      type="text"
                      style={{ color: "#FFF" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} xs={12} for="username-input">
                    Batas Melakukan Pembayaran
                  </Label>
                  <Col lg={6} xs={12}>
                    <input
                      className="form-control"
                      id="inputlg"
                      placeholder="Masukkan Data"
                      aria-label="Search"
                      type="text"
                      style={{ color: "#FFF" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} xs={12} for="password-input">
                    Kategori
                  </Label>
                  <Col lg={6} xs={12}>
                    <input
                      className="form-control"
                      id="inputlg"
                      placeholder="Masukkan Kategori"
                      aria-label="Search"
                      type="text"
                      style={{ color: "#FFF" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} xs={12} for="role-input">
                    Kelompok Pelanggan
                  </Label>
                  <Col lg={6} xs={12}>
                    <input
                      className="form-control"
                      id="inputlg"
                      placeholder="Masukkan Kelompok Pelanggan"
                      aria-label="Search"
                      type="text"
                      style={{ color: "#FFF" }}
                    />
                  </Col>
                </FormGroup>
                <Form>
                  <h5 className="py-5 fw-semi-bold">Deskripsi Pembayaran </h5>
                  <FormGroup row>
                    <Label md={3} xs={12} for="nama-input">
                      Pemabayaran bulan ke -
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
                        id="inputlg"
                        placeholder="Masukkan Data "
                        aria-label="Search"
                        type="text"
                        style={{ color: "#FFF" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} xs={12} for="email-input">
                      Pemakaian
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
                        id="inputlg"
                        placeholder="Masukkan Data "
                        aria-label="Search"
                        type="text"
                        style={{ color: "#FFF" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} xs={12} for="username-input">
                      Tarif Subsidi
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
                        id="inputlg"
                        placeholder="Masukkan Data"
                        aria-label="Search"
                        type="text"
                        style={{ color: "#FFF" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} xs={12} for="password-input">
                      Tarif Progresive
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
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
                      Biaya Langganan
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
                        id="inputlg"
                        placeholder="Masukkan Jumlah"
                        aria-label="Search"
                        type="text"
                        style={{ color: "#FFF" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} xs={12} for="status-input">
                      Jumlah Pembayaran
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
                        id="inputlg"
                        placeholder="Masukkan Jumlah"
                        aria-label="Search"
                        type="text"
                        style={{ color: "#FFF" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} xs={12} for="note-input">
                      Catatan
                    </Label>
                    <Col lg={6} xs={12}>
                      <input
                        className="form-control"
                        id="inputlg"
                        placeholder="Masukkan Data"
                        aria-label="Search"
                        type="text"
                        style={{ color: "#FFF" }}
                      />
                    </Col>
                  </FormGroup>
                </Form>
                <div className="float-right">
                  <Link to="/app/tables/costumerbilling">
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
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateDataBillingCostumer;
