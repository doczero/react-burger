import React from 'react';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import { selectedIngredientsData } from '../../utils/data';

const BurgerConstructor = () => {

        return(
            <>
                <div className={`${styles.constructorContainer} mt-25 mb-8 `}>
                    
                    <div className="pr-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={20}
                            thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
                        />
                    </div>

                    <div className={`${styles.burgerConstructorInnerItems} pr-2`}>

                        {selectedIngredientsData.map((item: any, index: any) => (
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

                    <div className="pr-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={20}
                            thumbnail={`https://code.s3.yandex.net/react/code/bun-02.png`}
                        />
                    </div>

                </div>

                <div className={styles.burgerConstructorMakeOrder}>
                    <div className={`${styles.burgerConstructorMakeOrderTotal} mr-10 `}>
                        <p className="text text_type_digits-medium">2866</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={styles.burgerConstructorMakeOrderSubmit}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                    </div>
                </div>

            </>
        )

    }

export default BurgerConstructor;
