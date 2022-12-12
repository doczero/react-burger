import React, { useState, useContext, useRef, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';

const BurgerIngredients = () => {

    const bunsRef = useRef();
    const saucesRef = useRef();
    const mainRef = useRef();

    const [currentTab, setCurrentTab] = useState("Булки");

    const setCurrent = (event) => {
        let tabToScroll;
        switch(event) {
            case 'Булки':
                tabToScroll = bunsRef;
                break;
            case 'Соусы':
                tabToScroll = saucesRef;
                break;
            case 'Начинки':
                tabToScroll = mainRef;
                break;
        }
        tabToScroll.current.scrollIntoView( {behavior: "smooth"} );
        setCurrentTab(event);
    }

    const ingredients = useContext(BurgerConstructorContext);

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const handleIngredientClick = ( item ) => {
        setCurrentIngredient(item);
        setModalActive(true);
    }

    const [isModalActive, setModalActive] = useState(false);

    const bunArray = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const sauceArray = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const mainArray = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);

    return(
        <>
            <div className="pt-10">
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={`${styles.ingredientsTabs} pt-5 pb-10`}>
                    <Tab value="Булки" active={currentTab === 'Булки'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>

                <div className={styles.ingredientsCardsContainer}>

                    <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>

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

                    <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>

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

                    <h2 className="text text_type_main-medium" ref={mainRef}>Начинки</h2>

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
                <Modal
                    title={`Детали ингредиента`}
                    onClose={() => setModalActive(false)}
                >
                    <IngredientDetails ingredientData={currentIngredient} />
                </Modal>
            }

        </>
    )

}

export default BurgerIngredients;
