import React, { useState } from 'react';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/userActions';
import { useDispatch, useSelector } from 'react-redux';

export const ForgotPasswordPage = () => {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);
    const isResettingPassword = useSelector(store => store.userReducer.isResettingPassword);

    const [form, setValue] = useState({ email: '' });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const handleForgotPasswordRequest = () => {
        dispatch(forgotPassword(form.email));
    }

    return (
        isAuthenticated ? (
            <Redirect to = '/' />
        ) : (
            isResettingPassword ? (
                <Redirect to = '/reset-password' />
            ) : (
            <>
                <section className={styles.loginFormWrapper}>
                    <div className={styles.loginForm}>
                        <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Восстановление пароля</h2>
                        <div className={`${styles.loginFormBody} pt-6 pb-20`}>
                            <EmailInput 
                                placeholder={'Укажите e-mail'}
                                name={'email'}
                                onChange={onChange}
                                value={form.email}
                            />
                            <Button htmlType="button" type="primary" size="large" onClick={handleForgotPasswordRequest}>
                                Восстановить
                            </Button>
                        </div>
                        <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
                            Вспомнили пароль? <Link to="/login">Войти</Link>
                        </p>
                    </div>
                </section>
            </>
            )
        )
    )

}
