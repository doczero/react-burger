import React, { FC } from 'react';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';

export const ResetPasswordPage: FC = () => {

    const dispatch = useDispatch();

    const { values, handleChange } = useForm({
        newPassword: '',
        resetPasswordCode: ''        
    })

    const isResettingPassword = useSelector((store: any) => store.userReducer.isResettingPassword);

    const handleResetPasswordRequest = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(resetPassword(values.newPassword, values.resetPasswordCode));
    }

    if (!isResettingPassword) {
        return (
          <Redirect to={{ pathname: '/forgot-password' }} />
        )
      }

    return (
        <section className={styles.loginFormWrapper}>
            <div className={styles.loginForm}>
                <h2 className={`${styles.loginFormHeader} text text_type_main-medium`}>Восстановление пароля</h2>
                <div className="pt-6 pb-20">
                    <form className={styles.loginFormBody} onSubmit={handleResetPasswordRequest}>
                        <PasswordInput
                            placeholder={'Введите новый пароль'}
                            name={'newPassword'}
                            onChange={handleChange}
                            value={values.newPassword}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            name={'resetPasswordCode'}
                            onChange={handleChange}
                            value={values.resetPasswordCode}
                        />
                        <Button htmlType="submit" type="primary" size="large">
                            Сохранить
                        </Button>
                    </form>
                </div>
                <p className={`${styles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
                    Вспомнили пароль? <Link to="/login">Войти</Link>
                </p>
            </div>
        </section>
    )

}
