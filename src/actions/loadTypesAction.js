import { REQUEST_TYPES,RECEIVE_TYPES} from '../config/actionTypes'
import Api from '../config/Api'

const scope = "types"

function requestTypes() {
  return {
    type: REQUEST_TYPES,
  }
}

function receiveTypes(json) {
  return {
    type: RECEIVE_TYPES,
    data: json.data
  }
}


export function fetchTypes() {
  return dispatch => {
    dispatch(requestTypes())
    return Api.get(`${scope}`)
      .then(json => {
        dispatch(receiveTypes(json));
      })
  }
}