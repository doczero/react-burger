import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import Modal from '../modal/modal';
import { ingredientType } from "../../utils/types";
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = ({ ingredients }) => {

    const [isModalActive, setModalActive] = useState(false);

    const [constructorBun, setConstructorBun] = useState("60d3b41abdacab0026a733c6");

    const bun = ingredients.find((item) => item._id === constructorBun);

    return(
        <>
            <div className={`${styles.constructorContainer} mt-25 mb-8 `}>
                
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

                    {ingredients
                    .filter(item => item.type !== "bun")
                    .map((item, index) => (
                        <div key={index} className={styles.burgerConstructorItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
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
                <div className={`${styles.burgerConstructorMakeOrderTotal} mr-10 `}>
                    <p className="text text_type_digits-medium">2866</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.burgerConstructorMakeOrderSubmit}>
                <Button 
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => setModalActive(true)}
                >
                    Оформить заказ
                </Button>
                </div>
            </div>

            {isModalActive && 
                <Modal onClose={() => setModalActive(false)}>
                    <OrderDetails />
                </Modal>
            }

        </>
    )

}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
}

export default BurgerConstructor;
