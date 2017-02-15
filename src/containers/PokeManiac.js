import React, {Component} from 'react'
import { connect } from 'react-redux'

import {fetchPokemons} from '../actions/pokemonActions'


class PokeManiac extends Component{

componentDidMount() {
    const { dispatch} = this.props
    dispatch(fetchPokemons(0))
  }

  componentWillReceiveProps(nextProps) {

  }

    render(){
        const {isFetching} = this.props
        return (
        <h1>{isFetching.toString()}</h1>
        )
    }
}

function mapStateToProps(state) {
  const { pokemons } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = pokemons

  return {
    items,
    isFetching,
    lastUpdated
  }
}


export default connect(mapStateToProps)(PokeManiac)