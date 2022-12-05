import React, { useEffect, useState } from 'react';
import styles from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {

  const [state, setState] = useState({
    ingredientsData: []
  })

  const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {

    const getIngredientsData = () => {
      fetch(dataUrl)
        .then((response) => {
          if(response.ok) {
            return response.json();
          }
          return Promise.reject(`Ошибка ${response.status}`);
        })
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
      <main className={styles.main}>
          <section className={styles.mainSection}>
            <BurgerIngredients ingredients={state.ingredientsData} />
          </section>
          <section className={styles.mainSection}>
            <BurgerConstructor ingredients={state.ingredientsData} />
          </section>
      </main>
    </>
  );
}

export default App;
