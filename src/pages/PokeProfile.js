import React, {Component} from 'react'

import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'
import FloatingActionButton from '../components/FloatingActionButton'

import styles from '../theme/styles.scss';


class PokeProfile extends Component{
     goHome(){
        browserHistory.push('/')
    }
    goToUpdate(){
        browserHistory.push(`/pokemon/${this.props.params.id}/update`)
    }
    render(){
        const goToUpdate = this.goToUpdate.bind(this);
        return (
       <Panel>
           <AppBar className={styles.childToolbar} title="Pokémon's Profile" leftIcon="chevron_left" onLeftIconClick={this.goHome} fixed/>
            <LayoutContent>
                <FloatingActionButton icon="edit" onClick={goToUpdate}/>
            </LayoutContent>
          </Panel>
        )
    }
}


export default PokeProfile