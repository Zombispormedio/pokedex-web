import React, {PropTypes} from 'react'

import {Button} from 'react-toolbox';

import styles from '../theme/styles.scss';

const FloatingActionButton = ({icon, onClick}) => (
    <div className={styles.fixedActionBtn}>
        <Button icon={icon} onClick={onClick} floating accent/>
    </div>
)
export default FloatingActionButton