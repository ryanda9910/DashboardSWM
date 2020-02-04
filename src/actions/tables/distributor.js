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
export const createDistributorSuccess = data => {
  return {
    type: CREATE_DISTRIBUTOR_SUCCESS,
    data
  };
};
export const createDistributorError = payload => {
  return {
    type: CREATE_DISTRIBUTOR_ERROR,
    payload
  };
};
export const deleteDistributorSuccess = data => {
  return {
    type: DELETE_DISTRIBUTOR_SUCCESS,
    data
  };
};
export const deleteDistributorError = payload => {
  return {
    type: DELETE_DISTRIBUTOR_ERROR,
    payload
  };
};
// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataDistributor = currentPage => {
  return dispatch => {
    let url = currentPage
      ? "/api/distributor?page=" + currentPage
      : "/api/distributor";
    console.log(currentPage);
    axios
      .get(url)
      .then(res => {
        // console.log(res.data.message.data);
        return dispatch(getDistributorSuccess(res.data.message));
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(getDistributorError(err.response.status));
        }
      });
  };
};
export const createDataDistributor = postData => {
  return dispatch => {
    axios
      .post("/api/distributor/", postData)
      .then(res => {
        // jika success
        if (res.data.code >= 200 || res.data.code < 300) {
          console.log(res);
          // ketika Error masuk kesini, backend
          // dispatch(createSuccess(res.data.status))
          dispatch(createDistributorSuccess(res.data.message.data));
        } else {
          // jika validasi dari server error
          // dispatch(createDistributorError(res.data.message))
        }
        dispatch(getDataDistributor());
      })
      .catch(err => {
        if (err.response) {
          dispatch(createDistributorError(err.response.status));
        }
      });
  };
};
export const deleteDataDistributor = id => {
  return dispatch => {
    axios
      .delete("/api/Distributor/" + id)
      .then(res => {
        dispatch(getDistributorSuccess(res.data.message.data));
        dispatch(getDataDistributor());
      })
      .catch(err => {
        if (err.response) {
          dispatch(deleteDistributorError(err.response.status));
        }
      });
  };
};
