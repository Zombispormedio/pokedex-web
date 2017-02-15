import React, {Component} from 'react'
import { connect } from 'react-redux'

class PokeProfile extends Component{
    render(){
        return (
        <h1>Your are in the PokeProfile of some Pokemon</h1>
        )
    }
}

function reduxTransform(state) {
  return state
}


export default connect(reduxTransform)(PokeProfile)