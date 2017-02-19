import React, {PropTypes} from 'react'

import PokeItem from '../components/PokeItem'

import styles from '../theme/styles.scss';


const ItemList = ({items, onItemClick})=>{
    const list = items.map((p)=>
        <PokeItem 
            key={p.id.toString()} 
            pokemon={p} 
            onClick={() => onItemClick(p.id)}
        />
    )
    return (
        <div className={styles.itemList}>
           {list}
        </div>
    )
}




export default ItemList