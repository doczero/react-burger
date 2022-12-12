import React, { useEffect, useState } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';
import { baseURL } from '../../api/api';
import { request } from '../../utils/request';

const App = () => {

  const [state, setState] = useState({
    ingredientsData: []
  })

  const dataUrl = baseURL + "/ingredients";

  useEffect(() => {

    const getIngredientsData = () => {
      request(dataUrl)
        .then((responseData) => setState ({ ingredientsData: responseData.data }))
        .catch((error) => {
          alert("Ошибка при загрузке данных: " + error)
        });
    }

    getIngredientsData();

  }, []);

  return (
    <>
      <AppHeader />
      <BurgerConstructorContext.Provider value={state.ingredientsData}>
        <main className={styles.main}>
            <section className={styles.mainSection}>
              <BurgerIngredients />
            </section>
            <section className={styles.mainSection}>   
                <BurgerConstructor />
            </section>
        </main>
      </BurgerConstructorContext.Provider>
    </>
  );
}

export default App;
