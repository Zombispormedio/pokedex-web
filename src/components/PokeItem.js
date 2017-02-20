import React, {PropTypes} from 'react'

import {Avatar} from 'react-toolbox';


import {ripple} from 'css-ripple-effect/dist/ripple'

import PokeFavButton from '../containers/PokeFavButton'

import styles from '../theme/styles.scss';
import {AvatarData} from '../lib/utils';


const PokeItem = ({pokemon, onClick}) =>{
    const {id, name, fav} = pokemon

    let avatarData = AvatarData(pokemon)

    return (
        <div className={styles.item}>
            <a className={[styles.itemTitle, ripple].join(' ')} onClick={onClick} >
                <Avatar {...avatarData}/>
                <div className={styles.itemCaption}>{name}</div>
            </a>
           <PokeFavButton className={styles.itemFav} fav={fav} pokemonId={id}/>
        </div>
    )
}


PokeItem.propTypes = {
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
    }), 
  onClick: PropTypes.func
};

export default PokeItem