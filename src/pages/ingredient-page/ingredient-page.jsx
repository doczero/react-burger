import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {

    const { id } = useParams();

    const allIngredients = useSelector(store => store.burgerConstructorReducer.allIngredients);
    const currentIngredient = allIngredients.find(item => item._id === id);

    return (
        <div className={`${styles.ingredientDetailsContainer} pb-15`}>
            <img src={currentIngredient.image_large} alt={currentIngredient.name} />
            <span className={`${styles.ingredientName} text text_type_main-medium mt-4`}>{currentIngredient.name}</span>
            <div className={`${styles.ingredientDetailsItems} mt-8`}>
                <div className={styles.ingredientDetailsItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{currentIngredient.calories}</p>
                </div>
                <div className={styles.ingredientDetailsItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{currentIngredient.proteins}</p>
                </div>
                <div className={styles.ingredientDetailsItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{currentIngredient.fat}</p>
                </div>
                <div className={styles.ingredientDetailsItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{currentIngredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )

}
