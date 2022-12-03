import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ( { children } ) => {

    return (
        <>
            <div className={styles.overlay} id="overlay">
                {children}
            </div>
        </>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node,
}

export default ModalOverlay;
