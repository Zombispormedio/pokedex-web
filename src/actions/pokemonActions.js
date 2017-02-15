import {REQUEST_POKEMONS, RECEIVE_POKEMONS} from './actionTypes'

function requestPokemons(page) {
  return {
    type: REQUEST_POKEMONS,
    page
  }
}

function receivePokemons(page, json) {
  return {
    type: RECEIVE_POKEMONS,
    page,
    pokemons: json.data.reduce((memo, item) => { 
      return {...memo, [item.id]: item}
    }, {}),
    receivedAt: Date.now()
  }
}

export function fetchPokemons(page) {
  return dispatch => {
    dispatch(requestPokemons(page))
    return fetch(`http://pokeapi.co/api/v2/pokemon/1`)
      .then(json => {
        dispatch(receivePokemons(page, {data: [{id: 5, name: "hello"}]}));
      })
  }
}