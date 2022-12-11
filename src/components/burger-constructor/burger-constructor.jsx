import React, { useState, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';

const BurgerConstructor = () => {

    const [isModalActive, setModalActive] = useState(false);
    const [constructorBun, setConstructorBun] = useState("60d3b41abdacab0026a733c6");
    const [orderNumber, setOrderNumber] = useState(null);

    const ingredients = useContext(BurgerConstructorContext);

    const bun = ingredients.find((item) => item._id === constructorBun);

    const mainIngredients = ingredients.filter((item) => item.type !== "bun");

    const handleMakeOrderClick = () => {

        const orderUrl = "https://norma.nomoreparties.space/api/orders";

        const makeOrder = () => {

            let ingredientsInConstructor = [];
            for (let item of mainIngredients) {
                ingredientsInConstructor.push(item._id);
            }

            fetch(orderUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "ingredients": ingredientsInConstructor })
            })
              .then((response) => {
                if(response.ok) {
                  return response.json();
                }
                return Promise.reject(`Ошибка ${response.status}`);
              })
              .then((responseData) => setOrderNumber(responseData.order.number))
              .catch((error) => {
                alert("Ошибка при отправке данных: " + error)
              });

          }
      
          makeOrder();
          setModalActive(true);

    }

    let totalCost = ingredients
        .filter(currentItem => currentItem.type !== "bun")
        .reduce(
        (sum, currentItem) => sum + currentItem.price, 0
    );

    if(bun) totalCost += 2 * bun.price;

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
                    <p className="text text_type_digits-medium">{totalCost}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.burgerConstructorMakeOrderSubmit}>
                <Button 
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleMakeOrderClick}
                >
                    Оформить заказ
                </Button>
                </div>
            </div>

            {isModalActive && 
                <Modal onClose={() => setModalActive(false)}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
            }

        </>
    )

}

export default BurgerConstructor;
