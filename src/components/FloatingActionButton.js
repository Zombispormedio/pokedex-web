import React, {PropTypes} from 'react'

import {Button} from 'react-toolbox';

import styles from '../theme/styles.scss';

const FloatingActionButton = ({icon, onClick}) => (
    <div className={styles.fixedActionBtn}>
        <Button icon={icon} onClick={onClick} floating accent/>
    </div>
)

FloatingActionButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func
};

export default FloatingActionButton