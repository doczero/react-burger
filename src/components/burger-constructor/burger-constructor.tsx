import React, { useState, FC } from 'react';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/burgerConstructorActions';
import { sendOrder, addIngredientToConstructor, changeIngredientsSort, addBunToConstructor } from '../../services/action-creators/burgerConstructorActionCreators';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { useHistory } from 'react-router-dom';
import { TConstructorIngredient, TIngredient, useAppDispatch, useAppSelector } from '../../services/types/index';

const BurgerConstructor: FC = () => {

    const [isModalActive, setModalActive] = useState<boolean>(false);
    const allIngredients = useAppSelector(store => store.burgerConstructorReducer.allIngredients);
    const constructorIngredients = useAppSelector(store => store.burgerConstructorReducer.constructorIngredients);
    const bun = useAppSelector(store => store.burgerConstructorReducer.constructorBun);
    const isAuthenticated = useAppSelector(store => store.userReducer.isAuthenticated);
    const dispatch = useAppDispatch();
    let history = useHistory();
    
    const handleMakeOrderClick = () => {
        if(!isAuthenticated) {
            history.replace({ pathname: '/login' })
        } else {
            let orderIngredients;
            if (bun) {
                orderIngredients = constructorIngredients.concat(bun);
            } else {
                orderIngredients = constructorIngredients;
            }
            dispatch(sendOrder(orderIngredients));
            setModalActive(true);
        }
    }

    const handleRemoveItem = (constructorId: string) => {
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            payload: constructorId
        })
    }

    //@ts-ignore
    let totalCost = constructorIngredients.reduce( (sum: number, currentItem: TIngredient) => {
        return sum + currentItem.price;
    }, 0);

    if(bun) totalCost += 2 * bun.price;

    const handleCloseModal = () => {
        setModalActive(false);
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId: any) {
            const item = allIngredients.find((item: TIngredient) => item._id === itemId.id);
            if (item) {
                if (item.type === "bun") dispatch(addBunToConstructor(item));
                if (item && item.type !== "bun") dispatch(addIngredientToConstructor(item));
            }
        }
    })

    const moveIngredient = (dragIndex: number, hoverIndex: number, constructorIngredients: TConstructorIngredient[]) => {

        dispatch(changeIngredientsSort(dragIndex, hoverIndex, constructorIngredients));

    }

    return(
        <>
            <div ref={dropTarget} className={`${styles.constructorContainer} mt-25 mb-8`} data-test="constructorContainer">
                {bun &&
                    <div className="pr-4" data-test="constructorBunTop">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                }

                <div className={`${styles.burgerConstructorInnerItems} pr-2`} data-test="constructorInnerItems">

                    {constructorIngredients
                    .map((item: TConstructorIngredient, index: number) => (
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
                    <div className="pr-4" data-test="constructorBunBottom">
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
                    data-test="submitOrderButton"
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
