import React, { useEffect } from 'react';
import styles from './main.module.css'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../services/burgerConstructorActions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MainPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getIngredients());

  }, []);

  return (
    <>
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
