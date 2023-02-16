import React, { FC, useEffect } from 'react';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { getOrderInfo } from '../../services/action-creators/burgerConstructorActionCreators';
import { TParams, TOrder, TIngredient, TOrderIngredient } from '../../services/types';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {

    const dispatch = useAppDispatch();

    const { number } = useParams<TParams>();

    useEffect(() => {
        dispatch(getOrderInfo(String(number)));
    }, [])

    const { currentOrder } = useAppSelector(store => store.burgerConstructorReducer);
    const { allIngredients } = useAppSelector(store => store.burgerConstructorReducer);

    let orderIngredients: TOrderIngredient[] = [];
    currentOrder?.ingredients.forEach((currentItem) => {
        let currentIngredient = allIngredients.find((item) => item._id === currentItem);
        if (currentIngredient) {
            // проверим, нет ли в итоговом массиве элемента с таким id
            if (orderIngredients.find(item => item._id === currentIngredient?._id) === undefined) {
                // подсчитаем кол-во вхождений ингредиента
                let q = currentOrder?.ingredients.filter(item => item === currentIngredient?._id).length;
                // добавим элемент в итоговый массив с добавлением количества
                orderIngredients.push({...currentIngredient, quantityInOrder: q});
            }
        }
    });

    let orderSum = orderIngredients.reduce((sum, currentItem) => {
        return sum + (currentItem.price * currentItem.quantityInOrder);
    }, 0);

    const formatStatus = (status: string | undefined) => {
        switch (status) {
            case "created":
                return "Создан";
            case "pending":
                return "Готовится";
            case "done":
                return "Выполнен";
            default:
                return "Неизвестен";
        }
    }
    
    return (
        <div className={styles.orderInfoContainer}>
            <div className={`${styles.ordersInfoHeading} text text_type_digits-default mb-10`}>#{currentOrder?.number}</div>
            <div className="text text_type_main-medium mb-3">{currentOrder?.name}</div>
            <div className={`${styles.orderInfoStatus} text text_type_main-default mb-15`}>{formatStatus(currentOrder?.status)}</div>
            <div className="text text_type_main-medium mb-6">Состав:</div>
            <div className={`${styles.orderInfoIngredientsContainer} mb-10 pr-6`}>

            {orderIngredients.map(item => (
                <div className={styles.orderInfoIngredient} key={item._id}>
                    <div className={styles.orderInfoIngredientPreview}>
                        <img src={item.image} className={styles.orderInfoIngredientPreviewImage} alt={item.name} />
                    </div>
                    <div className={`${styles.orderInfoIngredientNameBlock} text text_type_main-default`}>
                        <p className={styles.orderInfoIngredientName}>
                            {item.name}
                        </p>
                    </div>
                    <div className={styles.orderInfoIngredientTotal}>
                        <div className="text text_type_digits-default">{item.quantityInOrder} x {item.price}</div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            ))}

            </div>
            <div className={styles.ordersInfoBottom}>
                <div className="text text_type_main-default text_color_inactive">
                    {currentOrder &&
                        <FormattedDate date={new Date(currentOrder.updatedAt)} />
                    }
                </div>
                <div className={styles.orderInfoIngredientTotal}>
                    <div className="text text_type_digits-default">{orderSum}</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )

}

export default OrderInfo;
