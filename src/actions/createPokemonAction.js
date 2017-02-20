import { REQUEST_CREATE_POKEMON, RECEIVE_CREATE_POKEMONS} from '../config/actionTypes'
import Api from '../config/Api'
import {showSnackbar} from './snackbarAction'

const scope = "pokemons"


function requestCreatePokemon(body) {
  return {
    type: REQUEST_CREATE_POKEMON,
    body
  }
}

function receiveCreatePokemon(data, error) {
  return {
    type:  RECEIVE_CREATE_POKEMONS,
    pokemon: data,
    validated: error != true
  }
}

function generateMessage(errors){
    
    if(errors.name != void 0){
    
    }else if(errors.description != void 0){

    }else if(errors.type_id){

    }else if(errors.type){

    }
}

function handleError(dispatch, json){
    const message = generateMessage(json.errors)
    dispatch(showSnackbar(message))
    dispatch(receiveCreatePokemon(void 0, true))
}

export function createPokemon(pokemon) {
  return dispatch => {
    dispatch(requestCreatePokemon(pokemon))

    return Api.post(`${scope}`, {pokemon})
      .then(json => {
         if(json.errors!= void 0){
            return handleError(dispatch, json);
        }
        dispatch(receiveCreatePokemon(json.data));
      })
  }
}