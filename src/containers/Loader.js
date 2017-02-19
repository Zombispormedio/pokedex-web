import React, {Component} from 'react'
import {connect} from 'react-redux'

import {ProgressBar, FontIcon} from 'react-toolbox';

import styles from '../theme/styles.scss';

const Loader =({isFetching})=>{
        if(isFetching){
            return <ProgressBar className={styles.bottomList} type="circular" mode="indeterminate" multicolor  />
        }else{
           return <div className={styles.bottomList}> <FontIcon value='airline_seat_individual_suite' /></div>
        }
    
}

function mapStateToProps(state) {
  const {isFetching} =state.pokemons
  return {isFetching}
}

export default connect(mapStateToProps)(Loader)