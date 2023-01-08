import React, { useState } from 'react';
import styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../services/userActions';
import { useDispatch, useSelector } from 'react-redux';

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);

    const [form, setValue] = useState({
        email: '',
        password: '',
        name: '',
    });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        dispatch(register(form.email, form.password, form.name)); 
    }

    return (
        isAuthenticated ? (
            <Redirect to = '/' />
        ) : (
            <>
                <section className={styles.loginFormWrapper}>
                    <div className={styles.loginForm}>
                        <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Регистрация</h2>
                        <div className={`${styles.loginFormBody} pt-6 pb-20`}>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                value={form.name}
                                onChange={onChange}
                                name={'name'}
                            />
                            <EmailInput
                                value={form.email}
                                onChange={onChange}
                                name={'email'}
                            />
                            <PasswordInput
                                value={form.password}
                                onChange={onChange}
                                name={'password'}
                            />
                            <Button htmlType="button" type="primary" size="large" onClick={handleRegister}>
                                Зарегистрироваться
                            </Button>
                        </div>
                        <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
                            Уже зарегистрированы? <Link to="/login">Войти</Link>
                        </p>
                    </div>
                </section>
            </>
        )
    )

}
