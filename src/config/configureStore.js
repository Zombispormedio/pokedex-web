import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/rootReducer'

const loggerMiddleware = createLogger()


export default function configure(preloadState){
    return createStore(
        rootReducer,
        preloadState, 
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}