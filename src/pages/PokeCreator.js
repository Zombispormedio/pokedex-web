import React, {Component, PropTypes} from 'react'
import { browserHistory } from 'react-router'
import {connect} from 'react-redux'

import {Panel, AppBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'

import PokeCreateForm from '../containers/PokeCreateForm'

import styles from '../theme/styles.scss';
import {buildQueryObject} from '../lib/utils'

class PokeCreator extends Component{
     constructor(props){
        super(props)
        this.goHome = this.goHome.bind(this)
    }

    goHome(){
        const {favourites, query} = this.props
        const queryObject =  buildQueryObject({favourites, query})
        return browserHistory.push( { pathname: '/', query: queryObject})
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
        return (
            <Panel>
                <AppBar className={styles.childToolbar} title='Añadir Pokémon' 
                    leftIcon="chevron_left" onLeftIconClick={this.goHome} fixed/>
                <LayoutContent>
                    <PokeCreateForm onFinish={this.goHome}/>
                </LayoutContent>
             </Panel>
        )
    }
}

function mapStateToProps(state) {
  const {favourites, query} = state.pokemons
  return {favourites, query}
}


PokeCreator.propTypes = {
    favourites:  PropTypes.bool, 
    query:  PropTypes.string
};



export default connect(mapStateToProps)(PokeCreator)