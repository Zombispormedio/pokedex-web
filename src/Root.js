import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './configureStore'

import App from './pages/App'
import PokeManiac from './pages/PokeManiac'
import PokeCreator from './pages/PokeCreator'
import PokeProfile from './pages/PokeProfile'
import PokeEditor from './pages/PokeEditor'

const store = configureStore()


const history = syncHistoryWithStore(browserHistory, store)

class Root extends Component{
    render(){
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={PokeManiac}/>
                        <Route path="pokemon">
                            <Route path="create" component={PokeCreator}/>
                            <Route path=":id">
                                <IndexRoute  component={PokeProfile}/>
                                <Route path="update" component={PokeEditor}/>  
                            </Route>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

export default Root