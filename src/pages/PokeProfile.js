import React, {Component} from 'react'
import {connect} from 'react-redux'

import { browserHistory } from 'react-router'

import {Panel, AppBar, ProgressBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'
import FloatingActionButton from '../components/FloatingActionButton'
import PokemonProfile from '../components/PokemonProfile'

import {fetchPokemonById} from '../actions/loadPokemonAction'

import styles from '../theme/styles.scss';
import {findById} from '../lib/utils'


class PokeProfile extends Component{

    constructor(props){
        super(props)
        this.goToUpdate = this.goToUpdate.bind(this);
    }

    componentDidMount() {
        const {params, fetchPokemonById, items} = this.props
        const item = findById(items, params.id);
        if(item == void 0){
            fetchPokemonById(params.id, this.goHome)
        }
    }


    goHome(){
        browserHistory.push('/')
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
            const item = findById(items, params.id);
             return (
            <LayoutContent>
                <PokemonProfile pokemon={item}/>
                <FloatingActionButton icon="edit" onClick={this.goToUpdate}/>
            </LayoutContent>)
        }
    }
    render(){
        return (
            <Panel>
                <AppBar className={styles.childToolbar} title="Pokémon's Profile" 
                    leftIcon="chevron_left" onLeftIconClick={this.goHome} fixed/>
               {this.getContent()} 
            </Panel>
        )
    }
}

function mapStateToProps(state) {
  const {items, isFetching} = state.pokemons
  return {items, isFetching}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemonById: (id, errorCb) =>{
        dispatch(fetchPokemonById(id, errorCb))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PokeProfile)