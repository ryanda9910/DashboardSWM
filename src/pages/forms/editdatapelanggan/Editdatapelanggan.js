import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatapelanggan.module.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

// import avatar from "../../images/people/a5.jpg";
// import { Image } from "@amcharts/amcharts4/core";
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";
// data distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// data kelompok pelanggan
import { getDataKelompokPelanggan } from "../../../actions/tables/kelompokpelanggan";
// data area
import { getDataArea } from "../../../actions/tables/area";

class Editdatapelanggan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data
      customer_group_id: null,
      name: "",
      code: "",
      email: "",
      address: "",
      phone: "",
      status: "",
      notes: "",
      distributor_id: null,
      area_id: null,
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
      .get("/api/customer/" + id)
      .then(res => {
        console.log(res);
        //
        this.setState({
          customer_group_id: res.data.data.customer_group_id._id,
          name: res.data.data.name,
          code: res.data.data.code,
          email: res.data.data.email,
          address: res.data.data.address,
          phone: res.data.data.phone,
          status: res.data.data.status,
          notes: res.data.data.notes,
          distributor_id: res.data.data.distributor_id._id,
          area_id: res.data.data.area_id
        });
      })
      .catch(err => {
        console.log(err);
      });

    // distributor
    this.props.dispatch(getDataDistributor());
    // kelompok planggan
    this.props.dispatch(getDataKelompokPelanggan());
    // area
    this.props.dispatch(getDataArea());
  }

  // UPDATE
  doUpdateData = e => {
    e.preventDefault();
    const data = {
      customer_group_id: this.state.customer_group_id,
      name: this.state.name,
      code: this.state.code,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      status: this.state.status,
      notes: this.state.notes,
      distributor_id: this.state.distributor_id,
      area_id: this.state.area_id
    };

    console.log(data);

    // PUT
    const id = this.props.match.params.id;
    axios
      .put("/api/customer/" + id, data)
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
      return <Redirect to="/app/tables/pelanggan" />;
    }

    const { dataArea, dataDistributor, dataKelompokPelanggan } = this.props;

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={6}>
            <h3 className="page-title fw-semi-bold">Edit Data Pelanggan</h3>
            {/* <img src={avatar} alt="..." /> */}
            <Widget refresh collapse close className="px-5">
              <Form onSubmit={this.doUpdateData}>
                {/* customer_group_id */}
                <FormGroup>
                  <Label for="customer_group_id">ID Kelompok Pelanggan</Label>
                  <Input
                    value={this.state.customer_group_id}
                    onChange={this.handleChange}
                    type="select"
                    name="customer_group_id"
                    id="customer_group_id"
                  >
                    {dataKelompokPelanggan.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* name */}
                <FormGroup>
                  <Label for="name">Nama</Label>
                  <Input
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Masukkan Nama"
                  />
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
                    placeholder="Masukkan kode"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* email */}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* address */}
                <FormGroup>
                  <Label for="address">Alamat</Label>
                  <Input
                    value={this.state.address}
                    onChange={this.handleChange}
                    type="textarea"
                    name="address"
                    id="address"
                    placeholder="Masukkan Alamat"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* phone */}
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    value={this.state.phone}
                    onChange={this.handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Masukkan No.Telp"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* status */}
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    value={this.state.status}
                    onChange={this.handleChange}
                    type="text"
                    name="status"
                    id="status"
                    placeholder="Masukkan Status"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* notes */}
                <FormGroup>
                  <Label for="notes">Catatan</Label>
                  <Input
                    value={this.state.notes}
                    onChange={this.handleChange}
                    type="text"
                    name="notes"
                    id="notes"
                    placeholder="Masukkan Catatan"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* distributor_id */}
                <FormGroup>
                  {/* tampilkan distributor name dan id nya sebagai value */}
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
                {/* area_id */}
                <FormGroup>
                  {/* tampilkan distributor name dan id nya sebagai value */}
                  <Label for="exampleKode">Area ID </Label>
                  <Input
                    value={this.state.area_id}
                    onChange={this.handleChange}
                    type="select"
                    name="area_id"
                    id="exampleSelect"
                  >
                    {dataArea.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* button */}
                <div className="float-right">
                  <Button
                    className="my-5 px-5 ml-5"
                    color="light"
                    type="button"
                    onClick={this.goBack}
                  >
                    Kembali
                  </Button>
                  <Button
                    className="my-5 px-5 ml-5"
                    color="primary"
                    type="submit"
                  >
                    Simpan
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
    alertMessage: state.reducerPelanggan.alertMessage,
    // GET
    getSuccess: state.reducerPelanggan.getSuccess,
    getError: state.reducerPelanggan.getError,
    // dataPelanggan: state.reducerPelanggan.dataPelanggan,
    // CREATE
    createSuccess: state.reducerPelanggan.createSuccess,
    createError: state.reducerPelanggan.createError,
    // UPDATE
    updateSuccess: state.reducerPelanggan.updateSuccess,
    updateError: state.reducerPelanggan.updateError,
    // DELETE
    deleteSuccess: state.reducerPelanggan.deleteSuccess,
    deleteError: state.reducerPelanggan.deleteError,

    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // AREA
    dataArea: state.reducerArea.dataArea,
    // KELOMPOK PELANGGAN
    dataKelompokPelanggan: state.reducerKelompokPelanggan.dataKelompokPelanggan
  };
}

export default connect(mapStateToProps)(Editdatapelanggan);
