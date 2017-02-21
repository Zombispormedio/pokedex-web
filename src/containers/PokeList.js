import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import {fetchPokemons} from '../actions/pokemonActions'

import ItemList from '../components/ItemList'

class PokeList extends Component{
    
    componentDidMount() {
        this.setupInfinityScroll();
        this.loadFirst();
    }
    componentWillUnmount(){
        this.removeInfinityScroll()
    }

    setupInfinityScroll(){
          const loadMore = this.loadMore.bind(this)
           this.scrollListener = ()=>{
            let scrollTop = document.body.scrollTop
            let limit = document.body.scrollHeight - window.innerHeight
            if(scrollTop == limit){
                loadMore()
            }
        }

        window.addEventListener("scroll", this.scrollListener)
    }

    removeInfinityScroll(){
        window.removeEventListener("scroll", this.scrollListener)
    }

    loadFirst(){
        const {page, fetchPokemons, initial} = this.props;
        fetchPokemons({page: page, query: initial.query, favourites: initial.favourites}, {clean: true});
    }

    loadMore(){
        const {page, fetchPokemons, query, favourites} = this.props;
        fetchPokemons({page: page+1, query, favourites});
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
  const {items, page, isFetching, query, favourites} = state.pokemons
  return { page, items, isFetching, query, favourites}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemons: (query, opts) =>{
        dispatch(fetchPokemons(query, opts))
    }
  }
}

PokeList.propTypes = {
  onPokemonClick: PropTypes.func,
  fetchPokemons: PropTypes.func,
  items: PropTypes.arrayOf(React.PropTypes.object),
  page: PropTypes.number,
  isFetching: PropTypes.bool,
  initial: PropTypes.shape({
      query: PropTypes.string,
      favourites: PropTypes.bool
  })
};


export default connect(mapStateToProps, mapDispatchToProps)(PokeList)