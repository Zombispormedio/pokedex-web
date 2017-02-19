import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchPokemons} from '../actions/pokemonActions'

import ItemList from '../components/ItemList'

class PokeList extends Component{
    
    componentDidMount() {
        this.setupInfinityScroll();
        this.loadMore();
    }

    setupInfinityScroll(){
          const loadMore = this.loadMore.bind(this)
          window.onscroll = function(){
            let scrollTop = document.body.scrollTop
            let limit = document.body.scrollHeight - window.innerHeight
            if(scrollTop == limit){
                loadMore()
            }
        };
    }

    loadMore(){
        const {page, fetchPokemons} = this.props;
        fetchPokemons(page+1);
    }

    render(){
        const {items, isFetching, onPokemonClick} = this.props
        if(items.length==0 && !isFetching){
            return <p>No hay ningún Pokémon añadido, ¿a qué esperas?</p>
        }else{
           return <ItemList items={items} onItemClick={onPokemonClick}/>
        }
    }
}



function mapStateToProps(state) {
  const {items, page, isFetching} = state.pokemons
  return { page, items, isFetching}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemons: (page) =>{
        dispatch(fetchPokemons(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList)