import React, {Component} from 'react'

import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import PokeList from '../containers/PokeList'
import Loader from '../containers/Loader'
import LayoutContent from '../components/LayoutContent'
import FloatingActionButton from '../components/FloatingActionButton'



class PokeManiac extends Component{
  
  constructor(props) {
    super(props);
    this.goToCreate = this.goToCreate.bind(this);
  }

  goToCreate() {
    browserHistory.push('/pokemon/create')
  }

  goToPokemon(id) {
    setTimeout(()=>browserHistory.push(`/pokemon/${id}`), 1000)
  }
  
  render(){
        return (
          <Panel>
           <AppBar title='Tu Pokédex Nacional' fixed/>
            <LayoutContent>
              <PokeList onPokemonClick={this.goToPokemon}/>
              <Loader/>
              <FloatingActionButton icon="add" onClick={this.goToCreate}/>
            </LayoutContent>
          </Panel>
        )
    }
}

export default PokeManiac