import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input, FormText } from "reactstrap";
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

// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Editdataperangkat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // UPDATE
      customer_id: null,
      distributor_id: null,
      code: "",
      valve: "",
      status: "",
      signal: "",
      battery_voltage: "",
      lat: "",
      long: "",
      serial_number: "",
      model: "",
      manufacture: "",
      // 
      updateStatus: null,
      updateError: null
    };
    this.goBack = this.goBack.bind(this);
  }

  // SHOW data
  componentDidMount() {
    // id
    const id = this.props.match.params.id;
    axios
      .get("/api/device/" + id)
      .then(res => {
        console.log(res);
        this.setState({
          customer_id: res.data.data.customer_id,
          distributor_id: res.data.data.distributor_id,
          code: res.data.data.code,
          valve: res.data.data.valve,
          status: res.data.data.status,
          signal: res.data.data.signal,
          battery_voltage: res.data.data.battery_voltage,
          lat: res.data.data.lat,
          long: res.data.data.long,
          serial_number: res.data.data.serial_number,
          model: res.data.data.model,
          manufacture: res.data.data.manufacture,
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
      distributor_id: this.state.distributor_id,
      code: this.state.code,
      valve: this.state.valve,
      status: this.state.status,
      signal: this.state.signal,
      battery_voltage: this.state.battery_voltage,
      lat: this.state.lat,
      long: this.state.long,
      serial_number: this.state.serial_number,
      model: this.state.model,
      manufacture: this.state.manufacture,
    };

    console.log(data);
    // PUT
    const id = this.props.match.params.id;
    axios
      .put("/api/device/" + id, data)
      .then(res => {
        console.log(res);
        if (res.status >= 200 || res.status < 300) {
          this.setState({
            updateStatus: res.status
          });
            // ALERT
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: 'Berhasil',
            text: 'Data diubah.',
            icon: 'success',
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          updateError: "Something Wrong"
        });
      });
  };

  // TRACK CHANGE
  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    this.setState({
      [name]: value
    });
  };
  // KEMBALI
  goBack = () => {
    this.props.history.goBack();
  };
  
  // VALVE CHANGE
  handleValveChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    this.setState({
      [name]: value
    });
    // post update value
    const id = this.props.match.params.id;
    if(value){
      axios.post('/api/device/control/'+id).then(res => {
        console.log(id)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }else{
      axios.post('/api/device/control/'+id).then(res => {
        console.log(id)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  };
  // GET TOKEN
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

  render() {
    console.log(this.state);
    console.log(this.props);

    // redirect jika succes update
    if (this.state.updateStatus === 200) {
      return <Redirect to="/app/tables/panelmeter" />;
    }

    const { dataDistributor, dataPelanggan } = this.props;

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={4}>
            <Form>
              <Widget className="px-3">
                <h3 className="mb-5">Ubah Valve Meter</h3>
                <Button
                  onClick={this.getTokenMeter}
                  className="bg-danger mr-2"
                  color="transparent"
                >
                <i className="fa fa-refresh"></i> Resfresh
                </Button>
                <div className={s.root}>
                  <FormGroup className="display-inline-block checkbox-ios pt-4">
                    <Label for="valve" className="switch">
                      <Input
                        checked={this.state.valve}
                        onChange={this.handleValveChange}
                        type="checkbox"
                        id="valve"
                        name="valve"
                        className="ios"
                        label="Turn on this if True"
                      />
                      <i />
                      <Label for="valve" className="pl-3">
                        Valve
                      </Label>
                    </Label>
                  </FormGroup>
                </div>
                <Button color="dark" onClick={this.goBack}>
                  Kembali
                </Button>
              </Widget>
            </Form>
          </Col>
          <Col lg={6}>
            {/* <img src={avatar} alt="..." /> */}
            <Widget refresh collapse close className="px-5">
              <h3 className="page-title mb-5">Edit Data Perangkat</h3>
              <Form onSubmit={this.doUpdateData}>
                {/* customer_id */}
                <FormGroup>
                  <Label for="customer_id">Costumer ID </Label>
                  <Input
                    value={this.state.customer_id}
                    onChange={this.handleChange}
                    type="select"
                    name="customer_id"
                    id="customer_id"
                  >
                    {dataPelanggan.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* distributor_id */}
                <FormGroup>
                  <Label for="distributor_id">Distributor ID </Label>
                  <Input
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
                {/* code */}
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
                {/* valve */}
                {/* <div className={s.root}>
                  <FormGroup className="display-inline-block checkbox-ios pt-4">
                    <Label for="valve" className="switch">
                      <Input
                        checked={this.state.valve}
                        onChange={this.handleChange}
                        type="checkbox"
                        id="valve"
                        name="valve"
                        className="ios"
                        label="Turn on this if True"
                      />
                      <i />
                      <Label for="valve" className="pl-3">
                        Valve
                      </Label>
                    </Label>
                  </FormGroup>
                </div> */}
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
                        label="Turn on this if True"
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
                {/* signal */}
                <FormGroup>
                  <Label for="signal">Sinyal</Label>
                  <Input
                    value={this.state.signal}
                    onChange={this.handleChange}
                    type="text"
                    name="signal"
                    id="signal"
                    placeholder="Masukkan Sinyal"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* battery_voltage */}
                <FormGroup>
                  <Label for="battery_voltage">Voltase Baterai</Label>
                  <Input
                    value={this.state.battery_voltage}
                    onChange={this.handleChange}
                    type="text"
                    name="battery_voltage"
                    id="battery_voltage"
                    placeholder="Masukkan Voltase Baterai"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* lat */}
                <FormGroup>
                  <Label for="lat">Latitude</Label>
                  <Input
                    value={this.state.lat}
                    onChange={this.handleChange}
                    type="text"
                    name="lat"
                    id="lat"
                    placeholder="Masukkan Garis Lintang"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* long */}
                <FormGroup>
                  <Label for="long">Longitude</Label>
                  <Input
                    value={this.state.long}
                    onChange={this.handleChange}
                    type="text"
                    name="long"
                    id="long"
                    placeholder="Masukkan Garis Bujur"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* model */}
                <FormGroup>
                  <Label for="model">Model</Label>
                  <Input
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
                {/* serial_number */}
                <FormGroup>
                  <Label for="serial_number">Nomor Serial</Label>
                  <Input
                    value={this.state.serial_number}
                    onChange={this.handleChange}
                    type="text"
                    name="serial_number"
                    id="serial_number"
                    placeholder="Masukkan Nomor Serial"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* manufacture */}
                <FormGroup>
                  <Label for="manufacture">Manufaktur</Label>
                  <Input
                    value={this.state.manufacture}
                    onChange={this.handleChange}
                    type="text"
                    name="manufacture"
                    id="manufacture"
                    placeholder="Masukkan Manufaktur"
                  />
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
                    className="px-5 ml-5"
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
