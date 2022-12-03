import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import { ingredientPropTypes } from "../../utils/propTypes-ingredients";

const BurgerIngredients = ( { ingredients } ) => {

    const setCurrent = () => {
        return null;
    }

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const handleIngredientClick = ( item ) => {
        setCurrentIngredient(item);
        setModalActive(true);
    }

    const [isModalActive, setModalActive] = useState(false);

    const bunArray = ingredients.filter(item => item.type === "bun");
    const sauceArray = ingredients.filter(item => item.type === "sauce");
    const mainArray = ingredients.filter(item => item.type === "main");

    return(
        <>
            <div className="pt-10">
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={`${styles.ingredientsTabs} pt-5 pb-10`}>
                    <Tab value="Булки" active={true} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={false} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={false} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>

                <div className={styles.ingredientsCardsContainer}>

                    <h2 className="text text_type_main-medium">Булки</h2>

                        <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                            {bunArray.map((item) => (
                                <li key={item._id} className={styles.ingredientListItem} onClick={() => handleIngredientClick(item)}>
                                    <IngredientCard 
                                        id={item._id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                    />
                                </li>
                            ))}
                        </ul>

                    <h2 className="text text_type_main-medium">Соусы</h2>

                        <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                            {sauceArray.map((item) => (
                                <li key={item._id} className={styles.ingredientListItem} onClick={() => handleIngredientClick(item)}>
                                    <IngredientCard
                                        id={item._id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                    />
                                </li>
                            ))}
                        </ul>

                    <h2 className="text text_type_main-medium">Начинки</h2>

                        <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                            {mainArray.map((item) => (
                                <li key={item._id} className={styles.ingredientListItem} onClick={() => handleIngredientClick(item)}>
                                    <IngredientCard
                                        id={item._id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                    />
                                </li>
                            ))}
                        </ul>
                
                </div>

            </div>

            {isModalActive &&
                <Modal kindOfModal="ingredient" ingredientData={currentIngredient} onClose={() => setModalActive(false)} />
            }

        </>
    )

}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerIngredients;
