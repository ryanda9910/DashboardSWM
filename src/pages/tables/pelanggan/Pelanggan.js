import { Row, Col, Table, Badge } from "reactstrap";
import React, { Component } from "react";
import $ from "jquery";

// import Widget from "../../../components/Widget";
import s from "./Pelanggan.module.scss";
import { Link } from "react-router-dom";

//LOADER
import Loader from "../../../components/Loader/Loader";

class Pelanggan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: require("../../../images/tables/1.png"), // eslint-disable-line global-require
      // new Date("September 14, 2012")
      dataPelanggan: [
        {
          kode: "2.001.5.00.0005100",
          nama: "Adam",
          telepon: "0811020019",
          email: "adam@gmail.com"
        },
        {
          kode: "2.002.5.00.0005100",
          nama: "Anggun",
          telepon: "0811678019",
          email: "anggun@gmail.com"
        },
        {
          kode: "2.003.5.00.0005100",
          nama: "Hendri",
          telepon: "0812320019",
          email: "Hendri@gmail.com"
        },
        {
          kode: "2.004.5.00.0005100",
          nama: "Aldo",
          telepon: "0810920019",
          email: "Aldo@gmail.com"
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
                  <li className="breadcrumb-item active"> Pelanggan </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Pelanggan</span>
                </h3>
              </Col>
              <Col lg={4}>
                <input
                  className="form-control my-3"
                  id="myInput"
                  placeholder="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col>
              <Col lg={4} className="text-right">
                <button className="btn bg-warning text-white">
                  Tambah Data{" "}
                </button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="table-hover table-responsive">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Telepon</th>
                        <th>Email</th>
                        <th>Tipe</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {/* eslint-disable */}
                    <tbody id="myTable">
                      {this.state.dataPelanggan ? (
                        this.state.dataPelanggan.map(item => {
                          return (
                            <tr>
                              <td>{item.kode}</td>
                              <td>{item.nama}</td>
                              <td>{item.telepon}</td>
                              <td>{item.email}</td>
                              <td>
                                <Badge
                                  color="success"
                                  className="text-white"
                                  pill
                                >
                                  Prabayar
                                </Badge>
                              </td>
                              <td>
                                <Badge
                                  color="warning"
                                  className="text-white"
                                  pill
                                >
                                  Tutup Sementara
                                </Badge>
                              </td>
                              <td>
                                <Link to="/app/forms/editdatapelanggan">
                                  <a href="#" className="mr-1">
                                    <span className="text-success">
                                      <i className="far fa-edit"></i>
                                      Ubah
                                    </span>
                                  </a>
                                </Link>
                                <a href="#" className="ml-1">
                                  <span className="text-danger">
                                    <i className="fas fa-trash"></i>
                                    Hapus
                                  </span>
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <Loader size={35} className="pt-5 position-absolute" />
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

export default Pelanggan;
