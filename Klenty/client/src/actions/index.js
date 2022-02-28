import * as pageTypes from '../constants/PageActionTypes'
import axios from "axios";
// const serverUrl = 'http://localhost:8080';
const serverUrl = "";

export function loginUser(data) {
    return (dispatch) => {
      axios.post(serverUrl + '/api/v1/login', data)
      .then(res => {
          if(res.status === 200) {
            localStorage.setItem('token', 'Bearer ' + res.data.token)
            localStorage.setItem('username', res.data.username)
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: "LoggedIn Successfully !!!"
              }
            })
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => 
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorMessage: err.message
          }
        })
      )
    }
}

export function signupuser(data) {
    return (dispatch) => {
      axios.post(serverUrl + '/api/v1/signup', data)
      .then(res => {
          if(res.status === 201) {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: "User Created Successfully !!!"
              }
            })
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => 
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorMessage: err.message
          }
        })
      )
    }
}

export function createDiscussion(data, header) {
    return (dispatch) => {
      axios.post(serverUrl + '/api/v1/discussion', data, header)
        .then((response) => {
          if (response.status === 201) {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: "Data Created Successfully !!!"
              }
            })
            dispatch(fetchAllDiscussion())
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: response.data.message
              }
            })
          }
        })
        .catch((err) => {
          dispatch({
            type: pageTypes.ERROR_VALIDATION,
            payload: {
              error: true,
              errorMessage: err.message
            }
          })
        })
    }
  }

export function fetchAllDiscussion(data) {
  return (dispatch) => {

    axios.get(serverUrl + '/api/v1/discussions').then(res => {
      if(res.status === 200){
        dispatch({
          type: 'ALL_DISCUSSION',
          payload: {
            discussions: res.data.message
          }
        })
      }    
      else {
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorMessage: res.data.message
          }
        })
      }
  }).catch(err => 
    dispatch({
      type: pageTypes.ERROR_VALIDATION,
      payload: {
        error: true,
        errorMessage: err.message
      }
    }))
  }
}




export function addComment(discussionId, data, header) {
  return (dispatch) => {
    axios.post(`${serverUrl}/api/v1/do-comment/${discussionId}`, data, header)
      .then(res => {
          if(res.status === 201) {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: "Commented Successfully !!!"
              }
            })
            dispatch(fetchAllDiscussion())
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => dispatch({
        type: pageTypes.ERROR_VALIDATION,
        payload: {
          error: true,
          errorMessage: err.message
        }
      }))
  }
}


export function resetError() {
  return (dispatch) => {
    dispatch({
      type: pageTypes.ERROR_VALIDATION,
        payload: {
          error: false,
          errorMessage: ''
        } 
    })
  }
}

