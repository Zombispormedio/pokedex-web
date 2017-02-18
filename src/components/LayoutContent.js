import React, { Component } from 'react'
import utils from '../theme/utils.scss';

class LayoutContent extends Component{

    render(){
        return (
            <div className={utils.content}>
                {this.props.children}
            </div>
        )
    }
}

export default LayoutContent