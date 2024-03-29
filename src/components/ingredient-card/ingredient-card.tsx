import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd/dist/hooks';
import { TIngredient, useAppSelector } from '../../services/types/index';

interface IIngredienCard {
    id: string;
    name: string;
    price: number;
    image: string;
    type?: string;
}

const IngredientCard = ( { id, name, price, image, type }: IIngredienCard ) => {

    const constructorIngredients = useAppSelector(store => store.burgerConstructorReducer.constructorIngredients);
    const constructorBun = useAppSelector(store => store.burgerConstructorReducer.constructorBun);
    let numInConstructor = 0;
    (type === "bun" && constructorBun !== null && id === constructorBun._id)
        ? numInConstructor = 2
        : numInConstructor = constructorIngredients.filter((item: TIngredient) => item._id === id).length;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id}
    });

    return(
        <div className={styles.ingredientListItem} ref={dragRef} data-test="ingredientListItem">
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

export default IngredientCard;
