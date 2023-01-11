import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser, updateUser } from '../../services/action-creators/userActionCreators';

export const ProfilePage = () => {

    const dispatch = useDispatch();

    const { userName, userLogin, isLoading, error } = useSelector(store => store.userReducer);

    useEffect(() => {
        dispatch(getUser());
        setValue({
            name: userName,
            email: userLogin
        })
    }, [dispatch]);

    const handleLogoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const [form, setValue] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [dataChanged, setDataChanged] = useState(false);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setDataChanged(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
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

    if (isLoading) {
        return <h1>Загрузка</h1>;
    }

    if (!isLoading && error.length > 0) {
        return <h1>Ошибка</h1>;
    }

    if (!isLoading && error.length === 0 && userName && userLogin) {   

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
                <section>
                    <form className={styles.profileFields} onSubmit={handleSaveProfile}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            icon={'EditIcon'}
                            value={form.name}
                            name={'name'}
                            onChange={onChange}
                        />
                        <EmailInput
                            placeholder={'Логин'}
                            icon={'EditIcon'}
                            value={form.email}
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
                                <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                            </div>
                        }
                    </form>
                </section>
                
            </main>

        )

    }

}
