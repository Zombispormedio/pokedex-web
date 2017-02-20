import {
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  REQUEST_FAV_POKEMON,
  RECEIVE_FAV_POKEMON,
  REQUEST_CREATE_POKEMON,
  RECEIVE_CREATE_POKEMON,
  REQUEST_SHOW_POKEMON,
  RECEIVE_SHOW_POKEMON,
  REQUEST_UPDATE_POKEMON,
  RECEIVE_UPDATE_POKEMON,
  REQUEST_DELETE_POKEMON,
  RECEIVE_DELETE_POKEMON
} from '../config/actionTypes'
import {
  createReducer,
  mergeArrays,
  updateArrayByCallback,
  updateArrayByItem,
  removeItemById
} from '../lib/reducerUtils'

const initState = {
  isFetching: false,
  items: [],
  page: 0,
  isSubmiting: false,
  isSubmited: false,
  isRemoving: false
}

function requestPokemons(state) {
  return { ...state,
    isFetching: true
  }
}

function receivePokemons(state, {
  pokemons,
  page
}) {
  return { ...state,
    isFetching: false,
    items: mergeArrays(state.items, pokemons),
    page: pokemons.length == 0 ? state.page : page
  }
}

function requestFavPokemon(state, {
  pokemonId
}) {
  return { ...state,
    items: updateArrayByCallback(state.items, pokemonId, (item) => {
      return { ...item,
        fav: !item.fav
      }
    })
  }
}

function receiveFavPokemon(state, {
  pokemon
}) {
  return { ...state,
    items: updateArrayByItem(state.items, pokemon)
  }
}

function requestCreatePokemon(state) {
  return { ...state,
    isSubmiting: true,
    isSubmited: false
  }
}

function receiveCreatePokemon(state, {
  pokemon,
  validated
}) {
  if (validated) {
    return { ...state,
      isSubmiting: false,
      isSubmited: true,
      items: mergeArrays(state.items, [pokemon])
    }
  } else {
    return { ...state,
      isSubmiting: false
    }
  }
}

function requestShowPokemon(state) {
  return { ...state,
    isFetching: true
  }
}

function receiveShowPokemon(state, {
  pokemon,
  notFound
}) {
  if (!notFound) {
    return { ...state,
      isFetching: false,
      items: mergeArrays(state.items, [pokemon])
    }
  } else {
    return { ...state,
      isFetching: false
    }
  }
}

function requestUpdatePokemon(state) {
  return { ...state,
    isSubmiting: true,
    isSubmited: false
  }
}

function receiveUpdatePokemon(state, {
  pokemon,
  validated
}) {
  if (validated) {
    return { ...state,
      isSubmiting: false,
      isSubmited: true,
      items: mergeArrays(state.items, [pokemon])
    }
  } else {
    return { ...state,
      isSubmiting: false
    }
  }
}

function requestDeletePokemon(state){
  return { ...state,
    isRemoving: true
  }
}

function receiveDeletePokemon(state, {id}){
  return { ...state,
    isRemoving: false,
    items: removeItemById(state.items, Number(id))
  }
}



const pokemonReducer = createReducer(initState, {
  [REQUEST_POKEMONS]: requestPokemons,
  [RECEIVE_POKEMONS]: receivePokemons,
  [REQUEST_FAV_POKEMON]: requestFavPokemon,
  [RECEIVE_FAV_POKEMON]: receiveFavPokemon,
  [REQUEST_CREATE_POKEMON]: requestCreatePokemon,
  [RECEIVE_CREATE_POKEMON]: receiveCreatePokemon,
  [REQUEST_SHOW_POKEMON]: requestShowPokemon,
  [RECEIVE_SHOW_POKEMON]: receiveShowPokemon,
  [REQUEST_UPDATE_POKEMON]: requestUpdatePokemon,
  [RECEIVE_UPDATE_POKEMON]: receiveUpdatePokemon,
  [REQUEST_DELETE_POKEMON]: requestDeletePokemon,
  [RECEIVE_DELETE_POKEMON]: receiveDeletePokemon,
})

export default pokemonReducer