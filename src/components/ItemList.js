import React from 'react'

import PokeItem from '../components/PokeItem'

import styles from '../theme/styles.scss';

const ItemList = ({items, onItemClick, onItemFav})=>{
    const list = items.map((p)=>
        <PokeItem 
            key={p.id.toString()} 
            pokemon={p} 
            onClick={() => onItemClick(p.id)}
            onFav={() => onItemFav(p.id)}
        />
    )
    return (
        <div className={styles.itemList}>
           {list}
        </div>
    )
}



export default ItemList