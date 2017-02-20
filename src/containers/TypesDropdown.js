import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {Dropdown, ProgressBar} from 'react-toolbox'

import {fetchTypes} from '../actions/typesActions'

import styles from '../theme/styles.scss';


class TypesDropdown extends Component{
     constructor(props){
        super(props)
        this.initialSource = [{label: "Ningún tipo", value: 0}]
        this.state = this.fetchValues()
     }

    fetchValues(){
        const {values} = this.props
        return values.reduce((memo, item)=>{
            return {...memo,
                 [item.ref]: item.value
                }
        }, {})
    }

    componentDidMount() {
        const {items, fetchTypes} = this.props;
        if(items.length == 0){
            fetchTypes();
        }
    }

    componentWillReceiveProps(){
        this.setState(this.fetchValues())
    }

    render(){
        const {isFetching, values, items} = this.props
        let elem = void 0;
        if(items.length == 0 && isFetching){
            elem = <ProgressBar type="circular" mode="indeterminate" multicolor  />
        }else{
            const source = this.initialSource.concat(items)
            
            elem = values.map(({ref, label, handler, error, required})=>{
                const onChange = (value) => {
                    this.setState({[ref]: value})
                    handler(value)
                }
                return <Dropdown key={ref} source={source} error={error} required={required}
                value={this.state[ref]} label={label} onChange={onChange}/>
            })
            
        }

        return (
                <div className={styles.typesDropdownBar}>
                    {elem}
                </div>
            )
    }

}


function mapStateToProps(state) {
  const {items, isFetching} = state.types
  return {items, isFetching}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTypes: () =>{
        dispatch(fetchTypes())
    }
  }
}

TypesDropdown.propTypes = {
  fetchTypes: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number, 
      name: PropTypes.string
  })),
  isFetching: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.shape({
      ref: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.number,
      handler: PropTypes.func, 
      error: PropTypes.string,
      required: PropTypes.bool
  }))
};

export default connect(mapStateToProps, mapDispatchToProps)(TypesDropdown)