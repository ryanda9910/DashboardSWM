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
import { connect } from "react-redux";
import PropTypes from "prop-types";
// config
import config from "../../../config";
import { Redirect } from "react-router-dom";

// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";
import { getDataDistributor } from "../../../actions/tables/distributor";

class Editdatatarifpelanggan extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      //
      name: "",
      distributor_id: null,
      isactive: false,
      description: "",
      //
      statusGetSpesificsData: "",
      getError: null,
      updateStatus: "",
      updateError: null
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    // DATA TARIF SPESIFIC
    // get id
    const id = this.props.match.params.id;
    axios
      .get("/api/tarif/" + id)
      .then(res => {
        console.log(res);
        this.setState({
          //
          name: res.data.data.name,
          distributor_id: res.data.data.distributor_id,
          isactive: res.data.data.isactive,
          description: res.data.data.description,
          //
          statusGetSpesificsData: res.data.status
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          getError: "Something Wrong"
        });
      });
    // DATA DISTRIBUTOR
    this.props.dispatch(getDataDistributor());
  }

  // do UPDATE
  doUpdateTarif = e => {
    e.preventDefault();
    let postData = {
      name: this.state.name,
      distributor_id: this.state.distributor_id,
      isactive: this.state.isactive === true ? "true" : "false",
      description: this.state.description
    };

    console.log(postData);

    // UPDATE data
    const id = this.props.match.params.id;
    axios
      .put("/api/tarif/" + id, postData)
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
    console.log(this.state);
    console.log(this.props);

    const { dataDistributor } = this.props;

    // redirect jika succes create
    if (this.state.updateStatus === 200 || this.state.updateStatus === 201) {
      return <Redirect to="/app/tables/tarif" />;
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
        <Row className="py-5 justify-content-center">
          <Col lg={12}>
            <h1 className="page-title text-center">
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
                {/* distributor_id */}
                <FormGroup>
                  <Label for="exampleKode">ID Distributor</Label>
                  <Input
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
                    type="select"
                    name="distributor_id"
                    id="exampleKode"
                    placeholder="Kode"
                  >
                    {dataDistributor.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                </FormGroup>
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

function mapStateToProps(state) {
  return {
    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default connect(mapStateToProps)(Editdatatarifpelanggan);
