import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import {Panel, AppBar} from 'react-toolbox';

import LayoutContent from '../components/LayoutContent'

import PokeUpdateForm from '../containers/PokeUpdateForm'

import styles from '../theme/styles.scss';

class PokeEditor extends Component{
    constructor(props){
        super(props)
        this.goHome = this.goHome.bind(this)
        this.goProfile = this.goProfile.bind(this)
    }
     goProfile(){
        browserHistory.push(`/pokemon/${this.props.params.id}`)
    }
    goHome(){
        browserHistory.push("/")
    }
    render(){
        const {params} = this.props
        return (
       <Panel>
           <AppBar className={styles.childToolbar} title='Editar Pokémon' 
           leftIcon="chevron_left" onLeftIconClick={this.goProfile} fixed rightIcon="trash"/>
            <LayoutContent>
            <PokeUpdateForm id={params.id} onFinish={this.goProfile} notFound={this.goHome}/>
            </LayoutContent>
          </Panel>
        )
    }
}


export default PokeEditor