import React, {Component} from 'react'
import { connect } from 'react-redux'

class PokeCreator extends Component{
    render(){
        return (
        <h1>Your are in the PokeCreator</h1>
        )
    }
}


function reduxTransform(state) {
  return state
}


export default connect(reduxTransform)(PokeCreator)