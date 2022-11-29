import React from 'react';
import styles from './app-header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {

        return(
            <header className={styles.header}>
                <div className={`${styles.headerContainer} pt-4 pb-4`}>
                    <nav className={styles.linksBlock}>
                        <div className="pt-4 pr-5 pb-4 pl-5">
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default">Конструктор</span>
                        </div>
                        <div className="pt-4 pr-5 pb-4 pl-5">
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
                        </div>
                    </nav>
                        <Logo />
                    <div className={styles.personalBlock}>
                        <div className="pt-4 pr-5 pb-4 pl-5">
                            <ProfileIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
                        </div>
                    </div>
                </div>
            </header>
        )  

}

export default AppHeader;
