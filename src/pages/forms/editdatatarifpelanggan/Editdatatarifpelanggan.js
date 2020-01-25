import React from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatatarifpelanggan.module.scss";
import axios from "axios";
// config
import config from "../../../config";
import { Redirect } from "react-router-dom";

// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

class Editdatatarifpelanggan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      isactive: false,
      name: "",
      description: "",
      isprogressive: false,
      price1: "",
      volfrom1: "",
      volto1: "",
      price2: "",
      volfrom2: "",
      volto2: "",
      price3: "",
      volfrom3: "",
      volto3: "",
      statusGetSpesificsData: "",
      getError: null,
      updateStatus: "",
      updateError: null
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    // get data
    const id = this.props.match.params.id;
    axios
      .get("/api/tarif/" + id)
      .then(res => {
        console.log(res);
        this.setState({
          code: res.data.data.code,
          isactive: res.data.data.isactive,
          name: res.data.data.name,
          description: res.data.data.description,
          isprogressive: res.data.data.isprogressive,
          price1: res.data.data.price1,
          volfrom1: res.data.data.volfrom1,
          volto1: res.data.data.volto1,
          price2: res.data.data.price2,
          volfrom2: res.data.data.volfrom2,
          volto2: res.data.data.volto2,
          price3: res.data.data.price3,
          volfrom3: res.data.data.volfrom3,
          volto3: res.data.data.volto3,
          statusGetSpesificsData: res.data.status
        });
        return 0;
      })
      .catch(err => {
        console.log(err);
        this.setState({
          getError: "Something Wrong"
        });
      });
  }

  // do UPDATE
  doUpdateTarif = e => {
    e.preventDefault();
    let postData = {
      code: this.state.code,
      // handle is active
      isactive: this.state.isactive,
      name: this.state.name,
      description: this.state.description,
      isprogressive: this.state.isprogressive,
      price1: this.state.price1,
      volfrom1: this.state.volfrom1,
      volto1: this.state.volto1,
      price2: this.state.price2,
      volfrom2: this.state.volfrom2,
      volto2: this.state.volto2,
      price3: this.state.price3,
      volfrom3: this.state.volfrom3,
      volto3: this.state.volto3
    };

    console.log(postData);

    const id = this.props.match.params.id;
    axios
      .put(
        "http://swm-apis.herokuapp.com/api/tarif/" + id,
        postData,
        config.axiosConfig
      )
      .then(res => {
        console.log(res);
        this.setState({
          updateStatus: res.status
        });
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
    // window.location = config.baseURLApp+'/';
  };

  render() {
    console.log(this.props.match.params.id);
    console.log(this.state);

    // redirect jika succes create
    if (this.state.updateStatus === 200 || this.state.updateStatus === 201) {
      return <Redirect to="/app/tables/tarifpelanggan" />;
    }

    // update error
    const updateError =
      this.state.updateError === null ? null : (
        <div className="bg-danger text-center w-100 py-2">
          <small className="text-white">{this.state.updateError}</small>
        </div>
      );

    return (
      <div className={s.root}>
        <Row className="py-5">
          <Col lg={12}>
            <h1 className="page-title">
              Edit <span className="fw-semi-bold">Tarif Pelanggan</span>
            </h1>
          </Col>
          <Col lg={7}>
            <Widget refresh collapse close className="px-5">
              <Col lg={7} className="px-1 pb-3">
                <a
                  onClick={this.goBack}
                  className="btn btn-light text-dark"
                  type="submit"
                >
                  Kembali
                </a>
              </Col>
              <Form onSubmit={this.doUpdateTarif}>
                {/* tidak ditampilkan saat add */}
                {/* volto1 */}
                <FormGroup>
                  <Label for="exampleVolto1">Volume to 1</Label>
                  <Input
                    value={this.state.volto1}
                    onChange={this.handleChange}
                    type="text"
                    name="volto1"
                    id="exampleVolto1"
                    placeholder="Volume to 1"
                  />
                </FormGroup>
                {/* volto2 */}
                <FormGroup>
                  <Label for="exampleVolto2">Volume to 2</Label>
                  <Input
                    value={this.state.volto2}
                    onChange={this.handleChange}
                    type="text"
                    name="volto2"
                    id="exampleVolto2"
                    placeholder="Volume to 2"
                  />
                </FormGroup>
                {/* volto3 */}
                <FormGroup>
                  <Label for="exampleVolto3">Volume to 3</Label>
                  <Input
                    value={this.state.volto3}
                    onChange={this.handleChange}
                    type="text"
                    name="volto3"
                    id="exampleVolto3"
                    placeholder="Volume to 3"
                  />
                </FormGroup>
                {/* volfrom3 */}
                <FormGroup>
                  <Label for="exampleVolfrom3">Volume from 3</Label>
                  <Input
                    value={this.state.volfrom3}
                    onChange={this.handleChange}
                    type="text"
                    name="volfrom3"
                    id="exampleVolfrom3"
                    placeholder="Volume from 3"
                  />
                </FormGroup>
                {/* price3 */}
                <FormGroup>
                  <Label for="price3">Price 3</Label>
                  <Input
                    value={this.state.price3}
                    onChange={this.handleChange}
                    type="text"
                    name="price3"
                    id="price3"
                    placeholder="Price 3"
                  />
                </FormGroup>

                <hr />

                {/* code */}
                <FormGroup>
                  <Label for="exampleKode">Kode</Label>
                  <Input
                    value={this.state.code}
                    onChange={this.handleChange}
                    type="text"
                    name="code"
                    id="exampleKode"
                    placeholder="Kode"
                  />
                </FormGroup>
                {/* isactive */}
                <FormGroup>
                  <Label for="exampleIsActive">is Active</Label>
                  <CustomInput
                    checked={this.state.isactive}
                    onChange={this.handleChange}
                    type="switch"
                    id="exampleIsActive"
                    name="isactive"
                    label="Turn on this if True"
                  />
                </FormGroup>
                {/* name */}
                <FormGroup>
                  <Label for="exampleNama">Nama</Label>
                  <Input
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    id="exampleNama"
                    placeholder="Nama"
                  />
                </FormGroup>
                {/* description */}
                <FormGroup>
                  <Label for="exampleDescription">Description</Label>
                  <Input
                    value={this.state.description}
                    onChange={this.handleChange}
                    type="textarea"
                    name="description"
                    id="exampleDescription"
                    placeholder="Description"
                  />
                </FormGroup>
                {/* isprogressive */}
                <FormGroup>
                  <Label for="exampleIsProgressive">is Progressive</Label>
                  <CustomInput
                    checked={this.state.isprogressive}
                    onChange={this.handleChange}
                    type="switch"
                    id="exampleIsProgressive"
                    name="isprogressive"
                    label="Turn on this if True"
                  />
                </FormGroup>
                {/* volfrom1 */}
                <FormGroup>
                  <Label for="exampleVolume1">Volume 1</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-blue-design">
                        <i className="glyphicon glyphicon-tint"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.volfrom1}
                      onChange={this.handleChange}
                      type="number"
                      name="volfrom1"
                      id="exampleVolume1"
                      placeholder="Volume 1"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText className="bg-blue-design">
                        M<sup>3</sup>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                {/* price1 */}
                <FormGroup>
                  <Label for="examplePrice1">Harga 1</Label>
                  <Input
                    value={this.state.price1}
                    onChange={this.handleChange}
                    type="number"
                    name="price1"
                    id="exampleVolume1"
                    placeholder="Harga 1"
                  />
                </FormGroup>
                {/* volfrom2 */}
                <FormGroup>
                  <Label for="exampleVolume2">Volume 2</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-blue-design">
                        <i className="glyphicon glyphicon-tint"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.volfrom2}
                      onChange={this.handleChange}
                      type="number"
                      name="volfrom2"
                      id="exampleVolume2"
                      placeholder="Volume 2"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText className="bg-blue-design">
                        M<sup>3</sup>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                {/* price2 */}
                <FormGroup>
                  <Label for="examplePrice2">Harga 2</Label>
                  <Input
                    value={this.state.price2}
                    onChange={this.handleChange}
                    type="number"
                    name="price2"
                    id="examplePrice2"
                    placeholder="Harga 2"
                  />
                </FormGroup>

                {/* show ERROR */}
                <FormGroup row>{updateError}</FormGroup>

                {/* button */}
                <Button color="primary">Update</Button>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Editdatatarifpelanggan;
