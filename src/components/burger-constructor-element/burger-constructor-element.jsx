import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor-element.module.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

export const BurgerConstructorElement = ( { ingredient, handleClose, index, moveIngredient } ) => {

    const constructorIngredients = useSelector(store => store.burgerConstructorReducer.constructorIngredients);

    const id = ingredient.constructorId;

    const ref = useRef(null);

    const [{ handlerId}, drop] = useDrop({
        accept: "ingredient-sort",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex, constructorIngredients);

            item.index = hoverIndex;
        },
    })

    const [ {isDragging}, drag] = useDrag({
        type: "ingredient-sort",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.15 : 1;
    drag(drop(ref));

    return (
        <div className={styles.burgerConstructorItem} ref={ref} style={{opacity}} data-handler-id={handlerId}>
            <div className={styles.dragIconBlock}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleClose}
            />
        </div>
    )

}

BurgerConstructorElement.propTypes = {
    ingredient: PropTypes.shape(ingredientType).isRequired,
    handleClose: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    moveIngredient: PropTypes.func.isRequired,
}
