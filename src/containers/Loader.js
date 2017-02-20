import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {ProgressBar} from 'react-toolbox';

import PokeIcon from '../components/PokeIcon';

import styles from '../theme/styles.scss';

const Loader =({isFetching})=>{
  if(isFetching){
    return <ProgressBar className={styles.bottomList} type="circular" mode="indeterminate" multicolor  />
  }else{
    return <div className={styles.bottomList}><PokeIcon/></div>
  }
}

function mapStateToProps(state) {
  const {isFetching} =state.pokemons
  return {isFetching}
}

Loader.propTypes = {
  isFetching: PropTypes.bool
};


export default connect(mapStateToProps)(Loader)