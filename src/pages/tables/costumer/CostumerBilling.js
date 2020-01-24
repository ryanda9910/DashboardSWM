import React from "react";
import { Row, Col, Table, Badge } from "reactstrap";
import $ from "jquery";
import s from "./costumer.module.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

//LOADER
import Loader from "../../../components/Loader/Loader";

class CostumerBilling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: require("../../../images/tables/1.png"), // eslint-disable-line global-require
      // new Date("September 14, 2012")
      dataUser: [
        {
          kode: "20160801003",
          nama: "Anggun",
          batasPembayaran: "20/12/2020",
          kategori: "PRABAYAR",
          kelompokPelanggan: "Social A",
          statusPembayaran: "Sudah Membayar"
        },
        {
          kode: "20160801003",
          nama: "Anggun",
          batasPembayaran: "20/12/2020",
          kategori: "PRABAYAR",
          kelompokPelanggan: "Social A",
          statusPembayaran: "Sudah Membayar"
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
                  <li className="breadcrumb-item active">Billing Customer</li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  <span className="fw-semi-bold">Billing Customer</span>
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
                        <th>Nama Pelanggan</th>
                        <th>Batas Pembayaran</th>
                        <th>Kategori</th>
                        <th>Kelompok Pelanggan</th>
                        <th>Status Pembayaran</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {/* eslint-disable */}
                    <tbody id="myTable">
                      {this.state.dataUser ? (
                        this.state.dataUser.map(item => {
                          return (
                            <tr>
                              <td>{item.kode}</td>
                              <td>{item.nama}</td>
                              <td>{item.batasPembayaran}</td>
                              <td>{item.kategori}</td>
                              <td>{item.kelompokPelanggan}</td>
                              <td>{item.statusPembayaran}</td>
                              <td>
                                <Link to="/app/forms/editdatacostumerbilling">
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

export default CostumerBilling;
