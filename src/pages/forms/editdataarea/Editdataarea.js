import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDataDistributor } from "../../../actions/tables/distributor";

import s from "./editdataarea.module.scss";
import config from "../../../config";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class Editdataarea extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      distributor_id: null,
      updateStatus: null,
      updateError: null
    };
    //
    this.goBack = this.goBack.bind(this);
  }

  // GET data
  componentDidMount() {
    // id
    const id = this.props.match.params.id;
    axios
      .get("/api/area/" + id)
      .then(res => {
        console.log(res);
        //
        this.setState({
          code: res.data.data.code,
          name: res.data.data.name,
          distributor_id: res.data.data.distributor_id
        });
      })
      .catch(err => {
        console.log(err);
      });

    // DATA DISTRIBUTOR
    this.props.dispatch(getDataDistributor());
  }

  // UPDATE
  doUpdateDataArea = e => {
    e.preventDefault();
    const data = {
      code: this.state.code,
      name: this.state.name,
      distributor_id: this.state.distributor_id
    };

    // PUT
    const id = this.props.match.params.id;
    axios
      .put("/api/area/" + id, data)
      .then(res => {
        console.log(res);
        //
        if (res.status >= 200 || res.status < 300) {
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

    const { dataDistributor } = this.props;

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
          <Col lg={8}>
            <Widget refresh collapse className="px-5">
              <Form onSubmit={this.doUpdateDataArea} className="mt-4">
                {/* show ERROR */}
                <FormGroup className="bg-danger">{updateError}</FormGroup>
                <FormGroup>
                  <Label for="nama-input">Kode</Label>
                  <Input
                    required
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
                <FormGroup>
                  <Label for="email-input">Nama</Label>
                  <Input
                    required
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
                {/* distributor_id */}
                <FormGroup>
                  <Label>ID Distributor</Label>
                  <Input
                    required
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
                    type="select"
                    name="distributor_id"
                  >
                    {dataDistributor.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                </FormGroup>
                <Button color="dark" onClick={this.goBack}>
                  Kembali
                </Button>

                <Button
                  color="warning"
                  className="my-5 px-5 ml-5"
                  type="submit"
                >
                  Perbarui Data
                </Button>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default connect(mapStateToProps)(Editdataarea);
