import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import * as ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ( { onClose, children, title } ) => {

    const modalBlock = document.getElementById("modals");

    const handleEscape = (event) => {
        if (event.type === "keydown" && event.code === "Escape") {
            onClose();
        }
    }

    useEffect(() => {
        
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        }

    });

    return ReactDOM.createPortal(
            <ModalOverlay onClose={onClose}>
                <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>

                    <div className={styles.closeModalButton} onClick={onClose} >
                        <CloseIcon type="primary" />
                    </div>

                    {title &&
                        <div className={`${styles.headerContainer} mt-10 ml-10 mr-10`}>
                            <h2 className="text text_type_main-large">{title}</h2>
                        </div>
                    }

                    {children}
                    
                </div>
            </ModalOverlay>,
            modalBlock
    )

}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string,
}

export default Modal;
