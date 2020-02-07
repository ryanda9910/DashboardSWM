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
import s from "./editdatausers.module.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// sweetalert2-react-content
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";
import { ConsoleWriter } from "istanbul-lib-report";
// distributor
import { getDataDistributor } from "../../../actions/tables/distributor";
// role
import { getDataRole } from "../../../actions/tables/role";

class Editdatausers extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      //
      role_id: null,
      isactive: false,
      name: "",
      slug: "",
      description: "",
      email: "",
      phone: "",
      password: "",
      distributor_id: null,
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
      .get("/api/user/" + id)
      .then(res => {
        console.log(res);
        this.setState({
          //
          role_id: res.data.data.role_id._id,
          isactive: res.data.data.isactive,
          name: res.data.data.name,
          slug: res.data.data.slug,
          description: res.data.data.description,
          email: res.data.data.email,
          phone: res.data.data.phone,
          password: res.data.data.password,
          distributor_id: res.data.data.distributor_id,
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
    // DATA ROLE
    this.props.dispatch(getDataRole());
  }

  // do UPDATE
  doUpdateUser = e => {
    e.preventDefault();
    let postData = {
      role_id: this.state.role_id,
      isactive: this.state.isactive === true ? "true" : "false",
      name: this.state.name,
      slug: this.state.slug,
      description: this.state.description,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      distributor_id: this.state.distributor_id
    };

    console.log(postData);

    // UPDATE data
    const id = this.props.match.params.id;
    axios
      .put("/api/user/" + id, postData)
      .then(res => {
        console.log(res);
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
      })
      .catch(err => {
        console.log(err.response);
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

    const { dataDistributor, dataRole } = this.props;

    // redirect jika succes create
    if (this.state.updateStatus === 200 || this.state.updateStatus === 201) {
      return <Redirect to="/app/tables/userdata" />;
    }

    // handle null option
    const nullOption =
      this.state.role_id === null ? <option value={null}></option> : null;

    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={6} md={12}>
            <h1 className="page-title">
              Edit Data <span className="fw-semi-bold"> User</span>
            </h1>
            <Widget refresh collapse close className="px-5">
              <h1 className="mt-5 mr-5">picture</h1>
              <Form className="mt-5" onSubmit={this.doUpdateUser}>
                {/* role_id */}
                <FormGroup>
                  <Label for="role_id">Role ID</Label>
                  <Input
                    required
                    value={this.state.role_id}
                    onChange={this.handleChange}
                    type="select"
                    name="role_id"
                    id="role_id"
                  >
                    {dataRole.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
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
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Masukkan Nama"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* slug */}
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input
                    required
                    value={this.state.slug}
                    onChange={this.handleChange}
                    type="text"
                    name="slug"
                    id="slug"
                    placeholder="Masukkan Slug"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* description */}
                <FormGroup>
                  <Label for="description">Deskripsi</Label>
                  <Input
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Masukkan Deskripsi"
                  />
                </FormGroup>
                {/* email */}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email"
                  />
                </FormGroup>

                {/* password */}
                <FormGroup>
                  {/* <Label for="password">Password</Label> */}
                  <Input
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="hidden"
                    name="password"
                    id="password"
                    placeholder="Masukkan Password"
                  />
                </FormGroup>

                {/* phone */}
                <FormGroup>
                  <Label for="phone">Telepon </Label>
                  <Input
                    required
                    value={this.state.phone}
                    onChange={this.handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Masukkan Telepon"
                  />
                </FormGroup>
                {/* distributor_id */}
                <FormGroup>
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
                </FormGroup>
                <FormGroup>
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
                </FormGroup>
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
    // ROLE
    dataRole: state.reducerRole.dataRole
  };
}

export default connect(mapStateToProps)(Editdatausers);
