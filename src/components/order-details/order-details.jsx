import React from 'react';
import styles from './order-details.module.css';
import iconOrderAccepted from '../../images/iconOrderAccepted.svg';
import PropTypes from 'prop-types';

const OrderDetails = ( {orderNumber} ) => {

    return (
        <div className={`${styles.orderDetailsContainer} pt-30 pb-30`}>
            <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
            <span className="text text_type_main-medium">идентификатор заказа</span>
            <img src={iconOrderAccepted} alt="Заказ принят" className="mt-15 mb-15" />
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
        </div>
    )

}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number,
}

export default OrderDetails;
