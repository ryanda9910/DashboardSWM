import React from "react";
import { Row, Col, Table, Alert } from "reactstrap";
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

// CUSTOM
import config from "../../../config";
import Loader from "../../../components/Loader";
import cx from "classnames";
import s from "./Area.module.scss";
import Widget from "../../../components/Widget";

class Area extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArea: [
        // {
        //   code: "20160801003",
        //   name: "Anggun"
        // },
        // {
        //   code: "20160801003",
        //   name: "Aldo"
        // }
      ],
      isCreated: false,
      showAlert: false
    };
  }

  componentDidMount() {
    // GET data
    axios
      .get("/api/area")
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
    // ALERT
    return localStorage.getItem("isCreated") ? this.onShowAlert() : null;
  }

  // DELETE
  handleDelete(id) {
    let confirm = window.confirm("delete data, are you sure?");
    console.log(confirm);
    if (confirm) {
      axios
        .delete("/api/area/" + id)
        .then(res => {
          console.log(res);
          alert(res.data.status);
          window.location.reload();
          this.setState({
            succesDelete: true
          });
        })
        .catch(err => {
          alert(err.data.status);
        });
    }
  }

  onShowAlert = () => {
    this.setState(
      {
        showAlert: true
      },
      () => {
        window.setTimeout(() => {
          this.setState({
            showAlert: false
          });
        }, 2000);
      }
    );
    localStorage.removeItem("isCreated");
  };

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

    // if (this.state.successDelete === true) {
    //   return <Redirect to="/app/tables/area" />;
    // }

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
            <Alert
              color="success"
              className={cx(s.promoAlert, {
                [s.showAlert]: this.state.showAlert
              })}
            >
              {localStorage.getItem("isCreated") || "Data has been created"}
            </Alert>
            <Row className="align-items-center justify-content-between">
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Area</span>
                </h3>
              </Col>
              {/* alert */}
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
                  className="btn text-white bg-warning"
                >
                  Tambah Data
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Widget refresh collapse close className="px-2">
                  <div className="table-responsive">
                    <Table className="table-hover border-0">
                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nama</th>
                          <th>Kode Distributor</th>
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
                                <td></td>
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
//aaaaaaa bbbbbb
export default Area;
