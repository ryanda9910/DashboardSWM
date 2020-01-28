import axios from 'axios';

// bahan, type untuk dikirim ke reducers
export const GET_KELOMPOK_PELANGGAN_SUCCESS = 'GET_KELOMPOK_PELANGGAN_SUCCESS';
export const GET_KELOMPOK_PELANGGAN_ERROR = 'GET_KELOMPOK_PELANGGAN_ERROR';
export const CREATE_KELOMPOK_PELANGGAN_SUCCESS = 'CREATE_KELOMPOK_PELANGGAN_SUCCESS';
export const CREATE_KELOMPOK_PELANGGAN_ERROR = 'CREATE_KELOMPOK_PELANGGAN_ERROR';
export const DELETE_KELOMPOK_PELANGGAN_SUCCESS = 'DELETE_KELOMPOK_PELANGGAN_SUCCESS';
export const DELETE_KELOMPOK_PELANGGAN_ERROR = 'DELETE_KELOMPOK_PELANGGAN_ERROR';

// pengolah bahan, fungsi yang mengembalikan bahan
export const getKelompokPelangganSuccess = (data) => {
  return {
    type: GET_KELOMPOK_PELANGGAN_SUCCESS,
    data
  }
}
export const getKelompokPelangganError = (payload) => {
  return {
    type: GET_KELOMPOK_PELANGGAN_ERROR,
    payload
  }
}
export const createKelompokPelangganSuccess = (data) => {
  return {
    type: CREATE_KELOMPOK_PELANGGAN_SUCCESS,
    data
  }
}
export const createKelompokPelangganError = (payload) => {
  return {
    type: CREATE_KELOMPOK_PELANGGAN_ERROR,
    payload
  }
}
export const deleteKelompokPelangganSuccess = (data) => {
  return {
    type: DELETE_KELOMPOK_PELANGGAN_SUCCESS,
    data
  }
}
export const deleteKelompokPelangganError = (payload) => {
  return {
    type: DELETE_KELOMPOK_PELANGGAN_ERROR,
    payload
  }
}

// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataKelompokPelanggan = () => {
  return (dispatch) => {
    axios.get('/api/custgroup')
    .then(res => {
      console.log(res.data);
      return dispatch(getKelompokPelangganSuccess(res.data.message.data));
    })
    .catch(err => {
      console.log(err.response);
      dispatch(getKelompokPelangganError(err.response.status));
    });
  }
}
export const createDataKelompokPelanggan = (postData) => {
  return (dispatch) => {
    axios.post("/api/custgroup/", postData)
    .then(res => {
      // jika success
      if (res.data.code >= 200 || res.data.code < 300) {
        console.log(res)
        // ketika Error masuk kesini, backend
        // dispatch(createSuccess(res.data.status))
        dispatch(createKelompokPelangganSuccess(res.data.message.data))
      }else{
        // jika validasi dari server error
        // dispatch(createKelompokPelangganError(res.data.message))
      }
      dispatch(getDataKelompokPelanggan())
    })
    .catch(err => {
      dispatch(createKelompokPelangganError(err.response.status))     
    });
  }
}
export const deleteDataKelompokPelanggan = (id) => {
  return (dispatch) => {
    axios.delete("/api/custgroup/" + id)
      .then(res => {
        console.log(res.data)
        if (res.data.code >= 200 || res.data.code < 300){
          dispatch(deleteKelompokPelangganSuccess(res.data.message))
        }
        dispatch(getDataKelompokPelanggan())
      })
      .catch(err => {
        dispatch(deleteKelompokPelangganError(err.response.status))
      });
  }
}