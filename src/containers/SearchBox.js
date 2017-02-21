import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {Input, Switch, IconButton} from 'react-toolbox';

import {fetchPokemons, clearPokemons} from '../actions/pokemonActions'

import styles from '../theme/styles.scss';

class SearchBox extends Component{
    constructor(props){
        super(props)
        const {query, favourites} = props.initial
        this.state = {toggle: favourites, query: query}
        this.handleSwitch = this.handleChange.bind(this, 'toggle')
        this.handleValue = this.handleChange.bind(this, 'query')
        this.onSwitch = this.onSwitch.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    handleChange(field, value){
        this.setState({...this.state, [field]: value});
    } 

    onSearch(){
        this.fetch(this.state)
        this.props.onSearch(this.state.value)
    }
    onSwitch(value){
        this.handleSwitch(value)
        this.fetch({...this.state, toggle: value})
        this.props.onSwitch(value)
    }

    fetch({toggle, query}){
        const {fetchPokemons} = this.props
        fetchPokemons({page: 1, query: query, favourites: toggle }, {clean: true})
    }
    render(){
        return (
            <div className={styles.searchBox}>
                <div className={styles.searchContainer}>
                    <Input className={styles.search} type='text' hint='Busca tus Pokémon por nombre...' value={this.state.query}
                        onChange={this.handleValue} icon={<IconButton icon="search" onClick={this.onSearch}/>}/>
                 </div>
                 <div className={styles.toggle}>
                    <Switch checked={this.state.toggle} label="Mostrar sólo favoritos" 
                 onChange={this.onSwitch}/>
                </div>
            </div>
        )

    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemons: (query, opts) =>{
        dispatch(fetchPokemons(query, opts))
    },
    clearPokemons: () =>{
        dispatch(clearPokemons())
    }
  }
}




SearchBox.propTypes = {
  onSwitch: PropTypes.func,
  onSearch: PropTypes.func,
  initial: PropTypes.shape({
      query: PropTypes.string,
      favourites: PropTypes.bool
  })
};

export default connect(void 0, mapDispatchToProps)(SearchBox)