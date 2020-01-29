import React from "react";
import { Row, Col, Button, FormGroup, Label, Form, Input, CustomInput } from "reactstrap";
// import Formsy from "formsy-react";
import s from "./editdatarole.module.scss";
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from "prop-types";
// 
import { WithContext as ReactTags } from 'react-tag-input';
// import InputValidation from "../../../components/InputValidation";
import Widget from "../../../components/Widget";
// distributor
import { getDataDistributor } from "../../../actions/tables/distributor";

class Editdatarole extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // CREATE
      code: "",
      isactive: "",
      name: "",
      description: "",
      menuaccess: [],
      distributor_id: "",
      // ALERT
      showAlert: false,
      alertDestroy: false,
      // MODALS
      modalCreate: false,

      // REACT_TAG_INPUT
      // tag default
      tags: [],
      // autocomplete
      suggestions: [
          { id: 'tarif', text: 'tarif' },
          { id: 'pelanggan', text: 'pelanggan' },
          { id: 'tarifversion', text: 'tarifversion' },
          { id: 'meter', text: 'meter' }
      ]
    };
    //
    this.goBack = this.goBack.bind(this);


    // REACT_TAG_INPUT
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }



  componentDidMount() {
    // DATA TARIF SPESIFIC
    // get id
    const id = this.props.match.params.id;
    axios
      .get("/api/role/" + id)
      .then(res => {
        console.log(res);
        this.setState({
          //
          code: res.data.data.code,
          isactive: res.data.data.isactive,
          name: res.data.data.name,
          description: res.data.data.description,
          menuaccess: res.data.data.menuaccess,
          distributor_id: res.data.data.distributor_id,
          //
          statusGetSpesificsData: res.data.status,
          // REACT_TAG_INPUT
          // tags: res.data.data.menuaccess,
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
  doUpdateRole = e => {
    e.preventDefault();

    // REACT_TAG_INPUT
    for(var a=0;a<this.state.menuaccess.length;a++){
      this.state.tags.push({id:this.state.menuaccess[a], tarif: this.state.menuaccess[a]})
    }

    // handle menuaccess
    this.state.tags.map(item => [
      this.state.menuaccess.push(item.id)
    ]);
    let postData = {
      code: this.state.code,
      isactive: this.state.isactive === true ? 'true' : 'false',
      name: this.state.name,
      description: this.state.description,
      menuaccess: this.state.menuaccess,
      distributor_id: this.state.distributor_id,
    };

    console.log(postData);

    // UPDATE data
    const id = this.props.match.params.id;
    axios
      .put("/api/role/" + id, postData)
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
  };



  // REACT_TAG_INPUT
  handleDeleteTag(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: newTags });
  }
  render() {

    console.log(this.state)

    // REACT_TAG_INPUT
    const KeyCodes = {
      comma: 188,
      enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];
    const { tags, suggestions } = this.state;

    const { dataDistributor } = this.props;


    return (
      <div className={s.root}>
        <Row className="py-5 justify-content-center">
          <Col lg={6}>
            <h1 className="page-title">
              Edit Data <span className="fw-semi-bold"> Role</span>
            </h1>
            <Widget refresh collapse close className="px-5">
              <Form
                id="formCreateDataRolegetDataRole"
                onSubmit={this.doUpdateRole}
              >
                {/* code */}
                <FormGroup>
                  <Label for="code">Kode </Label>
                  <Input
                    value={this.state.code}
                    onChange={this.handleChange}
                    type="text"
                    name="code"
                    id="code"
                    placeholder=" Masukkan Kode"
                  />
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
                {/* isactive */}
                <FormGroup>
                  <Label for="isactive">Is Active</Label>
                  <CustomInput
                    value={this.state.isactive}
                    onChange={this.handleChange}
                    type="switch"
                    id="isactive"
                    name="isactive"
                    label="Turn on this if True"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* description */}
                <FormGroup>
                  <Label for="exampleKode">Deskripsi</Label>
                  <Input
                    value={this.state.description}
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    id="exampleDescription"
                    placeholder="Masukkan Deskripsi"
                  />
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* distributor_id */}
                <FormGroup>
                  {/* tampilkan distributor name dan id nya sebagai value */}
                  <Label for="exampleKode">Distributor ID </Label>
                  <Input
                    value={this.state.distributor_id}
                    onChange={this.handleChange}
                    type="select"
                    name="distributor_id"
                    id="exampleSelect"
                  >
                    {dataDistributor.map(item => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Input>
                  {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                  {/* <FormText>Example help text that remains unchanged.</FormText> */}
                </FormGroup>
                {/* menuaccess */}
                <FormGroup>
                  {/* <Label for="menuaccess">Akses Menu</Label> */}
                  <Input
                    value={this.state.code}
                    onChange={this.handleChange}
                    type="hidden"
                    name="menuaccess"
                    id="menuaccess"
                  >
                  </Input>
                  {/* react tag input */}
                  {/* <ReactTags tags={tags}
                    classNames={{
                      tags: 'tagsClass',
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass',
                      selected: 'selectedClass',
                      tag: 'tagClass',
                      remove: 'removeClass',
                      suggestions: 'suggestionsClass',
                      activeSuggestion: 'activeSuggestionClass'
                    }}
                    suggestions={suggestions}
                    handleDelete={this.handleDeleteTag}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} /> */}
                </FormGroup>
                

                <Button color="dark" onClick={this.goBack}>
                  Close
                </Button>
                {/* craete */}
                <Button color="warning" className="px-5" type="submit">
                  Tambah Data
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
    dataDistributor: state.reducerDistributor.dataDistributor
  };
}

export default connect(mapStateToProps)(Editdatarole);
