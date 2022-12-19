import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';

const IngredientCard = ( { id, name, price, image } ) => {

    const constructorIngredients = useSelector(store => store.burgerConstructorReducer.constructorIngredients);
    const numInConstructor = constructorIngredients.filter(item => item._id === id).length;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id}
    });

    return(
        <div className={styles.ingredientListItem} ref={dragRef}>
            {(numInConstructor > 0) &&
                <Counter count={numInConstructor} size="default" extraClass="m-1" />
            }
            <img src={image} alt={name} className={styles.ingredientListItemImage}  />
            <span className={`${styles.ingredientListItemPrice} text text_type_digits-default`}>
                {price}
                <CurrencyIcon type="primary" />
            </span>
            <p className={`${styles.ingredientListItemName} text text_type_main-default`}>{name}</p>
        </div>
    )

}

IngredientCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

export default IngredientCard;
