import React from 'react';
import ReactDom from 'react-dom'

class App extends React.Component{
    render(){
        return (
            <div>
            <h1>Functiona?</h1>
            <h2> Heheh</h2>
            </div>
        );
    }
}


ReactDom.render(
    <App/>,
    document.getElementById("content")
)


