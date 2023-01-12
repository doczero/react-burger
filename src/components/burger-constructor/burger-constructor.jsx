import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/burgerConstructorActions';
import { sendOrder, addIngredientToConstructor, changeIngredientsSort, addBunToConstructor } from '../../services/action-creators/burgerConstructorActionCreators';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { useHistory } from 'react-router-dom';

const BurgerConstructor = () => {

    const [isModalActive, setModalActive] = useState(false);
    const allIngredients = useSelector(store => store.burgerConstructorReducer.allIngredients);
    const constructorIngredients = useSelector(store => store.burgerConstructorReducer.constructorIngredients);
    const bun = useSelector(store => store.burgerConstructorReducer.constructorBun);
    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);
    const dispatch = useDispatch();
    let history = useHistory();
    
    const handleMakeOrderClick = () => {
        if(!isAuthenticated) {
            history.replace({ pathname: '/login' })
        } else {
            const orderIngredients = constructorIngredients.concat(bun);
            dispatch(sendOrder(orderIngredients));
            setModalActive(true);
        }
    }

    const handleRemoveItem = (constructorId) => {
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            payload: constructorId
        })
    }

    let totalCost = constructorIngredients.reduce( (sum, currentItem) => {
        return sum + currentItem.price;
    }, 0);

    if(bun) totalCost += 2 * bun.price;

    const handleCloseModal = () => {
        setModalActive(false);
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            const item = allIngredients.find(item => item._id === itemId.id);
            item.type === "bun" ? dispatch(addBunToConstructor(item)) : dispatch(addIngredientToConstructor(item));
        }
    })

    const moveIngredient = (dragIndex, hoverIndex, constructorIngredients) => {

        dispatch(changeIngredientsSort(dragIndex, hoverIndex, constructorIngredients));

    }

    return(
        <>
            <div ref={dropTarget} className={`${styles.constructorContainer} mt-25 mb-8`}>
                {bun &&
                    <div className="pr-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                }

                <div className={`${styles.burgerConstructorInnerItems} pr-2`}>

                    {constructorIngredients
                    .map((item, index) => (
                        <div key={item.constructorId} className={styles.burgerConstructorItem}>
                            <BurgerConstructorElement
                                ingredient={item}
                                index={index}
                                handleClose={() => handleRemoveItem(item.constructorId)}
                                moveIngredient={moveIngredient}
                            />
                        </div>
                    ))}

                </div>

                {bun &&
                    <div className="pr-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                }

            </div>

            <div className={styles.burgerConstructorMakeOrder}>
                <div className={`${styles.burgerConstructorMakeOrderTotal} mr-10`}>
                    <p className="text text_type_digits-medium">{totalCost}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.burgerConstructorMakeOrderSubmit}>
                <Button 
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleMakeOrderClick}
                    disabled={(constructorIngredients.length === 0 && !bun) ? true : false}
                >
                    Оформить заказ
                </Button>
                </div>
            </div>

            {isModalActive && 
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal>
            }

        </>
    )

}

export default BurgerConstructor;
