import {
  REQUEST_CREATE_POKEMON,
  RECEIVE_CREATE_POKEMON,
  REQUEST_UPDATE_POKEMON,
  RECEIVE_UPDATE_POKEMON,
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  REQUEST_SHOW_POKEMON,
  RECEIVE_SHOW_POKEMON
} from '../config/actionTypes'
import Api from '../config/Api'
import {showSnackbar} from './snackbarActions'
import {generateValidationMessage} from '../lib/utils'

const scope = "pokemons"

function requestCreatePokemon(body) {
  return {
    type: REQUEST_CREATE_POKEMON,
    body
  }
}

function receiveCreatePokemon(data, error) {
  return {
    type: RECEIVE_CREATE_POKEMON,
    pokemon: data,
    validated: error != true
  }
}


function handleCreateError(dispatch, json) {
  const message = generateValidationMessage(json.errors)
  dispatch(showSnackbar(message))
  dispatch(receiveCreatePokemon(void 0, true))
}

export function createPokemon(pokemon, callback) {
  return dispatch => {
    dispatch(requestCreatePokemon(pokemon))

    return Api.post(`${scope}`, {
        pokemon
      })
      .then(json => {
        if (json.errors != void 0) {
          return handleCreateError(dispatch, json);
        }
        dispatch(receiveCreatePokemon(json.data));
        if (callback != void 0) {
            callback();
        }
      })
  }
}

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

function receivePokemonById(data, error) {
  return {
    type: RECEIVE_SHOW_POKEMON,
    pokemon: data,
    notFound: error != void 0
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
        dispatch(receivePokemonById(json.data));
      })
  }
}


function requestUpdatePokemon(body) {
  return {
    type: REQUEST_UPDATE_POKEMON,
    body
  }
}

function receiveUpdatePokemon(data, error) {
  return {
    type: RECEIVE_UPDATE_POKEMON,
    pokemon: data,
    validated: error != true
  }
}

function handleUpdateError(dispatch, json) {
  const message = generateValidationMessage(json.errors)
  dispatch(showSnackbar(message))
  dispatch(receiveUpdatePokemon(void 0, true))
}

export function updatePokemon(id, pokemon, callback) {
  return dispatch => {
    dispatch(requestUpdatePokemon(pokemon))
    return Api.put(`${scope}/${id}`, {
        pokemon
      })
      .then(json => {
        if (json.errors != void 0) {
          return handleUpdateError(dispatch, json);
        }
        dispatch(receiveUpdatePokemon(json.data));
        if (callback != void 0) {
            callback()
        }
      })
  }
}