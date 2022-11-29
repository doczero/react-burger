import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './ingredient-card.module.css';

interface IngredientCardProps {
    id: string,
    name: string,
    price: number,
    image: string
}

const IngredientCard = ({id, name, price, image}: IngredientCardProps) => {
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

export default IngredientCard;
