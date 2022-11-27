import React from 'react';
import './App.css';
import styles from './App.module.css'

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';


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
