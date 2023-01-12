import React, { useState } from 'react';
import styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { register } from '../../services/action-creators/userActionCreators';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const { values, handleChange } = useForm({
        email: '',
        password: '',
        name: '',
    })

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(values.email, values.password, values.name)); 
    }

    return (
        <section className={styles.loginFormWrapper}>
            <div className={styles.loginForm}>
                <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Регистрация</h2>
                <div className="pt-6 pb-20">
                    <form className={styles.loginFormBody} onSubmit={handleRegister}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            value={values.name}
                            onChange={handleChange}
                            name={'name'}
                        />
                        <EmailInput
                            value={values.email}
                            onChange={handleChange}
                            name={'email'}
                        />
                        <PasswordInput
                            value={values.password}
                            onChange={handleChange}
                            name={'password'}
                        />
                        <Button htmlType="submit" type="primary" size="large">
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
                <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
                    Уже зарегистрированы? <Link to="/login">Войти</Link>
                </p>
            </div>
        </section>
    )

}
