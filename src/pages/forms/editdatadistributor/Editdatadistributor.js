import React from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  CustomInput
} from "reactstrap";
// import Formsy from "formsy-react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDataDistributor } from "../../../actions/tables/distributor";

import s from "./editdatadistributor.module.scss";
import config from "../../../config";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class Editdatadistributor extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // data
      code: "",
      isactive: "",
      name: "",
      contact: "",
      description: "",
      phone: "",
      email: "",
      tipe: "",
      //
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
      .get("/api/distributor/" + id)
      .then(res => {
        console.log(res);
        //
        this.setState({
          code: res.data.data.code,
          isactive: res.data.data.isactive,
          name: res.data.data.name,
          contact: res.data.data.contact,
          description: res.data.data.description,
          phone: res.data.data.phone,
          email: res.data.data.email,
          tipe: res.data.data.tipe
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
      isactive: this.state.isactive === true ? "true" : "false",
      name: this.state.name,
      contact: this.state.contact,
      description: this.state.description,
      phone: this.state.phone,
      email: this.state.email,
      tipe: this.state.tipe
    };

    console.log(data);

    // PUT
    const id = this.props.match.params.id;
    axios
      .put("/api/distributor/" + id, data)
      .then(res => {
        console.log(res);
        //
        if (res.status >= 200 || res.status < 300) {
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

  // track change
  handleChange = e => {
    // handle checkedbox: https://stackoverflow.com/questions/55530348/react-how-to-pass-the-condition-when-checkbox-is-checked
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(value);
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
      return <Redirect to="/app/tables/distributor" />;
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
              Edit Data <span className="fw-semi-bold">Distributor</span>
            </h1>
          </Col>
          <Col lg={12}>
            <Widget refresh collapse className="px-5">
              <Form onSubmit={this.doUpdateDataArea} className="mt-4">
                {/* show ERROR */}
                <FormGroup className="bg-danger">{updateError}</FormGroup>
                {/* code */}
                <FormGroup>
                  <Label for="code">Kode</Label>
                  <Input
                    required
                    value={this.state.code}
                    name="code"
                    onChange={this.handleChange}
                    id="code"
                    placeholder="Masukkan Kode "
                    type="text"
                  />
                </FormGroup>
                <div className={s.root}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="exampleActive" className="switch">
                      <Input
                        checked={this.state.isactive}
                        onChange={this.handleChange}
                        type="checkbox"
                        id="exampleActive"
                        name="isactive"
                        className="ios"
                        label="Turn on this if True"
                      />
                      <i />
                      Status
                    </Label>
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                    {/* <FormText>Example help text that remains unchanged.</FormText> */}
                  </FormGroup>
                </div>
                {/* name */}
                <FormGroup>
                  <Label for="name">Nama</Label>
                  <Input
                    required
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    id="name"
                    placeholder="Masukkan Nama"
                    type="text"
                  />
                </FormGroup>
                {/* contact */}
                <FormGroup>
                  <Label for="contact">Kontak</Label>
                  <Input
                    required
                    value={this.state.contact}
                    name="contact"
                    onChange={this.handleChange}
                    id="contact"
                    placeholder="Masukkan Kontak "
                    type="text"
                  />
                </FormGroup>
                {/* description */}
                <FormGroup>
                  <Label for="description">Deskripsi</Label>
                  <Input
                    required
                    value={this.state.description}
                    name="description"
                    onChange={this.handleChange}
                    id="description"
                    placeholder="Masukkan Deskripsi"
                    type="text"
                  />
                </FormGroup>
                {/* phone */}
                <FormGroup>
                  <Label for="phone">Telepon</Label>
                  <Input
                    required
                    value={this.state.phone}
                    name="phone"
                    onChange={this.handleChange}
                    id="phone"
                    placeholder="Masukkan Telepon"
                  />
                </FormGroup>
                {/* email */}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    required
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                    id="email"
                    placeholder="Masukkan Email"
                    type="text"
                  />
                </FormGroup>
                {/* tipe */}
                <FormGroup>
                  <Label for="tipe">Tipe</Label>
                  <Input
                    required
                    value={this.state.tipe}
                    name="tipe"
                    onChange={this.handleChange}
                    id="tipe"
                    placeholder="Masukkan tipe"
                    type="text"
                  />
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
    // dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default connect(mapStateToProps)(Editdatadistributor);
