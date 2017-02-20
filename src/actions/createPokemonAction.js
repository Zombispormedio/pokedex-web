import {
  REQUEST_CREATE_POKEMON,
  RECEIVE_CREATE_POKEMON
} from '../config/actionTypes'
import Api from '../config/Api'
import {
  showSnackbar
} from './snackbarAction'

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

function generateMessage(errors) {
  if (errors.name != void 0) {
    return `Nombre ${errors.name[0]}`
  } else if (errors.description != void 0) {
    return `Descripción ${errors.description[0]}`
  } else if (errors.type_id) {
    return `Tipo 1 ${errors.name[0]}`
  } else if (errors.type) {
    return `Tipos ${errors.name[0]}`
  }
}

function handleError(dispatch, json) {
  const message = generateMessage(json.errors)
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
          return handleError(dispatch, json);
        }
        dispatch(receiveCreatePokemon(json.data));
         console.log(callback)
         console.log(callback != void 0)
        if (callback != void 0) {
         
          dispatch(callback());
        }
      })
  }
}