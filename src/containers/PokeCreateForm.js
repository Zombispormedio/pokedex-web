import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {ProgressBar} from 'react-toolbox';

import PokeForm from '../components/PokeForm'
import {createPokemon} from '../actions/pokemonActions'

class PokeCreateForm extends Component {
    constructor(props) {
        super(props);
        this.initialModel = {
            name: '',
            description: '',
            type1: 0,
            type2: 0,
            evolution: ''
        }
        this.model = {...this.initialModel}
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(data){
        this.model = {...data}
        const {createPokemon, onFinish} = this.props
        createPokemon(data, onFinish)
    }

    render() {
        const { isSubmiting, isSubmited} = this.props

        if(isSubmiting && !isSubmited){
            return <ProgressBar type="circular" mode="indeterminate" multicolor  />
        }else{
            return <PokeForm model={this.model} onSubmit={this.onSubmit} labelSubmit="Crear"/>
        }
    
    }
}


const mapStateToProps = (state) => {
    const {isSubmiting, isSubmited} = state.pokemons
    return {isSubmiting, isSubmited}
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPokemon: (data, cb) => {
            dispatch(createPokemon(data, cb))
        }
    }
}


PokeCreateForm.propTypes = {
    createPokemon: PropTypes.func,
    onFinish: PropTypes.func,
    isSubmiting: PropTypes.bool, 
    isSubmited: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(PokeCreateForm)