import axios from "axios";

// bahan, type untuk dikirim ke reducers
export const GET_PERANGKAT_SUCCESS = "GET_PERANGKAT_SUCCESS";
export const GET_PERANGKAT_ERROR = "GET_PERANGKAT_ERROR";
export const CREATE_PERANGKAT_SUCCESS = "CREATE_PERANGKAT_SUCCESS";
export const CREATE_PERANGKAT_ERROR = "CREATE_PERANGKAT_ERROR";
export const DELETE_PERANGKAT_SUCCESS = "DELETE_PERANGKAT_SUCCESS";
export const DELETE_PERANGKAT_ERROR = "DELETE_PERANGKAT_ERROR";

// pengolah bahan, fungsi yang mengembalikan bahan
export const getPerangkatSuccess = data => {
  return {
    type: GET_PERANGKAT_SUCCESS,
    data
  };
};
export const getPerangkatError = payload => {
  return {
    type: GET_PERANGKAT_ERROR,
    payload
  };
};
export const createPerangkatSuccess = data => {
  return {
    type: CREATE_PERANGKAT_SUCCESS,
    data
  };
};
export const createPerangkatError = payload => {
  return {
    type: CREATE_PERANGKAT_ERROR,
    payload
  };
};
export const deletePerangkatSuccess = data => {
  return {
    type: DELETE_PERANGKAT_SUCCESS,
    data
  };
};
export const deletePerangkatError = payload => {
  return {
    type: DELETE_PERANGKAT_ERROR,
    payload
  };
};

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataPerangkat = currentPage => {
  return dispatch => {
    let url = currentPage ? "/api/device?page=" + currentPage : "/api/device";
    console.log(currentPage);
    axios
      .get(url)
      .then(res => {
        return dispatch(getPerangkatSuccess(res.data.message));
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(getPerangkatError(err.response.status));
        }
      });
  };
};
export const createDataPerangkat = postData => {
  return dispatch => {
    axios
      .post("/api/device/", postData)
      .then(res => {
        // jika success
        if (res.data.code >= 200 || res.data.code < 300) {
          console.log(res);
          // ketika Error masuk kesini, backend
          // dispatch(createSuccess(res.data.status))
          dispatch(createPerangkatSuccess(res.data.message.data));
        } else {
          // jika validasi dari server error
          // dispatch(createPerangkatError(res.data.message))
        }
        dispatch(getDataPerangkat());
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(createPerangkatError(err.response.status));
        }
      });
  };
};

export const deleteDataPerangkat = id => {
  return dispatch => {
    axios
      .delete("/api/device/" + id)
      .then(res => {
        console.log(res.data);
        if (res.data.code >= 200 || res.data.code < 300) {
          dispatch(deletePerangkatSuccess(res.data.message));
        }
        dispatch(getDataPerangkat());
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          dispatch(deletePerangkatError(err.response.status));
        }
      });
  };
};
