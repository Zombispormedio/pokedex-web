import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {Snackbar} from 'react-toolbox';

import {closeSnackbar} from '../actions/snackbarAction'

class SnackbarAlertBox extends Component{

    handleSnackbar(){
      this.props.closeSnackbar();
    }
    render(){
        const {message, active} = this.props
        const handle = this.handleSnackbar.bind(this)
        return (
        <Snackbar
          action='Okay'
          label={message}
          active={active}
          timeout={2500}
          onClick={handle}
          onTimeout={handle}
          ref='snackbar'
          type='warning'
      />
        )
    }
}

function mapStateToProps(state) {
  const {active, message} = state.snackbar
  return {active, message}
}


const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackbar: () =>{
        dispatch(closeSnackbar())
    }
  }
}

SnackbarAlertBox.propTypes = {
  closeSnackbar: PropTypes.func,
  message: PropTypes.string,
  active: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(SnackbarAlertBox)