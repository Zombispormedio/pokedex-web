import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {Button} from 'react-toolbox';

import PokeList from '../components/PokeList'
import Content from '../components/Content'
import utils from '../theme/utils.scss';


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
        <Content>
          <PokeList/>
          <div className={utils.fixedActionBtn}>
            <Button icon='add' onClick={this.goToCreate} floating accent>
            </Button>
          </div>
        </Content>
        )
    }
}

function reduxTransform(state) {
  const { pokemons } = state
  const {
    isFetching,
  } = pokemons

  return {
    isFetching
  }
}


export default connect(reduxTransform)(PokeManiac)