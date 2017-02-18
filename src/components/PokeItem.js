import React from 'react'

import {IconButton} from 'react-toolbox';

import Avatar from 'react-avatar';

import styles from '../theme/styles.scss';

const PokeItem = ({pokemon}) =>{
    
    const avatar = <Avatar className={styles.itemAvatar} name={pokemon.name} size={40} round={true} />

    const right =  <IconButton className={styles.itemFav} icon='favorite' accent />

    return (
        <div className={styles.item} >
            <div className={styles.itemTitle}>
                {avatar}
                <div className={styles.itemCaption}>{pokemon.name}</div>
            </div>
            {right}
        </div>
    )

}

export default PokeItem