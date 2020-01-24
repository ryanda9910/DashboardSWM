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
  InputGroupText,
  FormFeedback,
  FormText,
} from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link, Redirect } from "react-router-dom";
// 
import { createData } from '../../../actions/tables/tarifpelanggan';
import s from "./createdatatarifpelanggan.module.scss";

class CreateDataTarifPelanggan extends React.Component {
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

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
      // status post
      // createStatus: null,
      // createError: null
    };
    //
    this.goBack = this.goBack.bind(this);
  }

  // CREATE Tarif
  doCreateTarif = e => {
    e.preventDefault();
    let postData = {
      code: this.state.code,
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
    // let axiosConfig = {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*"
    //     // Authorization: token
    //   }
    // };
    // 
    this.props.dispatch(createData(postData))
  };
  // track change
  handleChange = e => {
    // console.log(e.target.checked);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    console.log(this.state);
    // craete success
    // if(this.props.createSuccess){
    //   return <Redirect to="/app/tables/tarifpelanggan" />;
    // }
    // create error
    const createError =
      this.props.createError === false ? null : (
        <div className="text-center w-100 py-2">
          <small className="text-white">{this.props.createError}</small>
        </div>
      );

    return (
      <div className={s.root}>
        <Row className={s.rowWhite + " py-5"}>
          <Col lg={12}>
            <h1 className="page-title">
              Create <span className="fw-semi-bold">Tarif Pelanggan</span>
            </h1>
          </Col>
          <Col lg={7} className="pb-3">
            <a onClick={this.goBack} className=" text-dark btn btn-light px-5">
              Kembali
            </a>
          </Col>
          <Col lg={7}>
            <Form id="formCreateDataTarif" onSubmit={this.doCreateTarif}>
              {/* tidak ditampilkan saat add */}
              {/* volto1 */}
              <FormGroup>
                <Label for="exampleVolto1">Volume to 1</Label>
                <Input
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
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  id="exampleKode"
                  placeholder="Kode"
                />
                {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                {/* <FormText>Example help text that remains unchanged.</FormText> */}
              </FormGroup>
              {/* isactive */}
              <FormGroup>
                <Label for="exampleIsActive">is Active</Label>
                <CustomInput
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
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  id="exampleNama"
                  placeholder="Nama"
                />
              </FormGroup>
              {/* Description */}
              <FormGroup>
                <Label for="exampleDescription">Description</Label>
                <Input
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
                  onChange={this.handleChange}
                  type="number"
                  name="price2"
                  id="examplePrice2"
                  placeholder="Harga 2"
                />
              </FormGroup>

              {/* show ERROR */}
              <FormGroup row className="bg-danger">
                {createError}
              </FormGroup>

              {/* button */}
              <Button color="primary" className="px-5" type="submit">
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    createSuccess: state.reducerTarifPelanggan.createSuccess,
    createError: state.reducerTarifPelanggan.createError,
  }
}

export default connect(mapStateToProps)(CreateDataTarifPelanggan);
