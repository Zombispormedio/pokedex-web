import {
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  REQUEST_SHOW_POKEMON,
  RECEIVE_SHOW_POKEMON
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
    type: RECEIVE_POKEMONS,
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
      .catch(() => {
        dispatch(nextPokemons(page, {
          data: []
        }));
      })
  }
}


function requestPokemonById(id) {
  return {
    type: REQUEST_SHOW_POKEMON,
    id
  }
}

function receivePokemonById(error, data) {
  return {
    type: RECEIVE_SHOW_POKEMON,
    pokemon: data,
    error: error
  }
}


export function fetchPokemonById(id, errorCb) {
  return dispatch => {
    dispatch(requestPokemonById(id))
    return Api.get(`${scope}/${id}`)
      .then(json => {
        if (json.errors != void 0) {
          dispatch(receivePokemonById(json.errors, json.data));
          return errorCb();
        }
        dispatch(receivePokemonById(null, json.data));
      })
  }
}