import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdataarea.module.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import config from "../../../config";
// import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

class Editdataarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      updateStatus: null,
      updateError: null
    };
    //
    this.goBack = this.goBack.bind(this);
  }

  // GET data
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // id
      const id = this.props.match.params.id;
      axios
        .get(config.remote + "/api/area/" + id)
        .then(res => {
          console.log(res);
          //
          this.setState({
            code: res.data.data.code,
            name: res.data.data.name
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // UPDATE
  doUpdateDataArea = e => {
    e.preventDefault();
    const data = {
      code: this.state.code,
      name: this.state.name
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    // PUT
    const id = this.props.match.params.id;
    axios
      .put(config.remote + "/api/area/" + id, data, axiosConfig)
      .then(res => {
        console.log(res);
        //
        if (res.status === 200) {
          alert(res.data.status);
          this.setState({
            updateStatus: res.status
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          updateError: "Something Wrong"
        });
      });
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    // id
    console.log(this.props);
    console.log(this.state);

    // redirect jika succes update
    if (this.state.updateStatus === 200) {
      return <Redirect to="/app/tables/area" />;
    }

    // update error
    const updateError =
      this.state.updateError === null ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.state.updateError}</small>
        </div>
      );

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={12} className="text-center">
            <h1 className="page-title">
              Edit Data <span className="fw-semi-bold"> Area</span>
            </h1>
          </Col>
          <Col lg={7}>
            <Form onSubmit={this.doUpdateDataArea} className="mt-4">
              {/* show ERROR */}
              <FormGroup row className="bg-danger">
                {updateError}
              </FormGroup>
              <FormGroup row>
                <Label for="nama-input">Kode</Label>
                <input
                  value={this.state.code}
                  name="code"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputlg"
                  placeholder="Masukkan Kode "
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="email-input">Nama</Label>
                <input
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputlg"
                  placeholder="Masukkan Nama "
                  type="text"
                  style={{ color: "#FFF" }}
                />
              </FormGroup>
              <div>
                <a
                  onClick={this.goBack}
                  className="text-dark btn btn-light px-5"
                >
                  Kembali
                </a>
                <Button className="px-5 ml-3" color="primary" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Editdataarea;
