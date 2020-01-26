import React from "react";
import {
  Row,
  Col,
  Table,
  // Progress,
  // Button,
  // UncontrolledButtonDropdown,
  // DropdownMenu,
  // DropdownToggle,
  // DropdownItem,
  // Input,
  // Label,
  Badge
} from "reactstrap";
import $ from "jquery";

import Widget from "../../../components/Widget/Widget";
import s from "./Userdata.module.scss";
import { Link } from "react-router-dom";
//LOADER
import Loader from "../../../components/Loader/Loader";

class Userdata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: require("../../../images/tables/1.png"), // eslint-disable-line global-require
      // new Date("September 14, 2012")
      dataUser: [
        {
          nama: "Anggun",
          email: "anggun@gmail.com",
          username: "Anggun",
          role: "KSR01"
        },
        {
          nama: "Adam",
          email: "adam@gmail.com",
          username: "Adam",
          role: "KSR01"
        },
        {
          nama: "Hendri",
          email: "hendri@gmail.com",
          username: "Hendri",
          role: "KSR01"
        },
        {
          nama: "Aldo",
          email: "aldo@gmail.com",
          username: "Aldo",
          role: "KSR01"
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
                    Data <span>User</span>
                  </li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>User</h3>
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
                <Link
                  to="/app/forms/createdatauser"
                  className="btn text-white bg-warning"
                >
                  Tambah Data
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Widget refresh collapse close className="px-2">
                  <div className="table-hover table-responsive">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Email</th>
                          <th>Username</th>
                          <th>Role</th>
                          <th>Slug</th>
                          <th>Phone</th>
                          <th>Deskripsi</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      {/* eslint-disable */}
                      <tbody id="myTable">
                        {this.state.dataUser ? (
                          this.state.dataUser.map(item => {
                            return (
                              <tr>
                                <td>{item.nama}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>{item.role}</td>
                                <td></td>
                                <td></td>
                                <td></td>
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
                                  <Link to="/app/forms/editdatausers">
                                    <a href="#" className="mr-1">
                                      <span className="text-success">
                                        <i className="far fa-edit"></i>
                                        Ubah
                                      </span>
                                    </a>
                                    <a href="#" className="ml-1">
                                      <span className="text-danger">
                                        <i className="fas fa-trash"></i>
                                        Hapus
                                      </span>
                                    </a>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <Loader
                            size={35}
                            className="pt-5 position-absolute"
                          />
                        )}
                      </tbody>
                      {/* eslint-enable */}
                    </Table>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Userdata;
