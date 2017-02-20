import React, {PropTypes} from 'react'

import PokeItem from '../components/PokeItem'

import styles from '../theme/styles.scss';


const ItemList = ({items, onItemClick})=>{
    const list = items.map( p => (
        <div key={p.id.toString()}>
            <PokeItem pokemon={p} onClick={() => onItemClick(p.id)}/>
            <div className={styles.divider}></div>
        </div>
    ))
    return (
        <div className={styles.itemList}>
           {list}
        </div>
    )
}


ItemList.propTypes = {
  items: PropTypes.arrayOf(React.PropTypes.object),
  onClick: PropTypes.func
};



export default ItemList