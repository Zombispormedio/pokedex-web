import React, {Component} from 'react'

import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import PokeList from '../containers/PokeList'
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
  
  render(){
        return (
          <Panel>
           <AppBar title='Tu Pokédex Nacional' fixed/>
            <LayoutContent>
              <PokeList/>
              <FloatingActionButton icon="add" onClick={this.goToCreate}/>
            </LayoutContent>
          </Panel>
        )
    }
}

export default PokeManiac