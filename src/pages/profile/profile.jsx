import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser } from '../../services/userActions';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {

    const dispatch = useDispatch();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const [form, setValue] = useState({
        name: '',
        email: '',
        password: '',
    })

    useEffect(() => {

        dispatch(getUser());

    });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const userName = useSelector(store => store.userReducer.userName);
    const userLogin = useSelector(store => store.userReducer.userLogin);

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
                    value={form.name ?? ''}
                    name={'name'}
                    onChange={onChange}
                />
                <EmailInput
                    placeholder={'Логин'}
                    icon={'EditIcon'}
                    value={form.login ?? ''}
                    name={'login'}
                    onChange={onChange}
                />
                <Input
                    placeholder={'Пароль'}
                    type={'password'}
                    icon={'EditIcon'}
                    name={'password'}
                    onChange={onChange}
                    value={''}
                />
                <div className={styles.profileButtons}>
                    <Link className={styles.cancelButton}>Отмена</Link>
                    <Button 
                        htmlType="button"
                        type="primary"
                        size="medium"
                    >
                        Сохранить
                    </Button>
                </div>
            </section>
            
        </main>

    )

}
