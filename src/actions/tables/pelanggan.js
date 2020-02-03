import axios from "axios";

// bahan, type untuk dikirim ke reducers
export const GET_PELANGGAN_SUCCESS = "GET_PELANGGAN_SUCCESS";
export const GET_PELANGGAN_ERROR = "GET_PELANGGAN_ERROR";
export const CREATE_PELANGGAN_SUCCESS = "CREATE_PELANGGAN_SUCCESS";
export const CREATE_PELANGGAN_ERROR = "CREATE_PELANGGAN_ERROR";
export const DELETE_PELANGGAN_SUCCESS = "DELETE_PELANGGAN_SUCCESS";
export const DELETE_PELANGGAN_ERROR = "DELETE_PELANGGAN_ERROR";

// pengolah bahan, fungsi yang mengembalikan bahan
export const getPelangganSuccess = data => {
  return {
    type: GET_PELANGGAN_SUCCESS,
    data
  };
};
export const getPelangganError = payload => {
  return {
    type: GET_PELANGGAN_ERROR,
    payload
  };
};
export const createPelangganSuccess = data => {
  return {
    type: CREATE_PELANGGAN_SUCCESS,
    data
  };
};
export const createPelangganError = payload => {
  return {
    type: CREATE_PELANGGAN_ERROR,
    payload
  };
};
export const deletePelangganSuccess = data => {
  return {
    type: DELETE_PELANGGAN_SUCCESS,
    data
  };
};
export const deletePelangganError = payload => {
  return {
    type: DELETE_PELANGGAN_ERROR,
    payload
  };
};

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataPelanggan = currentPage => {
  return dispatch => {
    let url = currentPage
      ? "/api/customer?page=" + currentPage
      : "/api/customer";
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        return dispatch(getPelangganSuccess(res.data.message));
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(getPelangganError(err.response.status));
        }
      });
  };
};
export const createDataPelanggan = postData => {
  return dispatch => {
    axios
      .post("/api/customer/", postData)
      .then(res => {
        // jika success
        if (res.data.code >= 200 || res.data.code < 300) {
          console.log(res);
          // ketika Error masuk kesini, backend
          // dispatch(createSuccess(res.data.status))
          dispatch(createPelangganSuccess(res.data.message.data));
        } else {
          // jika validasi dari server error
          // dispatch(createPelangganError(res.data.message))
        }
        dispatch(getDataPelanggan());
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(createPelangganError(err.response.status));
        }
      });
  };
};

export const deleteDataPelanggan = id => {
  return dispatch => {
    axios
      .delete("/api/customer/" + id)
      .then(res => {
        console.log(res.data);
        if (res.data.code >= 200 || res.data.code < 300) {
          dispatch(deletePelangganSuccess(res.data.message));
        }
        dispatch(getDataPelanggan());
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(deletePelangganError(err.response.status));
        }
      });
  };
};
