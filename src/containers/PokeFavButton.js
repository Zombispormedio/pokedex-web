import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {IconButton} from 'react-toolbox';

import {favPokemon} from '../actions/favActions'



const favouritedColor = "#FFEB3B"
const defaultColor = "#9E9E9E"

const PokeFavButton =({fav, pokemonId,  favPokemon, className})=>{
    const color = fav ? favouritedColor : defaultColor
    return  <IconButton className={className} 
    icon='favorite' 
    onClick={()=>{
      setTimeout(() => favPokemon(pokemonId), 500)
    }
    }
    style={{color: color}} />
}

const mapDispatchToProps = (dispatch) => {
  return {
    favPokemon: (id) =>{
        dispatch(favPokemon(id))
    }
  }
}

PokeFavButton.propTypes = {
  fav: PropTypes.bool,
  pokemonId: PropTypes.number,
  favPokemon: PropTypes.func
};


export default connect(void 0, mapDispatchToProps)(PokeFavButton)