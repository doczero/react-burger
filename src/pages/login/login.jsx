import React, { useState } from 'react';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../services/userActions';
import { useDispatch, useSelector } from 'react-redux';

export const LoginPage = () => {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);

    const [form, setValue] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        dispatch(login(form.email, form.password));
    }

    return (
        isAuthenticated ? (
            <Redirect to = '/' />
        )
        : (
            <>
                <section className={styles.loginFormWrapper}>
                    <div className={styles.loginForm}>
                        <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Вход</h2>
                        <div className={`${styles.loginFormBody} pt-6 pb-20`}>
                            <EmailInput
                                name={'email'}
                                value={form.email}
                                onChange={onChange}
                            />
                            <PasswordInput
                                name={'password'}
                                value={form.password}
                                onChange={onChange}
                            />
                            <Button htmlType="button" type="primary" size="large" onClick={handleLogin}>
                                Войти
                            </Button>
                        </div>
                        <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive mb-4`}>
                            Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
                        </p>
                        <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
                            Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
                        </p>
                    </div>
                </section>
            </>
        )
    )

}
