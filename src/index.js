import React from 'react'
import ReactDom from 'react-dom'
import Root from './containers/Root'
import 'normalize.css'
import 'react-toolbox/lib/commons.scss';  


ReactDom.render(
    <Root/>,
    document.getElementById("mount")
)


