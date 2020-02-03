import axios from "axios";

// bahan, type untuk dikirim ke reducers
export const GET_AREA_SUCCESS = "GET_AREA_SUCCESS";
export const GET_AREA_ERROR = "GET_AREA_ERROR";
export const CREATE_AREA_SUCCESS = "CREATE_AREA_SUCCESS";
export const CREATE_AREA_ERROR = "CREATE_AREA_ERROR";
export const DELETE_AREA_SUCCESS = "DELETE_AREA_SUCCESS";
export const DELETE_AREA_ERROR = "DELETE_AREA_ERROR";
export const DETAIL_AREA_SUCCESS = "DETAIL_AREA_SUCCESS";
export const DETAIL_AREA_ERROR = "DETAIL_AREA_ERROR";


// pengolah bahan, fungsi yang mengembalikan bahan
export const getAreaSuccess = data => {
  return {
    type: GET_AREA_SUCCESS,
    data
  };
};
export const getAreaError = payload => {
  return {
    type: GET_AREA_ERROR,
    payload
  };
};
export const createAreaSuccess = data => {
  return {
    type: CREATE_AREA_SUCCESS,
    data
  };
};
export const createAreaError = payload => {
  return {
    type: CREATE_AREA_ERROR,
    payload
  };
};
export const deleteAreaSuccess = data => {
  return {
    type: DELETE_AREA_SUCCESS,
    data
  };
};
export const deleteAreaError = payload => {
  return {
    type: DELETE_AREA_ERROR,
    payload
  };
};
// export const detailAreaSuccess = data => {
//   return {
//     type: DETAIL_AREA_SUCCESS,
//     data
//   };
// };
// export const detailAreaError = payload => {
//   return {
//     type: DETAIL_AREA_ERROR,
//     payload
//   };
// };


// pengeksekusi, fungsi yang berhubungan langsung dengan server
export const getDataArea = (currentPage) => {
  // pagination

  return (dispatch) => {
    // axios.get('/api/area?page=2')
    let url = currentPage ? '/api/area?page='+currentPage : '/api/area';
    console.log(currentPage);
    axios.get(url)
    .then(res => {
      console.log(url);
      console.log(res.data);
      dispatch(getAreaSuccess(res.data.message));
    })
    .catch(err => {
      console.log(err.response);
      if(err.response){
        dispatch(getAreaError(err.response.status));
      }
    });
  }
}
export const createDataArea = (postData) => {
  return (dispatch) => {
    axios.post("/api/area/", postData)
    .then(res => {
      // jika success
      if (res.data.code >= 200 || res.data.code < 300) {
        console.log(res)
        // ketika Error masuk kesini, backend
        // dispatch(createSuccess(res.data.status))
        dispatch(createAreaSuccess(res.data.message.data))
      }else{
        // jika validasi dari server error
        // dispatch(createAreaError(res.data.message))
      }
      dispatch(getDataArea())
    })
    .catch(err => {
      if(err.response){
        dispatch(createAreaError(err.response.status))     
      }
    });
  }
}
export const deleteDataArea = id => {
  return dispatch => {
    axios
      .delete("/api/area/" + id)
      .then(res => {
        console.log(res.data);
        if (res.data.code >= 200 || res.data.code < 300) {
          dispatch(deleteAreaSuccess(res.data.message));
        }
        dispatch(getDataArea());
      })
      .catch(err => {
        if(err.response){
          dispatch(deleteAreaError(err.response.status))
        }
      });
  };
};
// export const detailDataArea = id => {
//   return dispatch => {
//     axios
//       .get("/api/area/" + id)
//       .then(res => {
//         console.log(res.data);
//         dispatch(detailAreaSuccess(res.data.data));
//       })
//       .catch(err => {
//         if(err.response){
//           dispatch(detailAreaError(err.response.status))
//         }
//       });
//   };
// };
