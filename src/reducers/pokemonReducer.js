import {REQUEST_POKEMONS, RECEIVE_POKEMONS} from '../actions/actionTypes'

export function pokemons(state = {
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
    case REQUEST_POKEMONS:
      return { ...state, isFetching: true}
    case RECEIVE_POKEMONS:
      return  {...state, 
        isFetching: false,
        items: action.pokemons,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}
