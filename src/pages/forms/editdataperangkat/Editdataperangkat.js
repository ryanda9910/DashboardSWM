import React from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  InputGroup
} from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdataperangkat.module.scss";
import { Link } from "react-router-dom";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class Editdataperangkat extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Col lg={12} className="py-5 mx-5 my-5">
          <h3 className="page-title fw-semi-bold">Edit Data Perangkat </h3>
          <Widget refresh collapse close className="px-5">
            <Form className="py-5 px-5">
              <FormGroup row>
                <Label for="nama-input">Kode</Label>
                <Input
                  className="form-control"
                  id="inputlg"
                  placeholder="Masukkan Kode"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="email-input">Serial Number</Label>
                <Input
                  className="form-control"
                  id="inputlg"
                  placeholder="Masukkan Nomor Seri"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="email-input">Tipe</Label>
                <Input
                  className="form-control"
                  id="inputlg"
                  placeholder="Masukkan Tipe"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="password-input">Model</Label>
                <Input
                  className="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="role-input">Parent</Label>
                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="status-input">Last Update</Label>

                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="note-input">Value</Label>
                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="lastlogin-input">Signal</Label>
                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="lastlogin-input">Baterry Voltage</Label>
                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="lastlogin-input">Wilayah/Area</Label>
                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="password-input">Status</Label>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio2"
                      className="radiobtn ml-5"
                      style={{ color: "orange" }}
                    />
                    Online
                  </Label>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio2"
                      className="radiobtn ml-5"
                      style={{ color: "orange" }}
                    />
                    Offline
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup row>
                <Label for="lastlogin-input">Exp</Label>
                <Input
                  class="form-control"
                  id="inputlg"
                  placeholder="Masukkan Data"
                  aria-label="Search"
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <div className="float-right">
                <Link to="/app/tables/panelmeter/">
                  <Button
                    className="my-5 px-5 ml-5"
                    color="light"
                    type="submit"
                  >
                    Kembali
                  </Button>
                  <Button
                    className=" ml-5 px-5 mx-5"
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
      </div>
    );
  }
}

export default Editdataperangkat;
