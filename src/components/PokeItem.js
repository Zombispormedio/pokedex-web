import React, {PropTypes} from 'react'

import {Avatar} from 'react-toolbox';

import randomColor from 'random-material-color'
import {ripple} from 'css-ripple-effect/dist/ripple'

import PokeFavButton from '../containers/PokeFavButton'

import styles from '../theme/styles.scss';


const PokeItem = ({pokemon, onClick}) =>{
    const {id, name, sprite, fav} = pokemon

    let avatarData = {
        style: {backgroundColor: 'transparent'}
    }

    if(sprite.length == 0){
        avatarData.title = name
        avatarData.className = styles.itemAvatar;
        avatarData.style.backgroundColor = randomColor.getColor({ text: pokemon.name })
    } else {
        avatarData.className = styles.itemAvatarSprite;
        avatarData.image = pokemon.sprite
    }

    return (
        <div className={styles.item}>
            <a className={[styles.itemTitle, ripple].join(' ')} onClick={onClick} >
                <Avatar {...avatarData}/>
                <div className={styles.itemCaption}>{pokemon.name}</div>
            </a>
           <PokeFavButton className={styles.itemFav} fav={fav} pokemonId={id}/>
        </div>
    )
}


PokeItem.propTypes = {
  pokemon: React.PropTypes.object,
  onClick: PropTypes.func
};

export default PokeItem