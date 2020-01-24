import React from "react";
import {
  Row,
  Col,
  Table
  // Progress,
  // Button,
  // UncontrolledButtonDropdown,
  // DropdownMenu,
  // DropdownToggle,
  // DropdownItem,
  // Input,
  // Label,
  // Badge
} from "reactstrap";
import $ from "jquery";

import Widget from "../../../components/Widget";
import s from "./Panelmeter.module.scss";
import { Link } from "react-router-dom";
import { fromArray } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

//LOADER
import Loader from "../../../components/Loader/Loader";

class Panelmeter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // image: require("../../../images/tables/1.png"), // eslint-disable-line global-require
      // new Date("September 14, 2012")
      dataPerangkat: [
        {
          kode: "19178802",
          serialNumber: "	1155522254446528",
          tipe: "Meter Air",
          model: "Meter Air DN15",
          parent: "22556625",
          lastUpdate: new Date("September 14, 2012"),
          valve: "Open/Closed",
          signal: "21",
          batteryVoltage: "3.7354",
          wilayahArea: "Tangerang",
          status: "Online/Offline",
          exp: new Date("September 14, 2022")
        },
        {
          kode: "19178802",
          serialNumber: "	1155522254446528",
          tipe: "Meter Air",
          model: "Meter Air DN15",
          parent: "22556625",
          lastUpdate: new Date("September 14, 2012"),
          valve: "Open/Closed",
          signal: "21",
          batteryVoltage: "3.7354",
          wilayahArea: "Tangerang Selatan",
          status: "Online/Offline",
          exp: new Date("September 14, 2022")
        },
        {
          kode: "19178802",
          serialNumber: "	1155522254446528",
          tipe: "Meter Air",
          model: "Meter Air DN15",
          parent: "22556625",
          lastUpdate: new Date("September 14, 2012"),
          valve: "Open/Closed",
          signal: "21",
          batteryVoltage: "3.7354",
          wilayahArea: "Jakarta",
          status: "Online/Offline",
          exp: new Date("September 14, 2022")
        }
      ]
    };

    // this.checkAll = this.checkAll.bind(this);
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
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
                  <li className="breadcrumb-item active">Perangkat </li>
                </ol>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <h3>
                  Data <span className="fw-semi-bold">Perangkat</span>
                </h3>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col lg={4}>
                <input
                  className="form-control my-3 "
                  id="myInput"
                  placeholder="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </Col>
              <Col lg={4} className="text-right">
                <Link
                  to="/app/forms/createdataperangkat"
                  className="btn text-white bg-warning"
                >
                  Tambah Data
                </Link>
              </Col>
            </Row>
            <Row className={s.rowTable}>
              <Col lg={12}>
                <div>
                  <Widget refresh collapse close className="px-2">
                    <Table className="table-hover table-responsive">
                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nomor Seri</th>
                          <th>Tipe</th>
                          <th>Model</th>
                          <th>Parent</th>
                          <th>Last Update</th>
                          <th>Valve</th>
                          <th>Signal</th>
                          <th>Battery Voltage</th>
                          <th>Wilayah/Area</th>
                          <th>Status</th>
                          <th>EXP</th>
                          <th>Aksi</th>
                          <th>Lokasi</th>
                        </tr>
                      </thead>
                      {/* eslint-disable */}
                      <tbody id="myTable">
                        {this.state.dataPerangkat ? (
                          this.state.dataPerangkat.map(item => {
                            return (
                              <tr>
                                <td>{item.kode}</td>
                                <td>{item.serialNumber}</td>
                                <td>{item.tipe}</td>
                                <td>{item.model}</td>
                                <td>{item.parent}</td>
                                <td>{this.parseDate(item.lastUpdate)}</td>
                                <td>{item.valve}</td>
                                <td>{item.signal}</td>
                                <td>{item.batteryVoltage}</td>
                                <td>{item.wilayahArea}</td>
                                <td>{item.status}</td>
                                <td>{this.parseDate(item.exp)}</td>
                                <td>
                                  <Link to="/app/forms/editdataperangkat/">
                                    <a href="#" className="mr-1">
                                      <span className="text-success">
                                        <i class="far fa-edit"></i>
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
                                <td>
                                  <a href="#" className="ml-1">
                                    <span className="text-primary">
                                      <i className="fas fa-globe pl-3"></i>
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
                  </Widget>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Panelmeter;
