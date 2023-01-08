import React from 'react';
import styles from './notFound404.module.css';
import { Link } from 'react-router-dom';

export const NotFound404 = () => {

    return (

        <section className={styles.notFoundWrapper}>
            <div className={styles.notFound}>
                <h1 className="text text_type_digits-large">404</h1>
                <p>Такой страницы у нас нет.</p>
                <p>Зато есть вкусные бургеры.</p>
                <p>
                    <Link to = '/'>Перейти на главную</Link>
                </p>
            </div>
        </section>

    )

}
