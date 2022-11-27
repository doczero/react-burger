import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import ingredientsData from '../../utils/data.js'
import IngredientCard from '../ingredient-card/ingredient-card';

export default class BurgerIngredients extends React.Component {

    setCurrent() {
        return null;
    }

    render() {

        const bunArray: any = ingredientsData.filter(item => item.type === "bun");
        const sauceArray: any = ingredientsData.filter(item => item.type === "sauce");
        const mainArray: any = ingredientsData.filter(item => item.type === "main");

        return(
            <>
                <div className="pt-10">
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                    <div className={`${styles.ingredientsTabs} pt-5 pb-10`}>
                        <Tab value="Булки" active={true} onClick={this.setCurrent}>
                            Булки
                        </Tab>
                        <Tab value="Соусы" active={false} onClick={this.setCurrent}>
                            Соусы
                        </Tab>
                        <Tab value="Начинки" active={false} onClick={this.setCurrent}>
                            Начинки
                        </Tab>
                    </div>

                    <div className={styles.ingredientsCardsContainer}>

                        <h2 className="text text_type_main-medium">Булки</h2>

                            <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4 `}>
                                {bunArray.map((item: any) => (
                                    <IngredientCard id={item._id} name={item.name} price={item.price} image={item.image} />
                                ))}
                            </ul>

                        <h2 className="text text_type_main-medium">Соусы</h2>

                            <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4 `}>
                                {sauceArray.map((item: any) => (
                                    <IngredientCard id={item._id} name={item.name} price={item.price} image={item.image} />
                                ))}
                            </ul>

                        <h2 className="text text_type_main-medium">Начинки</h2>

                            <ul className={`${styles.ingredientsGroupList} pt-6 pb-8 pl-4 `}>
                                {mainArray.map((item: any) => (
                                    <IngredientCard id={item._id} name={item.name} price={item.price} image={item.image} />
                                ))}
                            </ul>
                    
                    </div>

                </div>
            </>
        )

    }
    
}