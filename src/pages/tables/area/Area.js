import React from "react";
import { Row, Col, Table } from "reactstrap";
import s from "./Area.module.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import axios from "axios";
import $ from "jquery";

import config from "../../../config";

class Area extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArea: [
        {
          code: "20160801003",
          name: "Anggun"
        },
        {
          code: "20160801003",
          name: "Aldo"
        }
      ],
      status: ""
    };
  }

  componentDidMount() {
    // GET data
    if (localStorage.getItem("token")) {
      axios
        .get(config.remote + "/api/area")
        .then(res => {
          console.log(res);
          this.setState({
            dataArea: res.data.message.data,
            status: res.data.status
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // DELETE
  handleDelete(id) {
    let confirm = window.confirm("delete data, are you sure?");
    console.log(confirm);
    if (confirm) {
      axios
        .delete("http://swm-apis.herokuapp.com/api/area/" + id)
        .then(res => {
          console.log(res);
          alert(res.data.status);
          window.location.reload();
        })
        .catch(err => {
          alert(err.data.status);
        });
    }
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
                  <li className="breadcrumb-item active">Area</li>
                </ol>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Area</span>
                </h3>
              </Col>
              <Col lg={4}>
                <input
                  className="form-control my-3"
                  id="myInput"
                  placeholder="Search"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col>
              <Col lg={4} className="text-right">
                <Link
                  to="/app/forms/createdataarea"
                  className="btn text-white bg-primary"
                >
                  Tambah Data
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="table-responsive">
                  <Table className="table-hover border-0">
                    <thead>
                      <tr>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {/* eslint-disable */}
                    <tbody id="myTable">
                      {this.state.dataArea.length > 0 ? (
                        this.state.dataArea.map(item => {
                          return (
                            <tr>
                              <td>{item.code}</td>
                              <td>{item.name}</td>
                              <td>
                                <Link
                                  to={"/app/forms/editdataarea/" + item._id}
                                >
                                  <span className="text-success">
                                    <i className="far fa-edit"></i>
                                    Ubah
                                  </span>
                                </Link>
                                <a
                                  onClick={() => this.handleDelete(item._id)}
                                  className="ml-1"
                                >
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
//aaaaaaa bbbbbb
export default Area;
