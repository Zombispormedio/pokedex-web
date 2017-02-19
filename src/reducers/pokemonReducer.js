import {REQUEST_POKEMONS, RECEIVE_POKEMONS,
   REQUEST_FAV_POKEMON, RECEIVE_FAV_POKEMON} from '../config/actionTypes'
import {createReducer, mergeArrays, updateArrayByCallback, updateArrayByItem} from './reducerUtils'

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
        page: action.pokemons.length==0? state.page : action.page
      }
}

function requestFavPokemon(state, action){
  return { ...state, 
        items: updateArrayByCallback(state.items, action.pokemonId, (item) => {
          return {...item, fav: !item.fav}
        })
    }
}

function receiveFavPokemon(state, action){
  return { ...state, 
        items: updateArrayByItem(state.items, action.pokemon)
    }
}


const pokemonReducer = createReducer(initState, {
    [REQUEST_POKEMONS]: requestPokemon, 
    [RECEIVE_POKEMONS]: nextPokemons,
    [REQUEST_FAV_POKEMON]: requestFavPokemon, 
    [RECEIVE_FAV_POKEMON]: receiveFavPokemon
})

export default pokemonReducer
