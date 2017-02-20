import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import PokeForm from '../components/PokeForm'
import {ProgressBar} from 'react-toolbox';

class PokeCreateForm extends Component {
    constructor(props) {
        super(props);
        this.model = {
            name: '',
            description: '',
            type1: 0,
            type2: 0,
            evolution: ''
        }
    }

    render() {
        const {createPokemon, isSubmitting} = this.props
        if(isSubmitting){
            return <ProgressBar type="circular" mode="indeterminate" multicolor  />
        }else{
            return <PokeForm model={this.model} onSubmit={createPokemon}/>
        }
    
    }
}


const mapStateToProps = (state) => {
    const {isFetching} = state.pokemons
    return {isFetching}
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPokemon: (data) => {
            console.log(data)
        }
    }
}


PokeCreateForm.propTypes = {
    createPokemon: PropTypes.func,
    enabled: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(PokeCreateForm)