import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, 
        SET_CURRENT_INGREDIENT, 
        SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_ERROR,
        ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, CLEAR_CONSTRUCTOR, CHANGE_INGREDIENTS_ORDER, ADD_BUN_TO_CONSTRUCTOR
    } from "./burgerConstructorActions";

const initialState = {

    allIngredients: [],
    constructorIngredients: [],
    constructorBun: null,
    currentIngredient: null,
    orderNumber: null

}

export const burgerConstructorReducer = (state = initialState, action) => {
    
    switch(action.type) {

        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
            }
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                allIngredients: action.payload
            }
        }

        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
            }
        }

        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.payload
            }
        }

        case ADD_BUN_TO_CONSTRUCTOR: {
            return {
                ...state,
                constructorBun: action.payload
            }
        }

        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.payload]
            }
        }

        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].filter(item => item.constructorId !== action.payload)
            }
        }

        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: [],
                constructorBun: null
            }
        }

        case CHANGE_INGREDIENTS_ORDER: {
            return {
                ...state,
                constructorIngredients: action.payload
            }
        }

        case SEND_ORDER_REQUEST: {
            return {
                ...state,
            }
        }

        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload
            }
        }

        case SEND_ORDER_ERROR: {
            return {
                ...state,
            }
        }

        default:
            return state;

    }

};
