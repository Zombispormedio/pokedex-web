import React, {PropTypes} from 'react'

import {Avatar} from 'react-toolbox';

import PokeFavButton from '../containers/PokeFavButton'

import styles from '../theme/styles.scss';
import {AvatarData, colorOfPokemonType} from '../lib/utils';

const PokemonProfile = ({pokemon}) => {
    const {id, name, fav, description, evolution, type1, type2} = pokemon
    let avatarData = AvatarData(pokemon)
    avatarData.style = {
            backgroundColor: 'rgba(211, 211, 211, 0.72)'
        }
    
    let type2Div
    let type1Style;
    if(type2.id != 0){
        const type2Style={ borderBottomRightRadius: "0.5rem", borderTopRightRadius: "0.5rem",
                            backgroundColor: colorOfPokemonType(type2.name)}
        type2Div =  (<div style={{backgroundColor: colorOfPokemonType(type2.name)}}  style={type2Style}
                        className={styles.types}>{type2.name}</div>)
        type1Style={ borderBottomLeftRadius: "0.5rem", borderTopLeftRadius: "0.5rem"}
    }else{
        type1Style={ borderRadius: "0.5rem"}
    }
    type1Style.backgroundColor= colorOfPokemonType(type1.name)

    return (
        <div className={styles.profile}> 
              <Avatar {...avatarData}/>
                <h2 className={styles.profileTitle} >{name}</h2>
                <PokeFavButton className={styles.profileFav} fav={fav} pokemonId={id}/>
            <div className={styles.typesContainer}>
              <div style={{backgroundColor: colorOfPokemonType(type1.name)}} style={type1Style} className={styles.types}>
                {type1.name}
              </div>
              {type2Div}
            </div>
            <span className={styles.profileEvolution} >{evolution!=void 0? `Evoluciona a ${evolution}`: "No evoluciona"}</span>
            <p className={styles.profileDescription} >{description}</p>

        </div>
    )   
}


PokemonProfile.propTypes = {
  pokemon: PropTypes.shape({
        id: PropTypes.id, 
        name: PropTypes.string,
        description: PropTypes.string, 
        type1: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }), 
        type2: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }), 
        evolution: PropTypes.string
    })
};


export default PokemonProfile