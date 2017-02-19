import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'

import styles from '../theme/styles.scss';


class PokeCreator extends Component{
    goHome(){
        browserHistory.push('/')
    }
    render(){
        return (
       <Panel>
           <AppBar className={styles.childToolbar} title='Añadir Pokémon' leftIcon="chevron_left" onLeftIconClick={this.goHome} fixed/>
            <LayoutContent>

            </LayoutContent>
          </Panel>
        )
    }
}


export default PokeCreator