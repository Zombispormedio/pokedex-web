import {
  REQUEST_FAV_POKEMON,
  RECEIVE_FAV_POKEMON
} from '../config/actionTypes'
import Api from '../config/Api'
import {showSnackbar} from './snackbarActions'

const scope = "fav"

function requestFavPokemon(id) {
  return {
    type: REQUEST_FAV_POKEMON,
    pokemonId: id
  }
}

function receiveFavPokemon(json) {
  return {
    type: RECEIVE_FAV_POKEMON,
    pokemon: json.data
  }
}


function refuseFav(dispatch, id, data){
    dispatch(requestFavPokemon(id))
    dispatch(showSnackbar(data.errors[0].message))
}


export function favPokemon(id) {
  return dispatch => {
    dispatch(requestFavPokemon(id))

    return Api.patch(`${scope}/${id}`)
      .then(json => {

        if(json.errors!= void 0){
            return refuseFav(dispatch, id, json);
        }
        dispatch(receiveFavPokemon(json));
      })
  }
}