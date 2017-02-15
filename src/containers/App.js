import React, {Component} from 'react'
import PokeAppbar from '../components/PokeAppbar'
import { Layout, Panel} from 'react-toolbox';


class App extends Component{
    render(){
        return (
        <Layout>
           <Panel>
            <PokeAppbar/>
            {this.props.children}
            </Panel>
        </Layout>
        )
    }
}


export default App