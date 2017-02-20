import {REQUEST_TYPES, RECEIVE_TYPES} from '../config/actionTypes'
import {createReducer} from './reducerUtils'

const initState = {
    isFetching: false,
    items: []
}

function requestTypes(state){
  return { ...state, isFetching: true}
}

function receiveTypes(state, {data}){
  return {...state, 
        isFetching: false,
        items: data.map((i) =>{
            return  {label: i.name, value: i.id}
            }),
      }
}


const typeReducer = createReducer(initState, {
    [REQUEST_TYPES]: requestTypes, 
    [RECEIVE_TYPES]: receiveTypes,
})

export default typeReducer