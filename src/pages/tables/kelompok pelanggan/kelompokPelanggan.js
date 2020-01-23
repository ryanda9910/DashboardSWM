import React, { Component } from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
// import ModalsKelompokPelanggan from "../../forms/ModalskelompokPelanggan/Modalskelompokpelanggan";
// import ReactDOM from "react-dom";

import $ from "jquery";

// import Widget from "../../../components/Widget/Widget";
import s from "./kelompokPelanggan.module.scss";
// import { useState } from "react";

class kelompokPelanggan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datakelompokPelanggan: [
        {
          kode: "A123",
          nama: "Sosial A",
          tarif: "Tarif Sosial A",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial A",
          tarif: "Tarif Sosial A",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial B",
          tarif: "Tarif Sosial B",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial A",
          tarif: "Tarif Sosial A",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial B",
          tarif: "Tarif Sosial B",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial C",
          tarif: "Tarif Sosial C",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial C",
          tarif: "Tarif Sosial C",
          grup: "Sosial"
        },
        {
          kode: "A123",
          nama: "Sosial B",
          tarif: "Tarif Sosial B",
          grup: "Sosial"
        }
      ]
    };
  }

  render() {
    // search
    $(document).ready(function() {
      $("#myInput").on("keyup", function() {
        var value = $(this)
          .val()
          .toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(value) > -1
          );
        });
      });
    });
    return (
      <div className={s.root}>
        <Row className="pt-3">
          <Col lg={12}>
            <Row>
              <Col lg={12}>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">YOU ARE HERE</li>
                  <li className="breadcrumb-item active">
                    Kelompok Pelanggan{" "}
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Kelompok Pelanggan</span>
                </h3>
              </Col>
              <Col lg={4}>
                <input
                  class="form-control my-3"
                  id="myInput"
                  placeholder="Search"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col>
              <Col lg={4} className="text-right">
                <button className="btn btn-primary">Tambah Data </button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="table-responsive">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Tarif</th>
                        <th>Grup</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {/* eslint-disable */}
                    <tbody id="myTable">
                      {this.state.datakelompokPelanggan ? (
                        this.state.datakelompokPelanggan.map(item => {
                          return (
                            <tr>
                              <td>{item.kode}</td>
                              <td>{item.nama}</td>
                              <td>{item.tarif}</td>
                              <td>{item.grup}</td>
                              <td>
                                <Badge
                                  color="success"
                                  className="text-secondary"
                                  pill
                                >
                                  AKTIF
                                </Badge>
                              </td>
                              <td>
                                <Link
                                  to="/app/forms/editdatakelompokpelanggan/"
                                  className="mr-1"
                                >
                                  <span className="text-success">
                                    <i class="far fa-edit"></i>
                                    Ubah
                                  </span>
                                </Link>
                                <Link to="#" className="ml-1">
                                  <span className="text-danger">
                                    <i class="fas fa-trash"></i>
                                    Hapus
                                  </span>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div>
                          <h2>Loading..</h2>
                        </div>
                      )}
                    </tbody>
                    {/* eslint-enable */}
                  </Table>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<kelompokPelanggan />, container);

export default kelompokPelanggan;
