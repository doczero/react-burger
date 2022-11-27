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
            <li key={id} className={styles.ingredientListItem}>
                <img src={image} />
                <span className="text text_type_digits-default" style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}}>
                    {price}
                    <CurrencyIcon type="primary" />
                </span>
                <p className="text text_type_main-default">{name}</p>
            </li>
        )
}

export default IngredientCard;