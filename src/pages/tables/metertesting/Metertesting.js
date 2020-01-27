import React from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Form,
  CustomInput
} from "reactstrap";
// import Formsy from "formsy-react";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import s from "./metertesting.module.scss";

import config from "../../../config";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget/Widget";

class Metertesting extends React.Component {
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
              Meter <span className="fw-semi-bold">Testing</span>
            </h1>
          </Col>
          <Col lg={6}>
            <Button className="pl-2" color="transparent">
              <i class="fa fa-refresh" aria-hidden="true">
                Refresh
              </i>
            </Button>
            <Widget refresh collapse className="px-5">
              <Form onSubmit={this.doUpdateDataArea} className="mt-4">
                {/* show ERROR */}
                <FormGroup row className="bg-danger">
                  {updateError}
                </FormGroup>
                <FormGroup row>
                  <Label for="nama-input" className="fw-semi-bold">
                    Valve
                  </Label>
                  <Col lg={8} className="ml-5 px-5">
                    <CustomInput
                      row
                      onChange={this.handleCreateChange}
                      type="switch"
                      id="exampleStatus"
                      name="status"
                      label="ON/OFF"
                    />
                  </Col>
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
