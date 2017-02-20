import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {IconButton} from 'react-toolbox';

import {deletePokemon} from '../actions/pokemonActions'
import styles from '../theme/styles.scss';

const DeletePokemonButton =({id, deletePokemon, onFinish})=>(
     <IconButton icon='delete' className={styles.deleteButton} onClick={()=>deletePokemon(id, onFinish)}/>
)


const mapDispatchToProps = (dispatch) => {
  return {
    deletePokemon: (id, cb) =>{
        dispatch(deletePokemon(id, cb))
    }
  }
}
DeletePokemonButton.propTypes = {
  id: PropTypes.string,
  removePokemon: PropTypes.func,
  onFinish: PropTypes.func
};


export default connect(void 0, mapDispatchToProps)(DeletePokemonButton)