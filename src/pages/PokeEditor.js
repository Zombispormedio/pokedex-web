import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'

import styles from '../theme/styles.scss';

class PokeEditor extends Component{
     goHome(){
        browserHistory.push(`/pokemon/${this.props.params.id}`)
    }
    render(){
        const goHome = this.goHome.bind(this)
        return (
       <Panel>
           <AppBar className={styles.childToolbar} title='Editar Pokémon' leftIcon="chevron_left" onLeftIconClick={goHome} fixed/>
            <LayoutContent>

            </LayoutContent>
          </Panel>
        )
    }
}


export default PokeEditor