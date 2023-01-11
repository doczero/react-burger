import React, { useState } from 'react';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/action-creators/userActionCreators';
import { useDispatch, useSelector } from 'react-redux';

export const ForgotPasswordPage = () => {

    const dispatch = useDispatch();

    const isResettingPassword = useSelector(store => store.userReducer.isResettingPassword);

    const [form, setValue] = useState({ email: '' });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const handleForgotPasswordRequest = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(form.email));
    }

    return (
        isResettingPassword ? (
            <Redirect to = '/reset-password' />
        ) : (
            <section className={styles.loginFormWrapper}>
                <div className={styles.loginForm}>
                    <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Восстановление пароля</h2>
                    <div className="pt-6 pb-20">
                        <form className={styles.loginFormBody}  onSubmit={handleForgotPasswordRequest}>
                            <EmailInput 
                                placeholder={'Укажите e-mail'}
                                name={'email'}
                                onChange={onChange}
                                value={form.email}
                            />
                            <Button htmlType="submit" type="primary" size="large">
                                Восстановить
                            </Button>
                        </form>
                    </div>
                    <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
                        Вспомнили пароль? <Link to="/login">Войти</Link>
                    </p>
                </div>
            </section>
        )
    )

}
