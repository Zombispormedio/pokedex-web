import React, {PropTypes} from 'react'

import PokeItem from '../components/PokeItem'

import Divider from '../components/Divider'

import styles from '../theme/styles.scss';


const ItemList = ({items, onItemClick})=>{
    const orderedList=order(items)
    const list = orderedList.map( p => (
        <div key={p.id.toString()}>
            <PokeItem pokemon={p} onClick={() => onItemClick(p.id)}/>
            <Divider/>
        </div>
    ))
    return (
        <div className={styles.itemList}>
           {list}
        </div>
    )
}


function order(list){
    const time = (a) => new Date(a.insertedAt).getTime()
    const byDate = (a, b) => time(b) - time(a)
    return list.sort((a, b)=>{
        if(a.fav && b.fav){
            return byDate(a, b);
        }else if(a.fav){
            return -1;
        }else if(b.fav){
            return 1;
        }else{
            return byDate(a, b);
        }
    })
}           

ItemList.propTypes = {
  items: PropTypes.arrayOf(React.PropTypes.object),
  onClick: PropTypes.func
};



export default ItemList