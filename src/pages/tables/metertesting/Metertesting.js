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
      // valveControl: this.state.valveControl === true ? 1 : 0,
      valveControl: this.state.valveControl,
      nameplate: this.state.nameplate
    };

    console.log(postData);

    axios
      .post("/api/meter/valve", postData)
      // .post("/api/meter/lora/valve")
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
    // const valueToInt = parseInt(value);

    this.setState({
      [name]: value
    });
    // this.setState({
    //   [name]: valueToInt
    // });
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
                <i className="fa fa-refresh"></i> Refresh
              </Button>
              <Button
                onClick={this.getDataMeter}
                className="bg-warning"
                color="transparent"
              >
                Get Data Meter
              </Button>
              <Form onSubmit={this.doChangeValveControl} className="mt-4">
                <div className={s.root + " align-self-center"}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="valveControl" className="switch">
                      <Input
                        checked={this.state.valveControl}
                        onChange={this.handleValveChange}
                        type="checkbox"
                        id="valveControl"
                        name="valveControl"
                        className="ios"
                        label="Turn on this if True"
                      />
                      <i />
                      <Label
                        for="valveControl"
                        className="pl-3 fw-semi-bold py-3"
                        style={{ fontSize: "24px" }}
                      >
                        Valve
                      </Label>
                    </Label>
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                    {/* <FormText>Example help text that remains unchanged.</FormText> */}
                  </FormGroup>
                </div>
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
