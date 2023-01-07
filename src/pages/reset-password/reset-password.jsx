import React, { useState } from 'react';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/userActions';

export const ResetPasswordPage = () => {

    const dispatch = useDispatch();

    const [form, setValue] = useState({
        newPassword: '',
        resetPasswordCode: '',
    })

    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const handleResetPasswordRequest = () => {
        dispatch(resetPassword(form.newPassword, form.resetPasswordCode));
    }

    return (
        isAuthenticated ? (
            <Redirect to = '/' />
        ) : (
            <>
                <section className={styles.loginFormWrapper}>
                    <div className={styles.loginForm}>
                        <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Восстановление пароля</h2>
                        <div className={`${styles.loginFormBody} pt-6 pb-20`}>
                            <PasswordInput
                                placeholder={'Введите новый пароль'}
                                name={'newPassword'}
                                onChange={onChange}
                            />
                            <Input
                                type={'text'}
                                placeholder={'Введите код из письма'}
                                name={'resetPasswordCode'}
                                onChange={onChange}
                            />
                            <Button htmlType="button" type="primary" size="large" onClick={handleResetPasswordRequest}>
                                Сохранить
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

}
