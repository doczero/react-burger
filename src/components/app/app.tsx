import React from 'react';
import styles from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
          <section className={styles.mainSection}>
            <BurgerIngredients />
          </section>
          <section className={styles.mainSection}>
            <BurgerConstructor />
          </section>
      </main>
    </>
  );
}

export default App;
