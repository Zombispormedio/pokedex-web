import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import { browserHistory } from 'react-router'

import {Panel, AppBar, ProgressBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'
import FloatingActionButton from '../components/FloatingActionButton'
import PokemonProfile from '../components/PokemonProfile'

import {fetchPokemonById} from '../actions/pokemonActions'

import styles from '../theme/styles.scss';
import {findById, buildQueryObject} from '../lib/utils'


class PokeProfile extends Component{

    constructor(props){
        super(props)
        this.goToUpdate = this.goToUpdate.bind(this)
        this.goHome = this.goHome.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const {params, fetchPokemonById, items} = this.props
        const item = findById(items, params.id);
        if(item == void 0){
            fetchPokemonById(params.id, this.goHome)
        }
    }


    goHome(){
        const {favourites, query} = this.props
        const queryObject =  buildQueryObject({favourites, query})
        browserHistory.push( { pathname: '/', query: queryObject})
    }
    goToUpdate(){
        browserHistory.push(`/pokemon/${this.props.params.id}/update`)
    }

    getContent(){
        const {isFetching, items, params} = this.props
        if(isFetching || items.length == 0){
            return (
            <LayoutContent>
               <ProgressBar type="circular" mode="indeterminate" multicolor  />
            </LayoutContent>)
        }else{
            this.item = findById(items, params.id);
             return (
            <LayoutContent>
                <PokemonProfile pokemon={this.item}/>
                <FloatingActionButton icon="edit" onClick={this.goToUpdate}/>
            </LayoutContent>)
        }
    }
    render(){
        const content = this.getContent();
        return (
            <Panel>
                <AppBar className={styles.childToolbar} title={this.item!= void 0? 
                    `Perfil de ${this.item.name}`: 'Esperando perfil del Pokémon...'} 
                    leftIcon="chevron_left" onLeftIconClick={this.goHome} fixed/>
               {content} 
            </Panel>
        )
    }
}

function mapStateToProps(state) {
  const {items, isFetching, favourites, query} = state.pokemons
  return {items, isFetching, favourites, query}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemonById: (id, errorCb) =>{
        dispatch(fetchPokemonById(id, errorCb))
    }
  }
}

PokeProfile.propTypes = {
    fetchPokemonById: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    favourites:  PropTypes.bool, 
    query:  PropTypes.string
};



export default connect(mapStateToProps, mapDispatchToProps)(PokeProfile)