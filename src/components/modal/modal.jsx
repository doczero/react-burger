import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import * as ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { ingredientPropTypes } from "../../utils/propTypes-ingredients";

const Modal = ( { kindOfModal, onClose, ingredientData } ) => {

    const modalBlock = document.getElementById("modals");

    const overlayRef = useRef(null);

    const closeModal = (event) => {
        if( (event.type === "keydown" && event.code === "Escape") 
            || 
            ( (event.type === "click" && !overlayRef.current.contains(event.target))))
            {
                onClose();
            }
    }

    useEffect(() => {

        const overlay = document.getElementById("overlay");

        overlay.addEventListener("click", closeModal);
        document.addEventListener("keydown", closeModal);

        return () => {

            overlay.removeEventListener("click", closeModal);
            document.removeEventListener("keydown", closeModal);

        }

    });

    return ReactDOM.createPortal(
            <ModalOverlay>
                <div className={styles.modalContainer} onClick={(e) => e.stopPropagation} ref={overlayRef}>
                    {kindOfModal === "ingredient" &&
                    <div className={`${styles.headerContainer} mt-10 ml-10 mr-10`}>
                        <h2 className="text text_type_main-large">Детали ингредиента</h2>
                    </div>
                    }
                    <div className={styles.closeModalButton} onClick={() => onClose()} >
                        <CloseIcon type="primary" />
                    </div>
                    {kindOfModal === "order"
                    ? <OrderDetails />
                    : <IngredientDetails
                        name={ingredientData.name}
                        calories={ingredientData.calories}
                        fat={ingredientData.fat}
                        carbohydrates={ingredientData.carbohydrates}
                        proteins={ingredientData.proteins}
                        image_large={ingredientData.image_large}
                    />
                    }
                    
                </div>
            </ModalOverlay>,
            modalBlock
    )

}

Modal.propTypes = {
    kindOfModal: PropTypes.oneOf(["order", "ingredient"]).isRequired,
    onClose: PropTypes.func.isRequired,
    ingredientData: PropTypes.shape(ingredientPropTypes),
}

export default Modal;
