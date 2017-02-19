import React from 'react'

import {IconButton, Avatar, Ripple} from 'react-toolbox';

import randomColor from 'random-material-color'

import styles from '../theme/styles.scss';

import {ripple} from 'css-ripple-effect/dist/ripple'


const PokeItem = ({pokemon, onClick}) =>{
    const {name, sprite, fav} = pokemon

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
            <IconButton className={styles.itemFav} icon='favorite' accent />
        </div>
    )

}


export default PokeItem