import {
	ActionInterface,
	CartInterface,
	ProductInterface,
} from '../utils/interfaces';
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
	},
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
        selectedProduct: null,
			};
		case types.SELECT_PRODUCT:
			return {
				...state,
				selectedProduct: state.products.items.find(
					(item: ProductInterface) => item.id === action.payload
				),
			};
		case types.ADD_TO_CART: {
			// Add it to cart with quantity 1. If already exists increase quantity by 1
			const productInCart = state.cart.find(
				(item: CartInterface) => item.id === action.payload.id
			);

			let addProductToCart: CartInterface;
			if (productInCart) {
				addProductToCart = {
					...productInCart,
					quantity: productInCart.quantity + 1,
				};
			} else {
				addProductToCart = {
					...action.payload,
					quantity: 1,
				};
			}
			let newCart = state.cart.filter(
				(item: CartInterface) => item.id !== action.payload.id
			);
			return {
				...state,
				cart: [...newCart, addProductToCart],
			};
		}
		case types.REMOVE_FROM_CART:
			const productInCart = state.cart.find(
				(item: ProductInterface) => item.id === action.payload
			);
			let removedProductFromCart: CartInterface;
			if (productInCart) {
				removedProductFromCart = {
					...productInCart,
					quantity: productInCart.quantity - 1,
				};
			}

			let newCart = state.cart.filter(
				(item: ProductInterface) => item.id !== action.payload
			);
			if (removedProductFromCart && removedProductFromCart.quantity > 0) {
				newCart = [...newCart, removedProductFromCart];
			}
			return {
				...state,
				cart: newCart
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
