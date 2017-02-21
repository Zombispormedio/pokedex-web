import {
  REQUEST_CREATE_POKEMON,
  RECEIVE_CREATE_POKEMON,
  REQUEST_UPDATE_POKEMON,
  RECEIVE_UPDATE_POKEMON,
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  REQUEST_SHOW_POKEMON,
  RECEIVE_SHOW_POKEMON,
  REQUEST_DELETE_POKEMON,
  RECEIVE_DELETE_POKEMON
} from '../config/actionTypes'
import Api from '../config/Api'
import {showSnackbar} from './snackbarActions'
import {generateValidationMessage, buildQueryPath} from '../lib/utils'

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

function requestPokemons(opts) {
  return {
    type: REQUEST_POKEMONS,
    ...opts
  }
}

function nextPokemons(opts, json) {
  return {
    type: RECEIVE_POKEMONS,
    ...opts,
    pokemons: json.data,
    receivedAt: Date.now()
  }
}

export function fetchPokemons(query, opts ={}) {
  return dispatch => {
    dispatch(requestPokemons(opts))
    const queryPath = buildQueryPath(query);

    return Api.get(`${scope}?${queryPath}`)
      .then(json => {
        dispatch(nextPokemons({...query, opts}, json));
      })
      .catch(() => {
        dispatch(nextPokemons(query, {
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


function requestDeletePokemon(id) {
  return {
    type: REQUEST_DELETE_POKEMON,
    id
  }
}

function receiveDeletePokemon(id) {
  return {
    type: RECEIVE_DELETE_POKEMON,
    id
  }
}

export function deletePokemon(id, callback) {
  return dispatch => {
    dispatch(requestDeletePokemon(id))
    return Api.del(`${scope}/${id}`)
      .then(() => {
        dispatch(receiveDeletePokemon(id));
        if (callback != void 0) {
            callback()
        }
      })
  }
}

