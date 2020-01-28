import axios from "axios";

// bahan, type untuk dikirim ke reducers
export const GET_DISTRIBUTOR_SUCCESS = "GET_DISTRIBUTOR_SUCCESS";
export const GET_DISTRIBUTOR_ERROR = "GET_DISTRIBUTOR_ERROR";
export const CREATE_DISTRIBUTOR_SUCCESS = "CREATE_DISTRIBUTOR_SUCCESS";
export const CREATE_DISTRIBUTOR_ERROR = "CREATE_DISTRIBUTOR_ERROR";
export const DELETE_DISTRIBUTOR_SUCCESS = "DELETE_DISTRIBUTOR_SUCCESS";
export const DELETE_DISTRIBUTOR_ERROR = "DELETE_DISTRIBUTOR_ERROR";

// pengolah bahan, fungsi yang mengembalikan bahan
export const getDistributorSuccess = data => {
  return {
    type: GET_DISTRIBUTOR_SUCCESS,
    data
  };
};
export const getDistributorError = payload => {
  return {
    type: GET_DISTRIBUTOR_ERROR,
    payload
  };
};

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataDistributor = () => {
  return dispatch => {
    axios
      .get("/api/distributor")
      .then(res => {
        // console.log(res.data.message.data);
        return dispatch(getDistributorSuccess(res.data.message.data));
      })
      .catch(err => {
        console.log(err.response);
        // dispatch(getDistributorError(err.response.status));
      });
  };
};
