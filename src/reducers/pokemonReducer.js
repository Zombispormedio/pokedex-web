import {
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  REQUEST_FAV_POKEMON,
  RECEIVE_FAV_POKEMON,
  REQUEST_CREATE_POKEMON,
  RECEIVE_CREATE_POKEMON
} from '../config/actionTypes'
import {
  createReducer,
  mergeArrays,
  updateArrayByCallback,
  updateArrayByItem
} from './reducerUtils'

const initState = {
  isFetching: false,
  items: [],
  page: 0,
  isSubmiting: false,
  isSubmited: false
}

function requestPokemons(state) {
  return { ...state,
    isFetching: true
  }
}

function receivePokemons(state, {
  pokemons,
  receivedAt,
  page
}) {
  return { ...state,
    isFetching: false,
    items: mergeArrays(state.items, pokemons),
    lastUpdated: receivedAt,
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


const pokemonReducer = createReducer(initState, {
  [REQUEST_POKEMONS]: requestPokemons,
  [RECEIVE_POKEMONS]: receivePokemons,
  [REQUEST_FAV_POKEMON]: requestFavPokemon,
  [RECEIVE_FAV_POKEMON]: receiveFavPokemon,
  [REQUEST_CREATE_POKEMON]: requestCreatePokemon,
  [RECEIVE_CREATE_POKEMON]: receiveCreatePokemon,
})

export default pokemonReducer