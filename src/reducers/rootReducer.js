import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

import pokemonReducer   from './pokemonReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    pokemons: pokemonReducer
})

export default rootReducer