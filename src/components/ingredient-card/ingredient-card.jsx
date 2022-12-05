import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './ingredient-card.module.css';

const IngredientCard = ( { name, price, image } ) => {
        return(
            <>
                <img src={image} alt={name} className={styles.ingredientListItemImage} />
                <span className={`${styles.ingredientListItemPrice} text text_type_digits-default`}>
                    {price}
                    <CurrencyIcon type="primary" />
                </span>
                <p className={`${styles.ingredientListItemName} text text_type_main-default`}>{name}</p>
            </>
        )
}

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

export default IngredientCard;
