import React, {Component} from 'react'

import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import PokeList from '../containers/PokeList'
import Loader from '../containers/Loader'
import LayoutContent from '../components/LayoutContent'
import FloatingActionButton from '../components/FloatingActionButton'
import SearchBox from '../containers/SearchBox'
import {buildQuery} from '../lib/utils'

class PokeManiac extends Component{
  
  constructor(props) {
    super(props);
    this.goToCreate = this.goToCreate.bind(this)
    this.search = this.search.bind(this)
    this.filter = this.filter.bind(this)
  }

  goToCreate() {
    browserHistory.push('/pokemon/create')
  }

  goToPokemon(id) {
    setTimeout(()=>browserHistory.push(`/pokemon/${id}`), 1000)
  }

  search(value){
    this.go("q", value)
  }

  filter(value){
    if(value){
      this.go("f", "", false)
    }else{
       this.go("f", value, true)
    }
    
  }

  go(key, value, remove = false){
    const {query} = this.props.location
    const  q = buildQuery(query, {key: key, value: value}, {remove})
    browserHistory.push( { pathname: '/', query:q})
  }
  
  render(){
    const {query} = this.props.location
    const initial = {
        query: query.q || "",
        favourites: query.f != void 0
    } 

        return (
          <Panel>
           <AppBar title='Tu Pokédex Nacional' fixed/>
            <LayoutContent>
              <SearchBox onSearch={this.search} initial={initial} onSwitch={this.filter}/>
              <PokeList initial={initial} onPokemonClick={this.goToPokemon}/>
              <Loader/>
              <FloatingActionButton icon="add" onClick={this.goToCreate}/>
            </LayoutContent>
          </Panel>
        )
    }
}

export default PokeManiac