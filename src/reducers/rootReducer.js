import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

import {pokemons}   from './pokemonReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    pokemons
})

export default rootReducer