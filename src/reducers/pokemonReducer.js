import {REQUEST_POKEMONS, RECEIVE_POKEMONS, REQUEST_FAV_POKEMON, RECEIVE_FAV_POKEMON} from '../config/actionTypes'
import {createReducer, mergeArrays, updateArrayByCallback, updateArrayByItem, orderByFav} from './reducerUtils'

const initState = {
  isFetching: false,
  items: [],
  page: 0
}

function withOrderedItems(obj){
    return { ...obj, items: orderByFav(obj.items)}
}

function requestPokemon(state){
  return { ...state, isFetching: true}
}

function nextPokemons(state, {pokemons, receivedAt, page}){
  return withOrderedItems({...state, 
        isFetching: false,
        items: mergeArrays(state.items, pokemons),
        lastUpdated: receivedAt, 
        page: pokemons.length==0? state.page : page
      })
}

function requestFavPokemon(state, {pokemonId}){
  return { ...state, 
        items: updateArrayByCallback(state.items, pokemonId, (item) => {
          return {...item, fav: !item.fav}
        })
    }
}

function receiveFavPokemon(state, {pokemon}){
  return { ...state, 
        items: updateArrayByItem(state.items, pokemon)
    }
}


const pokemonReducer = createReducer(initState, {
    [REQUEST_POKEMONS]: requestPokemon, 
    [RECEIVE_POKEMONS]: nextPokemons,
    [REQUEST_FAV_POKEMON]: requestFavPokemon, 
    [RECEIVE_FAV_POKEMON]: receiveFavPokemon
})

export default pokemonReducer
