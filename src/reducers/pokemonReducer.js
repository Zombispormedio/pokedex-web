import {REQUEST_POKEMONS, NEXT_POKEMONS} from '../config/actionTypes'
import {createReducer, concat} from './reducerUtils'

const initState = {
  isFetching: false,
  items: [],
  page: 0
}

function requestPokemon(state){
  return { ...state, isFetching: true}
}

function nextPokemons(state, action){
  const pokemons =action.pokemons;
  return {...state, 
        isFetching: false,
        items: state.items.concat(pokemons),
        lastUpdated: action.receivedAt, 
        page: action.page
      }
}

const pokemonReducer = createReducer(initState, {
    [REQUEST_POKEMONS]: requestPokemon, 
    [NEXT_POKEMONS]: nextPokemons
})

export default pokemonReducer
