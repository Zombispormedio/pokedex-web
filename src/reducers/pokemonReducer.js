import {REQUEST_POKEMONS, NEXT_POKEMONS} from '../config/actionTypes'
import {createReducer, mergeArrays} from './reducerUtils'

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
        items: mergeArrays(state.items, pokemons),
        lastUpdated: action.receivedAt, 
        page: resolvePage(state, action)
      }
}

function resolvePage(state, action){
  return action.pokemons.length==0?
    state.page 
    : action.page
}

const pokemonReducer = createReducer(initState, {
    [REQUEST_POKEMONS]: requestPokemon, 
    [NEXT_POKEMONS]: nextPokemons
})

export default pokemonReducer
