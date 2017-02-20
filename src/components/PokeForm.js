import React, {Component, PropTypes} from 'react'

import {Input, Button, Card} from 'react-toolbox'

import TypesDropdown from '../containers/TypesDropdown'

import Validator from '../lib/Validator'

import styles from '../theme/styles.scss';

class PokeForm extends Component{
    constructor(props){
        super(props)
     
        this.handleSubmit = this.handleSubmit.bind(this);
        let dropDownValues = ["type1","type2"].map((key, index) => {
            return {
                ref: key,
                label: "Elige tipo "+(index+1), 
                value: this.props[key],
                handler: (value) =>{
                    this.handleChange(key, value)
                }, 
                required: key == "type1"
            }
        })

        this.state = {...props.model, dropDownValues, errors: {}}

        this.handleName = this.handleChange.bind(this, 'name')
        this.handleDescription = this.handleChange.bind(this, 'description')
        this.handleEvolution = this.handleChange.bind(this, 'evolution')
    }

    handleChange(name, value) {
        this.setState({...this.state, [name]: value});
    }

    handleSubmit(event){
        event.preventDefault()
        if(this.validate()){
            this.cleanErrors()
            const {name, description, evolution, type1, type2} = this.state
            this.props.onSubmit({name, description, evolution, type1, type2})
        }
    }

    validate(){
        const {valid, errors} = Validator.exec(this.state)
        
        if(!valid){
            this.applyErrors(errors)
        }
        return valid;
    }

    applyErrors(errors){
        let dropDownValues = this.state.dropDownValues.map(type => {
            const error = errors[type.ref];
            if(error  != void 0){
                return {...type, error: error}
            }

            return type;
        })

        this.setState({dropDownValues, errors})
    }

    cleanErrors(){
        this.setState({errors: {}})
         let dropDownValues = this.state.dropDownValues.map(type => {
            return {...type, error: void 0};
        })

        this.setState({dropDownValues})
    }


    render(){
        const {name, description, evolution, errors,  dropDownValues} = this.state
     return (
        <form className={styles.form} onSubmit={this.handleSubmit}>
            <Input type='text' label='Nombre' value={name} error={errors.name}
                onChange={this.handleName} maxLength={24} required/>
            <Input type='text' label='Descripción'rows={6} value={description} error={errors.description}
                onChange={this.handleDescription} multiline required />
            <TypesDropdown values={dropDownValues}/>
            <Input type='text' label='Evolución' value={evolution}
                onChange={this.handleEvolution} />
            <Button type='submit' label='Crear' raised accent/>
        </form>
        )
    }
}

PokeForm.propTypes = {
    onSubmit: PropTypes.func,
    model: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string, 
        type1: PropTypes.number, 
        type2: PropTypes.number, 
        evolution: PropTypes.string
    })
};

export default PokeForm