import React, {Component} from 'react'

import {Layout} from 'react-toolbox';

import SnackbarAlertBox from '../containers/SnackbarAlertBox'



class App extends Component{
    render(){
        return (
        <Layout>
            <SnackbarAlertBox/>
           {this.props.children}
        </Layout>
        )
    }
}



export default App