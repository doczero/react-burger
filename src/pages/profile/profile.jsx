import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser, updateUser } from '../../services/userActions';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { userName, userLogin } = useSelector(store => store.userReducer);
    
    const handleLogoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const [form, setValue] = useState({
        name: userName,
        email: userLogin,
        password: '',
    });

    const [dataChanged, setDataChanged] = useState(false);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setDataChanged(true);
    };

    const handleSaveProfile = () => {
        dispatch(updateUser(form.name, form.email, form.password));
    }

    const handleCancelChanges = (e) => {
        e.preventDefault();
        setValue({
            ...form,
            name: userName,
            email: userLogin,
            password: '',
        });
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
                    value={form.name ?? ''}
                    name={'name'}
                    onChange={onChange}
                />
                <EmailInput
                    placeholder={'Логин'}
                    icon={'EditIcon'}
                    value={form.email ?? ''}
                    name={'email'}
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
                {dataChanged &&
                    <div className={styles.profileButtons}>
                        <a href="#" className={styles.cancelButton} onClick={handleCancelChanges}>Отмена</a>
                        <Button 
                            htmlType="button"
                            type="primary"
                            size="medium"
                            onClick={handleSaveProfile}
                        >
                            Сохранить
                        </Button>
                    </div>
                }
            </section>
            
        </main>

    )

}
