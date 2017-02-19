import {SHOW_SNACKBAR, CLOSE_SNACKBAR} from '../config/actionTypes'
import {createReducer} from './reducerUtils'

const initState = {
  active: false,
  message: "Buenas tardes, Pokémaniaco!"
}


function showSnackbar(state, action){
  return { ...state, 
        active: true,
        message: action.message
    }
}

function closeSnackbar(state){
  return { ...state, 
        active: false,
        message: "Entendido!"
    }
}



const snackbarReducer = createReducer(initState, {
    [SHOW_SNACKBAR]: showSnackbar,
    [CLOSE_SNACKBAR]: closeSnackbar
})

export default snackbarReducer