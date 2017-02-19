import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

import pokemonReducer   from './pokemonReducer'
import snackbarReducer   from './snackbarReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    pokemons: pokemonReducer,
    snackbar: snackbarReducer
})

export default rootReducer