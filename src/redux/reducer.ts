import { ActionInterface, ProductInterface } from '../utils/interfaces';
import * as types from './types';

const initialState = {
	notification: {
		type: '',
		text: '',
	},
	loading: true,
	products: {
		items: [],
		currentPage: 0,
		totalCount: 0,
	},
	selectedProduct: null,
	cart: [],
  buys: {
    items: [],
    currentPage: 0,
    totalCount: 0,
  }
};

export const ProductReducer = (
	state = initialState,
	action: ActionInterface
) => {
	switch (action.type) {
		case types.SHOW_MESSAGE:
			return {
				...state,
				notification: {
					text: action.payload.text,
					type: action.payload.type,
				},
			};
		case types.CLEAN_MESSAGE:
			return {
				...state,
				notification: {
					text: '',
					type: '',
				},
			};
		case types.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};

		case types.GET_ALL_PRODUCTS:
			return {
				...state,
				products: {
					items: action.payload.products,
					currentPage: action.payload.currentPage,
					totalCount: action.payload.totalCount,
				},
			};
		case types.SELECT_PRODUCT:
			return {
				...state,
				selectedProduct: state.products.items.find(
          (item: ProductInterface) => item.id === action.payload
        ),
			};
		case types.ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case types.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter(
					(item: ProductInterface) => item.id !== action.payload
				),
			};
		case types.CLEAR_CART:
			return {
				...state,
				cart: [],
			};

    case types.GET_ALL_BUYS:
      return {
        ...state,
        buys: {
          items: action.payload.buys,
          currentPage: action.payload.currentPage,
          totalCount: action.payload.totalCount,
        },
      };
      

		default:
			return state;
	}
};
