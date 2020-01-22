import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge
} from "reactstrap";
import $ from "jquery";

import { Link } from "react-router-dom";

import Widget from "../../../components/Widget";
import s from "./Roledata.module.scss";

class Roledata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRole: [
        {
          kode: "KSRO1",
          nama: "kasir"
        },
        {
          kode: "KSRO1",
          nama: "kasir"
        },
        {
          kode: "KSRO1",
          nama: "kasir"
        },
        {
          kode: "KSRO1",
          nama: "kasir"
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
                    Data <span>Role</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>Role</h3>
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
                <button className="btn btn-primary">Tambah Data</button>
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
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {/* eslint-disable */}
                    <tbody id="myTable">
                      {this.state.dataRole ? (
                        this.state.dataRole.map(item => {
                          return (
                            <tr>
                              <td>{item.kode}</td>
                              <td>{item.nama}</td>
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
                                <Link to="/app/forms/editroledata">
                                  <a href="#" className="mr-1">
                                    <span className="text-success">
                                      <i class="far fa-edit"></i>
                                      Ubah
                                    </span>
                                  </a>
                                </Link>
                                <a href="#" className="ml-1">
                                  <span className="text-danger">
                                    <i class="fas fa-trash"></i>
                                    Hapus
                                  </span>
                                </a>
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

export default Roledata;
