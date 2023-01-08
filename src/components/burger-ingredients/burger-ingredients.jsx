import React, { useState, useRef, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { SET_CURRENT_INGREDIENT } from '../../services/burgerConstructorActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const BurgerIngredients = () => {

    const containerRef = useRef();
    const bunsRef = useRef();
    const saucesRef = useRef();
    const mainRef = useRef();

    const location = useLocation();

    const [currentTab, setCurrentTab] = useState("Булки");

    const dispatch = useDispatch();

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
            default:
                break;
        }
        tabToScroll.current.scrollIntoView( {behavior: "smooth"} );
        setCurrentTab(event);
    }

    const handleScroll = () => {
        const containerY = containerRef.current.getBoundingClientRect().y;
        const bunsOffset = Math.abs(bunsRef.current.getBoundingClientRect().y - containerY);
        const saucesOffset = Math.abs(saucesRef.current.getBoundingClientRect().y - containerY);
        const mainOffset = Math.abs(mainRef.current.getBoundingClientRect().y - containerY);
        
        if(bunsOffset < saucesOffset && bunsOffset < mainOffset) setCurrentTab("Булки");
        if(saucesOffset < bunsOffset && saucesOffset < mainOffset) setCurrentTab("Соусы");
        if(mainOffset < bunsOffset && mainOffset < saucesOffset) setCurrentTab("Начинки");
    }

    const ingredients = useSelector(store => store.burgerConstructorReducer.allIngredients);

    const handleIngredientClick = ( item ) => {
        dispatch( { type: SET_CURRENT_INGREDIENT, payload: item } );
        setModalActive(true);
    }

    const [isModalActive, setModalActive] = useState(false);

    const bunArray = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const sauceArray = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const mainArray = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);

    const handleCloseModal = () => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            payload: null
        });
        setModalActive(false);
    }

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

                <div className={styles.ingredientsCardsContainer} ref={containerRef} onScroll={handleScroll}>


                        <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>

                        <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                            {bunArray.map((item) => (
                                <Link
                                    to={{
                                        pathname: '/ingredients/' + item._id,
                                        state: { background: location }
                                    }}
                                    className={styles.ingredientListItem}
                                    key={item._id}
                                >
                                    <li onClick={() => handleIngredientClick(item)}>
                                        <IngredientCard 
                                            id={item._id}
                                            name={item.name}
                                            price={item.price}
                                            image={item.image}
                                            type={item.type}
                                        />
                                    </li>
                                </Link>

                            ))}
                        </ul>

                        <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>

                        <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                            {sauceArray.map((item) => (
                               <Link
                                    to={{
                                        pathname: '/ingredients/' + item._id,
                                        state: { background: location }
                                    }}
                                    className={styles.ingredientListItem}
                                    key={item._id}
                                >
                                    <li onClick={() => handleIngredientClick(item)}>
                                        <IngredientCard
                                            id={item._id}
                                            name={item.name}
                                            price={item.price}
                                            image={item.image}
                                        />
                                    </li>
                                </Link>
                            ))}
                        </ul>

                    <h2 className="text text_type_main-medium" ref={mainRef}>Начинки</h2>

                    <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                        {mainArray.map((item) => (
                            <Link
                               to={{
                                   pathname: '/ingredients/' + item._id,
                                   state: { background: location }
                               }}
                               className={styles.ingredientListItem}
                               key={item._id}
                            >
                                <li onClick={() => handleIngredientClick(item)}>
                                    <IngredientCard
                                        id={item._id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                    />
                                </li>
                            </Link>
                        ))}
                    </ul>
                
                </div>

            </div>

            {isModalActive &&
                <Modal
                    title={`Детали ингредиента`}
                    onClose={handleCloseModal}
                >
                    <IngredientDetails />
                </Modal>
            }

        </>
    )

}

export default BurgerIngredients;
