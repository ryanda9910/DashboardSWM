// const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "https://flatlogic-node-backend.herokuapp.com";
// const portApi = process.env.NODE_ENV === "development" ? 8080 : "";
// const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;

// export default {
//   hostApi,
//   portApi,
//   baseURLApi,
//   remote: "https://flatlogic-node-backend.herokuapp.com",
//   isBackend: process.env.REACT_APP_BACKEND,
//   auth: {
//     email: 'admin@flatlogic.com',
//     password: 'password'
//   }
// };

// CUSTOM

// nusa fox
const hostApi = "https://s01.nusafox.com:6661";
// local hendri
// const hostApi = "http://swm-apis.herokuapp.com";
// const portApi = 5000;
const portApi = "";
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;
const baseURLApp = window.location.origin;
const token = localStorage.getItem('token');
// const userName='';
// if(token){
//   userName = jwt.decode(token).user_name;
// }
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + token
  }
}

export default {
  hostApi,
  portApi,
  baseURLApi,
  remote: "http://swm-apis.herokuapp.com",
  isBackend: true,
  // auth: {
  //   email: 'admin@flatlogic.com',
  //   password: 'password'
  // }

  // CUSTOM
  baseURLApp,
  token,
  axiosConfig,
};