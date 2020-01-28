// import React from "react";
// import {
//   Row,
//   Col,
//   Button,
//   FormGroup,
//   Label,
//   Form,
//   Input,
//   CustomInput
// } from "reactstrap";
// // import Formsy from "formsy-react";
// import s from "./editdatapelanggan.module.scss";
// import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import axios from "axios";

// // import InputValidation from "../../../components/InputValidation";
// import Widget from "../../../components/Widget";

// // data distributor
// import { getDataDistributor } from "../../../actions/tables/distributor";

// //data kelompok pelanggan
// import { getDataKelompokPelanggan } from "../../../actions/tables/kelompokpelanggan";
// //data area
// import { getDataArea } from "../../../actions/tables/area";

// class Editdatapelanggan extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // data
//       customer_group_id: null,
//       name: "",
//       code: "",
//       email: "",
//       address: "",
//       phone: "",
//       status: "",
//       notes: "",
//       distributor_id: null,
//       area_id: null,
//       //
//       updateStatus: null,
//       updateError: null
//     };
//     this.goBack = this.goBack.bind(this);
//   }

//   // GET data
//   componentDidMount() {
//     // id
//     const id = this.props.match.params.id;
//     axios
//       .get("/api/custgroup/" + id)
//       .then(res => {
//         console.log(res);
//         //
//         this.setState({
//           customer_group_id: this.state.costumer_grup_id,
//           name: this.state.name,
//           code: this.state.code,
//           email: this.state.email,
//           address: this.state.address,
//           phone: this.state.phone,
//           status: this.state.status,
//           notes: this.state.notes,
//           distributor_id: this.state.distributor_id,
//           area_id: this.state.area_id
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     // GET data distributor
//     this.props.dispatch(getDataDistributor());
//     // GET data area
//     this.props.dispatch(getDataArea());
//     // GET data kelompok pelanggan
//     this.props.dispatch(getDataKelompokPelanggan());
//   }

//   // UPDATE
//   doUpdateData = e => {
//     e.preventDefault();
//     const data = {
//       customer_group_id: this.state.costumer_grup_id,
//       name: this.state.name,
//       code: this.state.code,
//       email: this.state.email,
//       address: this.state.address,
//       phone: this.state.phone,
//       status: this.state.status,
//       notes: this.state.notes,
//       distributor_id: this.state.distributor_id,
//       area_id: this.state.area_id
//     };

//     console.log(data);

//     // PUT
//     const id = this.props.match.params.id;
//     axios
//       .put("/api/custgroup/" + id, data)
//       .then(res => {
//         console.log(res);
//         //
//         if (res.status >= 200 || res.status < 300) {
//           this.setState({
//             updateStatus: res.status
//           });
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         this.setState({
//           updateError: "Something Wrong"
//         });
//       });
//     //
//   };

//   // track change
//   handleChange = e => {
//     // handle checkedbox: https://stackoverflow.com/questions/55530348/react-how-to-pass-the-condition-when-checkbox-is-checked
//     const target = e.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     console.log(value);
//     this.setState({
//       [name]: value
//     });
//   };

//   goBack = () => {
//     this.props.history.goBack();
//   };

//   render() {
//     console.log(this.state);
//     console.log(this.props);

//     // redirect jika succes update
//     if (this.state.updateStatus === 200) {
//       return <Redirect to="/app/tables/kelompokpelanggan" />;
//     }

//     const {
//       dataArea,
//       dataDistributor,
//       dataKelompokPelanggan,
//       dataPelanggan
//     } = this.props;

//     return (
//       <div className={s.root}>
//         <Row className="py-5 justify-content-center">
//           <Col lg={12}>
//             <h4 className="page-title fw-semi-bold text-center">
//               Edit Data Pelanggan
//             </h4>
//           </Col>
//           <Col lg={8} className="justify-content-center">
//             <Widget refresh collapse close className="px-5">
//               <Form className="mt-5" onSubmit={this.doUpdateData}>
//                 {/* name */}
//                 <FormGroup>
//                   <Label for="name">Nama</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="text"
//                     name="name"
//                     id="name"
//                     placeholder="Masukkan Nama"
//                   />
//                 </FormGroup>
//                 {/* code */}
//                 <FormGroup>
//                   <Label for="code">Kode</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="text"
//                     name="code"
//                     id="code"
//                     placeholder="Masukkan kode"
//                   />
//                 </FormGroup>
//                 {/* costumer_id */}
//                 <FormGroup>
//                   <Label for="customer_group_id">ID Kelompok Pelanggan</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="select"
//                     name="customer_group_id"
//                     id="customer_group_id"
//                   >
//                     {dataKelompokPelanggan.map(item => {
//                       return <option value={item._id}>{item.name}</option>;
//                     })}
//                   </Input>
//                 </FormGroup>
//                 {/* distributor_id */}
//                 <FormGroup>
//                   <Label for="distributor_id">Distributor ID </Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="select"
//                     name="distributor_id"
//                     id="distributor_id"
//                   >
//                     <option value={null}></option>
//                     {dataDistributor.map(item => {
//                       return <option value={item._id}>{item.name}</option>;
//                     })}
//                   </Input>
//                 </FormGroup>
//                 {/* Area_Id */}
//                 <FormGroup>
//                   <Label for="exampleKode">Area ID </Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="select"
//                     name="area_id"
//                     id="exampleSelect"
//                   >
//                     <option value={null}></option>
//                     {dataArea.map(item => {
//                       return <option value={item._id}>{item.name}</option>;
//                     })}
//                   </Input>
//                 </FormGroup>
//                 {/* Email */}
//                 <FormGroup>
//                   {/* tampilkan distributor name dan id nya sebagai value */}
//                   <Label for="email">Email</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="text"
//                     name="email"
//                     id="email"
//                     placeholder="Masukkan Email"
//                   />
//                   {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
//                   {/* <FormText>Example help text that remains unchanged.</FormText> */}
//                 </FormGroup>
//                 {/* Address */}
//                 <FormGroup>
//                   {/* tampilkan distributor name dan id nya sebagai value */}
//                   <Label for="address">Alamat</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="textarea"
//                     name="address"
//                     id="address"
//                     placeholder="Masukkan Alamat"
//                   />
//                   {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
//                   {/* <FormText>Example help text that remains unchanged.</FormText> */}
//                 </FormGroup>
//                 {/* phone */}
//                 <FormGroup>
//                   <Label for="phone">Telepon</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="text"
//                     name="phone"
//                     id="phone"
//                     placeholder="Masukkan No.Telp"
//                   />
//                   {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
//                   {/* <FormText>Example help text that remains unchanged.</FormText> */}
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="status">Status</Label>
//                   <Input
//                     onChange={this.handleChange}
//                     type="text"
//                     name="status"
//                     id="status"
//                     placeholder="Masukkan Status"
//                   />
//                   {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
//                   {/* <FormText>Example help text that remains unchanged.</FormText> */}
//                 </FormGroup>

//                 <div className="float-right">
//                   <Button
//                     className="my-5 px-5 ml-5"
//                     color="light"
//                     type="button"
//                     onClick={this.goBack}
//                   >
//                     Kembali
//                   </Button>
//                   <Button
//                     className="my-5 px-5 ml-5"
//                     color="primary"
//                     type="submit"
//                   >
//                     Simpan
//                   </Button>
//                 </div>
//               </Form>
//             </Widget>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     // DISTRIBUTOR
//     dataDistributor: state.reducerDistributor.dataDistributor,
//     // TARIF
//     dataTarif: state.reducerTarif.dataTarif
//   };
// }

// export default connect(mapStateToProps)(Editdatapelanggan);
