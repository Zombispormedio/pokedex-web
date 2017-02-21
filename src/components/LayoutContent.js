import React from 'react'
import styles from '../theme/styles.scss';

const LayoutContent = (props)=>(
    <div className={styles.content}>
        {props.children}
    </div>
)

export default LayoutContent