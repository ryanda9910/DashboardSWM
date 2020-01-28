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
} from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatatarifversion.module.scss";
import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";

// DISTRIBUTOR
import { getDataDistributor } from "../../../actions/tables/distributor";
// TARIF
import { getDataTarif } from "../../../actions/tables/tarif";


class Editdatatarifpelanggan extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // UPDATE
      name: '',
      tarif_id: null,
      distributor_id: null,
      isactive: false,
      volume1: '',
      price1: '',
      volume2: '',
      price2: '',
      volume3: '',
      price3: '',
      validFrom: null,
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
    axios.get("/api/tarifversion/" + id)
      .then(res => {
        console.log(res);

        // const validFrom =  res.data.data.validFrom;
        // const validFromChange = validFrom.substr(0, validFrom.lastIndexOf('T'));
        // console.log(validFromChange);

        this.setState({
          // 
          name: res.data.data.name,
          tarif_id: res.data.data.tarif_id,
          distributor_id: res.data.data.distributor_id,
          isactive: res.data.data.isactive,
          volume1: res.data.data.volume1,
          price1: res.data.data.price1,
          volume2: res.data.data.volume2,
          price2: res.data.data.price2,
          volume3: res.data.data.volume3,
          price3: res.data.data.price3,
          // validFrom: validFromChange,
          validFrom: res.data.data.validFrom,
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
    this.props.dispatch(getDataDistributor())
    // DATA TARIF
    this.props.dispatch(getDataTarif())
  }

  // do UPDATE
  doUpdateTarif = e => {
    e.preventDefault();
    let postData = {
      name: this.state.name,
      tarif_id: this.state.tarif_id,
      distributor_id: this.state.distributor_id,
      isactive: this.state.isactive,
      volume1: this.state.volume1,
      price1: this.state.price1,
      volume2: this.state.volume2,
      price2: this.state.price2,
      volume3: this.state.volume3,
      price3: this.state.price3,
      validFrom: this.state.validFrom,
    };

    console.log(postData);

    // UPDATE data
    const id = this.props.match.params.id;
    axios
      .put(
        "/api/tarifversion/" + id,
        postData
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
    console.log(this.state);
    console.log(this.props);

    const { dataTarif, dataDistributor } = this.props;

    // redirect jika succes create
    if (this.state.updateStatus === 200 || this.state.updateStatus === 201) {
      return <Redirect to="/app/tables/tarifversion" />;
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
                {/* tarif_id */}
                <FormGroup>
                  <Label>ID Tarif</Label>
                  <Input
                    value={this.state.tarif_id}
                    onChange={this.handleChange}
                    type="select"
                    name="tarif_id"
                    placeholder="Kode"
                  >
                    {
                      dataTarif.map(item => {
                        return (
                          <option value={item._id}>{item.name}</option>
                        )
                      })
                    }
                  </Input>
                </FormGroup>
                {/* distributor_id */}
                <FormGroup>
                  <Label>ID Distributor</Label>
                  <Input
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
                    type="select"
                    name="distributor_id"
                    placeholder="Kode"
                  >
                    {
                      dataDistributor.map(item => {
                        return (
                          <option value={item._id}>{item.name}</option>
                        )
                      })
                    }
                  </Input>
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
                {/* volume 1 */}
                <FormGroup>
                  <Label for="exampleVolume1">Volume 1</Label>
                  <Input
                    value={this.state.volume1}
                    onChange={this.handleChange}
                    type="number"
                    name="volume1"
                    id="exampleVolume1"
                    placeholder="Volume 1"
                  />
                </FormGroup>
                {/* price 1 */}
                <FormGroup>
                  <Label for="examplePrice1">Price 1</Label>
                  <Input
                    value={this.state.price1}
                    onChange={this.handleChange}
                    type="number"
                    name="price1"
                    id="examplePrice1"
                    placeholder="price1"
                  />
                </FormGroup>
                {/* volume 2 */}
                <FormGroup>
                  <Label for="exampleVolume2">Volume 2</Label>
                  <Input
                    value={this.state.volume2}
                    onChange={this.handleChange}
                    type="number"
                    name="volume2"
                    id="exampleVolume2"
                    placeholder="Volume 2"
                  />
                </FormGroup>
                {/* price 2 */}
                <FormGroup>
                  <Label for="examplePrice2">Price 2</Label>
                  <Input
                    value={this.state.price2}
                    onChange={this.handleChange}
                    type="number"
                    name="price2"
                    id="examplePrice2"
                    placeholder="price2"
                  />
                </FormGroup>
                {/* volume 3 */}
                <FormGroup>
                  <Label for="exampleVolume3">Volume 3</Label>
                  <Input
                    value={this.state.volume3}
                    onChange={this.handleChange}
                    type="number"
                    name="volume3"
                    id="exampleVolume3"
                    placeholder="volume3"
                  />
                </FormGroup>
                {/* price 3 */}
                <FormGroup>
                  <Label for="examplePrice3">Price 3</Label>
                  <Input
                    value={this.state.price3}
                    onChange={this.handleChange}
                    type="number"
                    name="price3"
                    id="examplePrice3"
                    placeholder="price3"
                  />
                </FormGroup>


                {/* validFrom */}
                <FormGroup>
                  <Label for="validFrom">Valid From</Label>
                  <Input
                    value={this.state.validFrom}
                    onChange={this.handleChange}
                    type="date"
                    name="validFrom"
                    id="validFrom"                  
                    placeholder="Valid From"
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

function mapStateToProps(state){
  return {
    // DISTRIBUTOR
    dataDistributor: state.reducerDistributor.dataDistributor,
    // TARIF
    dataTarif: state.reducerTarif.dataTarif,
  }
}

export default connect(mapStateToProps)(Editdatatarifpelanggan);
