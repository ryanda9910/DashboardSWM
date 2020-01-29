import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatakelompokpelanggan.module.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

// data distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// data tarif
import { getDataTarif } from "../../../actions/tables/tarif";
//
import { getDataKelompokPelanggan } from "../../../actions/tables/kelompokpelanggan";

class Editdatakelompokpelanggan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data
      parent_group: "",
      group: "",
      code: "",
      name: "",
      isactive: false,
      description: "",
      tarif_id: null,
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
      .get("/api/custgroup/" + id)
      .then(res => {
        console.log(res);
        //
        this.setState({
          parent_group: res.data.data.parent_group,
          group: res.data.data.group,
          code: res.data.data.code,
          name: res.data.data.name,
          isactive: res.data.data.isactive,
          description: res.data.data.description,
          tarif_id: res.data.data.tarif_id,
          distributor_id: res.data.data.distributor_id
        });
      })
      .catch(err => {
        console.log(err);
      });

    // GET data distributor
    this.props.dispatch(getDataDistributor());
    // GET data tarif
    this.props.dispatch(getDataTarif());
  }

  // UPDATE
  doUpdateData = e => {
    e.preventDefault();
    const data = {
      parent_group: this.state.parent_group,
      group: this.state.group,
      code: this.state.code,
      name: this.state.name,
      isactive: this.state.isactive === true ? "true" : "false",
      description: this.state.description,
      tarif_id: this.state.tarif_id,
      distributor_id: this.state.distributor_id
    };

    console.log(data);

    // PUT
    const id = this.props.match.params.id;
    axios
      .put("/api/custgroup/" + id, data)
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
      return <Redirect to="/app/tables/kelompokpelanggan" />;
    }

    const { dataTarif, dataDistributor } = this.props;

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={12}>
            <h1 className="page-title fw-semi-bold text-center">
              Edit Data Kelompok Pelanggan
            </h1>
          </Col>
          <Col lg={8} className="justify-content-center">
            <Widget refresh collapse close className="px-5">
              <Form className="mt-5" onSubmit={this.doUpdateData}>
                {/* parent_group */}
                <FormGroup>
                  <Label for="parent_group">Parent Group</Label>
                  <Input
                    value={this.state.parent_group}
                    onChange={this.handleChange}
                    id="parent_group"
                    type="text"
                    name="parent_group"
                    placeholder="Masukkan Group Parent"
                  />
                </FormGroup>
                {/* group */}
                <FormGroup>
                  <Label for="group">Group</Label>
                  <Input
                    value={this.state.group}
                    onChange={this.handleChange}
                    id="group"
                    type="text"
                    name="group"
                    placeholder="Masukkan Group"
                  />
                </FormGroup>
                {/* code */}
                <FormGroup>
                  <Label for="code">Kode</Label>
                  <Input
                    value={this.state.code}
                    onChange={this.handleChange}
                    id="code"
                    type="text"
                    name="code"
                    placeholder="Masukkan Kode"
                  />
                </FormGroup>
                {/* name */}
                <FormGroup>
                  <Label for="name">Nama</Label>
                  <Input
                    value={this.state.name}
                    onChange={this.handleChange}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Masukkan Nama"
                  />
                </FormGroup>
                {/* isactive
                <FormGroup>
                  <Label for="isactive">is Active</Label>
                  <CustomInput
                    checked={this.state.isactive}
                    onChange={this.handleChange}
                    type="switch"
                    id="exampleIsActive"
                    name="isactive"
                    label="Turn on this if True"
                  />
                </FormGroup> */}
                <div className={s.root + " align-self-center"}>
                  <FormGroup className="display-inline-block checkbox-ios">
                    <Label for="isactive" className="switch">
                      <Input
                        checked={this.state.isactive}
                        onChange={this.handleChange}
                        type="checkbox"
                        id="isactive"
                        name="isactive"
                        className="ios"
                        label="Turn on this if True"
                      />
                      <i />
                      <Label for="isactive" className="pl-3">
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
                  <Label>ID Distributor</Label>
                  <Input
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
                    type="select"
                    name="distributor_id"
                  >
                    {dataDistributor.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* tarif_id */}
                <FormGroup>
                  {/* tampilkan distributor name dan id nya sebagai value */}
                  <Label>ID Tarif</Label>
                  <Input
                    value={this.state.tarif_id}
                    onChange={this.handleChange}
                    type="select"
                    name="tarif_id"
                  >
                    {dataTarif.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* description */}
                <FormGroup>
                  <Label for="exampleDesc">Deskripsi</Label>
                  <Input
                    value={this.state.description}
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    id="exampleDesc"
                    placeholder="Masukkan Deskripsi"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>

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
                    Update
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
    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // TARIF
    dataTarif: state.reducerTarif.dataTarif
  };
}

export default connect(mapStateToProps)(Editdatakelompokpelanggan);
