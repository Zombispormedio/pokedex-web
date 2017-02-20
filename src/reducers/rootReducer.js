import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

import pokemonReducer   from './pokemonReducer'
import typeReducer   from './typeReducer'
import snackbarReducer   from './snackbarReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    pokemons: pokemonReducer,
    snackbar: snackbarReducer,
    types: typeReducer
})

export default rootReducer