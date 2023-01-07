import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../services/userActions';

export const ProfilePage = () => {

    const dispatch = useDispatch();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (

        <main className={styles.profileMain}>

            <section className={styles.profileMenu}>
                <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
                <p className="text text_type_main-medium pt-4 pb-4 text_color_inactive">История заказов</p>
                <a href="#">
                    <p
                        className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
                        onClick={handleLogoutClick}
                    >Выход</p>
                </a>
                <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
            </section>
            <section className={styles.profileFields}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    icon={'EditIcon'}
                />
                <EmailInput
                    placeholder={'Логин'}
                    icon={'EditIcon'}
                />
                <Input
                    placeholder={'Пароль'}
                    type={'password'}
                    icon={'EditIcon'}
                />
            </section>
            
        </main>

    )

}
