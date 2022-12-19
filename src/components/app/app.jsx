import React, { useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/burgerConstructorActions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getIngredients());

  }, []);

  return (
    <>
      <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
              <section className={styles.mainSection}>
                <BurgerIngredients />
              </section>
              <section className={styles.mainSection}>   
                  <BurgerConstructor />
              </section>
          </main>
        </DndProvider>
    </>
  );
}

export default App;
