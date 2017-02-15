import React, {Component} from 'react'
import { connect } from 'react-redux'

class PokeEditor extends Component{
    render(){
        return (
        <h1>Your are in the PokeEditor</h1>
        )
    }
}


function reduxTransform(state) {
  return state
}


export default connect(reduxTransform)(PokeEditor)