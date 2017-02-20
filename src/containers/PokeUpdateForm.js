import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {ProgressBar} from 'react-toolbox';

import PokeForm from '../components/PokeForm'
import {fetchPokemonById, updatePokemon} from '../actions/pokemonActions'

import {findById} from '../lib/utils'

class PokeUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        const {id, fetchPokemonById, items, notFound} = this.props
        const item= findById(items, id);
        if(item == void 0){
            fetchPokemonById(id, notFound)
        }
    }

    onSubmit(data){
        this.model = {...data}
        const {id, updatePokemon, onFinish} = this.props
        updatePokemon(id, data, onFinish)
    }

    render() {
        const { isSubmiting, isSubmited, isFetching, items, id} = this.props
        const item = findById(items, id);
        if((isSubmiting && !isSubmited) || isFetching || item == void 0){
            return <ProgressBar type="circular" mode="indeterminate" multicolor/>
        }else{
            this.model = {...item, type1: item.type1.id, type2: item.type2.id}
            return <PokeForm model={this.model} onSubmit={this.onSubmit} labelSubmit="Actualizar"/>
        }
    
    }
}


const mapStateToProps = (state) => {
    const {isSubmiting, isSubmited, isFetching, items} = state.pokemons
    return {isSubmiting, isSubmited, isFetching, items}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePokemon: (id, data, cb) => {
            dispatch(updatePokemon(id, data, cb))
        },
        fetchPokemonById: (id, errorCb) =>{
            dispatch(fetchPokemonById(id, errorCb))
        }
    }
}


PokeUpdateForm.propTypes = {
    id: PropTypes.string, 
    updatePokemon: PropTypes.func,
    onFinish: PropTypes.func,
    notFound: PropTypes.func,
    isSubmiting: PropTypes.bool, 
    isSubmited: PropTypes.bool, 
    items: PropTypes.arrayOf(PropTypes.object),
    fetchPokemonById: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(PokeUpdateForm)