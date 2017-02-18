import React, {Component} from 'react'
import {Layout} from 'react-toolbox';


class App extends Component{
    render(){
        return (
        <Layout>
           {this.props.children}
        </Layout>
        )
    }
}


export default App