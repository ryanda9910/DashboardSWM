import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdataperangkat.module.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

// import avatar from "../../images/people/a5.jpg";
// import { Image } from "@amcharts/amcharts4/core";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";
// data distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// data pelanggan
import { getDataPelanggan } from "../../../actions/tables/pelanggan";

class Editdataperangkat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data
      costumer_id: null,
      code: "",
      tipe: "",
      model: "",
      manufaktur: "",
      lat: "",
      long: "",
      valve: "",
      status: "",
      distributor_id: null,
      //
      updateStatus: null,
      updateError: null
    };
    this.goBack = this.goBack.bind(this);
  }

  // GET data
  componentDidMount() {
    // id
    const id = this.props.match.params.id;
    axios
      .get("/api/device/" + id)
      .then(res => {
        console.log(res);
        //
        this.setState({
          customer_id: res.data.data.customer_id,
          code: res.data.data.code,
          tipe: res.data.data.tipe,
          model: res.data.data.model,
          manufaktur: res.data.data.manufaktur,
          lat: res.data.data.lat,
          long: res.data.data.long,
          valve: res.data.data.valve,
          status: res.data.data.status,
          distributor_id: res.data.data.distributor_id
        });
      })
      .catch(err => {
        console.log(err);
      });

    // distributor
    this.props.dispatch(getDataDistributor());
    // kelompok planggan
    this.props.dispatch(getDataPelanggan());
  }

  // UPDATE
  doUpdateData = e => {
    e.preventDefault();
    const data = {
      customer_id: this.state.customer_id,
      code: this.state.code,
      tipe: this.state.tipe,
      model: this.state.model,
      manufaktur: this.state.manufaktur,
      lat: this.state.lat,
      long: this.state.long,
      status: this.state.status,
      distributor_id: this.state.distributor_id
    };

    console.log(data);

    // PUT
    const id = this.props.match.params.id;
    axios
      .put("/api/device/" + id, data)
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
    console.log(this.state);
    console.log(this.props);

    // redirect jika succes update
    if (this.state.updateStatus === 200) {
      return <Redirect to="/app/tables/panelmeter" />;
    }

    const { dataPerangkat, dataDistributor, dataPelanggan } = this.props;

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={6}>
            <h3 className="page-title fw-semi-bold">Edit Data Perangkat</h3>
            {/* <img src={avatar} alt="..." /> */}
            <Widget refresh collapse close className="px-5">
              <Form onSubmit={this.doUpdateData}>
                {/* customer_id */}
                <FormGroup>
                  <Label for="customer_group_id">Costumer ID </Label>
                  <Input
                    required
                    value={this.state.customer_id}
                    onChange={this.handleChange}
                    type="select"
                    name="customer_id"
                    id="customer_id"
                  >
                    {dataPelanggan.map(item => {
                      return <option value={item._id}>{item.code}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* name */}
                <FormGroup>
                  <Label for="code">Kode</Label>
                  <Input
                    value={this.state.code}
                    onChange={this.handleChange}
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Masukkan Kode"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* code */}
                <FormGroup>
                  <Label for="tipe">tipe</Label>
                  <Input
                    required
                    value={this.state.tipe}
                    onChange={this.handleChange}
                    type="text"
                    name="tipe"
                    id="tipe"
                    placeholder="Masukkan Tipe"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* email */}
                <FormGroup>
                  <Label for="email">Model</Label>
                  <Input
                    required
                    value={this.state.model}
                    onChange={this.handleChange}
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Masukkan Model"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* address */}
                <FormGroup>
                  <Label for="manufaktur">Manufaktur</Label>
                  <Input
                    required
                    value={this.state.manufaktur}
                    onChange={this.handleChange}
                    type="text"
                    name="manufaktur"
                    id="manufaktur"
                    placeholder="Masukkan Manfaktur"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* latitude */}
                <FormGroup>
                  <Label for="lat">Latitude</Label>
                  <Input
                    required
                    value={this.state.lat}
                    onChange={this.handleChange}
                    type="text"
                    name="lat"
                    id="lat"
                    placeholder="Masukkan Latitude"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* status */}
                <FormGroup>
                  <Label for="long">Longitude</Label>
                  <Input
                    required
                    value={this.state.long}
                    onChange={this.handleChange}
                    type="text"
                    name="long"
                    id="long"
                    placeholder="Masukkan Longitude"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* Valve */}
                <div className={s.root}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="valve" className="switch">
                      <Input
                        checked={this.state.isactive}
                        onChange={this.handleChange}
                        type="checkbox"
                        id="valve"
                        name="valve"
                        className="ios"
                      />
                      <i />
                      <Label for="valve" className="pl-3">
                        Valve
                      </Label>
                    </Label>
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                    {/* <FormText>Example help text that remains unchanged.</FormText> */}
                  </FormGroup>
                </div>
                {/* status */}
                <div className={s.root}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="status" className="switch">
                      <Input
                        checked={this.state.status}
                        onChange={this.handleChange}
                        type="checkbox"
                        id="status"
                        name="status"
                        className="ios"
                      />
                      <i />
                      <Label for="status" className="pl-3">
                        Status
                      </Label>
                    </Label>
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                    {/* <FormText>Example help text that remains unchanged.</FormText> */}
                  </FormGroup>
                </div>
                {/* distributor_id */}
                <FormGroup>
                  {/* tampilkan distributor name dan id nya sebagai value */}
                  <Label for="distributor_id">Distributor ID </Label>
                  <Input
                    required
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
                    type="select"
                    name="distributor_id"
                    id="distributor_id"
                  >
                    {dataDistributor.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>

                {/* button */}
                <div className="float-right">
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
                </div>
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
    // ALERT
    alertMessage: state.reducerPerangkat.alertMessage,
    // GET
    getSuccess: state.reducerPerangkat.getSuccess,
    getError: state.reducerPerangkat.getError,
    // dataPerangkat: state.reducerPerangkat.dataPerangkat,
    // CREATE
    createSuccess: state.reducerPerangkat.createSuccess,
    createError: state.reducerPerangkat.createError,
    // UPDATE
    updateSuccess: state.reducerPerangkat.updateSuccess,
    updateError: state.reducerPerangkat.updateError,
    // DELETE
    deleteSuccess: state.reducerPerangkat.deleteSuccess,
    deleteError: state.reducerPerangkat.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,

    // PELANGGAN
    dataPelanggan: state.reducerPelanggan.dataPelanggan
  };
}

export default connect(mapStateToProps)(Editdataperangkat);
