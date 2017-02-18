import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {Button, Panel, ProgressBar, AppBar} from 'react-toolbox';

import {fetchPokemons} from '../actions/pokemonActions'

import PokeList from '../containers/PokeList'
import LayoutContent from '../components/LayoutContent'
import utils from '../theme/utils.scss';


class PokeManiac extends Component{

  constructor(props) {
    super(props);
    this.goToCreate = this.goToCreate.bind(this);
  }

   componentDidMount() {
    const { dispatch, page } = this.props
    dispatch(fetchPokemons(page+1))
  }

  goToCreate() {
    browserHistory.push('/pokemon/create')
  }
  
  render(){
        const isFetching = this.props.isFetching
        let list = isFetching? <ProgressBar type="circular" mode="indeterminate" /> : <PokeList/>

        return (
          <Panel>
           <AppBar title='Tu Pokédex Nacional'/>
            <LayoutContent>
              {list}
              <div className={utils.fixedActionBtn}>
                <Button icon='add' onClick={this.goToCreate} floating accent>
              </Button>
              </div>
            </LayoutContent>
          </Panel>
        )
    }
}




function mapStateToProps(state) {
  const { pokemons } = state
  const {
    isFetching,
    page
  } = pokemons

  return {
    isFetching, page
  }
}



export default connect(mapStateToProps)(PokeManiac)