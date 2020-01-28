import React from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Form,
  CustomInput,
  Input
} from "reactstrap";
// import Formsy from "formsy-react";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import s from "./metertesting.module.scss";

import config from "../../../config";
// import InputValidation fro m "../../../components/InputValidation";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget/Widget";

class Metertesting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valveControl: 0,
      nameplate: "19178802"
    };
    //
    this.goBack = this.goBack.bind(this);
  }

  getDataMeter = e => {
    e.preventDefault();
    axios
      .post("/api/meter/")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  getTokenMeter = e => {
    e.preventDefault();
    axios
      .post("/api/meter/login")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  doChangeValveControl = e => {
    e.preventDefault();
    const postData = {
      valveControl: this.state.valveControl,
      nameplate: this.state.nameplate
    };

    console.log(postData);

    axios
      .post("/api/meter/valve", postData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  handleValveChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // parse ke INT
    const valueToInt = parseInt(value);

    this.setState({
      [name]: valueToInt
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    // id
    console.log(this.props);
    console.log(this.state);

    console.log(document.cookie);

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={12} className="text-center">
            <h1 className="page-title">
              Meter <span className="fw-semi-bold">Testing</span>
            </h1>
          </Col>
          <Col lg={6}>
            <Widget collapse className="px-5">
              <Button
                onClick={this.getTokenMeter}
                className="bg-danger mr-2"
                color="transparent"
              >
                <i class="fa fa-refresh"></i> Refresh
              </Button>
              <Button
                onClick={this.getDataMeter}
                className="bg-warning"
                color="transparent"
              >
                Get Data Meter
              </Button>
              <Form onSubmit={this.doChangeValveControl} className="mt-4">
                <FormGroup row className="px-4">
                  <Label for="valveTesting" className="mr-5">
                    Valve
                  </Label>
                  <FormGroup check inline>
                    <Label check>
                      <input
                        type="radio"
                        className="radiobtn ml-5"
                        onChange={this.handleValveChange}
                        value={1}
                        id="valveTesting"
                        name="valveControl"
                        label="nyala"
                      />
                      ON
                    </Label>
                    <Label check>
                      <input
                        type="radio"
                        className="radiobtn ml-5"
                        value={0}
                        onChange={this.handleValveChange}
                        id="valveTesting"
                        name="valveControl"
                        label="mati"
                      />
                      OFF
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <button type="submit" className="btn btn-success">
                    POST
                  </button>
                </FormGroup>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Metertesting;
