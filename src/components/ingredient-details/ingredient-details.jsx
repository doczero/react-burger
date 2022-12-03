import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ( { name, calories, fat, carbohydrates, proteins, image_large } ) => {

    return (
        <>
            <div className={`${styles.ingredientDetailsContainer} pb-15`}>
                <img src={image_large} />
                <span className={`${styles.ingredientName} text text_type_main-medium mt-4`}>{name}</span>
                <div className={`${styles.ingredientDetailsItems} mt-8`}>
                    <div className={styles.ingredientDetailsItem}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{calories}</p>
                    </div>
                    <div className={styles.ingredientDetailsItem}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{proteins}</p>
                    </div>
                    <div className={styles.ingredientDetailsItem}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{fat}</p>
                    </div>
                    <div className={styles.ingredientDetailsItem}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </>
    )

}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
}

export default IngredientDetails;
