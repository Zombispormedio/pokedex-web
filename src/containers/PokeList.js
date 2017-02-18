import React, {Component} from 'react'
import {connect} from 'react-redux'

import {ProgressBar} from 'react-toolbox';

import {fetchPokemons} from '../actions/pokemonActions'

import ItemList from '../components/ItemList'


class PokeList extends Component{
    
    componentDidMount() {
        const {fetchPokemons, page} = this.props
        fetchPokemons(page)
    }
    
    render(){
        const {items, isFetching, onPokemonClick, onPokemonFav} = this.props
        if(isFetching){
            return <ProgressBar type="circular" mode="indeterminate" />
        }else if(items.length==0){
            return <p>No hay ningún Pokémon añadido, ¿a qué esperas?</p>
        }else{
           return <ItemList items={items} onItemClick={onPokemonClick} onItemFav={onPokemonFav}/>
        }
    }
}

function mapStateToProps(state) {
  const {isFetching, items, page} = state.pokemons
  return {isFetching, page, items}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPokemonClick: (id) => {
      
    },
     onPokemonFav: (id) => {
      
    }, 
    fetchPokemons: (page) =>{
        dispatch(fetchPokemons(page+1))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList)