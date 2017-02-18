import {
  REQUEST_POKEMONS,
  NEXT_POKEMONS
} from '../config/actionTypes'
import Api from '../config/Api'

const scope = "pokemons"

function requestPokemons(page) {
  return {
    type: REQUEST_POKEMONS,
    page
  }
}

function nextPokemons(page, json) {
  return {
    type: NEXT_POKEMONS,
    page,
    pokemons: json.data,
    receivedAt: Date.now()
  }
}

export function fetchPokemons(page) {
  return dispatch => {
    dispatch(requestPokemons(page))
    return Api.get(`${scope}?p=${page}`)
      .then(json => {
        dispatch(nextPokemons(page, json));
      })
      .catch(res => {
        dispatch(nextPokemons(page, {
          data: []
        }));
      })
  }
}