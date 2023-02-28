import axiosClient from '../utils/axios';
import { NewProductInterface, ProductInterface } from '../utils/interfaces';
import * as types from './types';

export const ShowNotificationAction =
	(text: string, type: string, timer = 4000) =>
	(dispatch: any) => {
		dispatch({
			type: types.SHOW_MESSAGE,
			payload: { text, type },
		});

		setTimeout(() => {
			dispatch({
				type: types.CLEAN_MESSAGE,
			});
		}, timer);
	};

export const GetAllProductsAction =
	(page: number, size: number) => async (dispatch: any) => {
		dispatch({
			type: types.SET_LOADING,
			payload: true,
		});
		try {
			const response = await axiosClient.get(
				`api/products?page=${page}&size=${size}`
			);
			dispatch({
				type: types.GET_ALL_PRODUCTS,
				payload: response.data,
			});
		} catch (error: any) {
			console.log(error);
			dispatch(ShowNotificationAction(error.response.data.message, 'error'));
		} finally {
			dispatch({
				type: types.SET_LOADING,
				payload: false,
			});
		}
	};

export const SelectProductAction = (id: string) => async (dispatch: any) => {
  dispatch({
    type: types.SELECT_PRODUCT,
    payload: id
  });
};

export const AddProductAction =
	(product: NewProductInterface) => async (dispatch: any) => {
		dispatch({
			type: types.SET_LOADING,
			payload: true,
		});
		try {
			await axiosClient.post('api/products', product);
			dispatch(ShowNotificationAction('Producto agregado', 'success'));
		} catch (error: any) {
			console.log(error);
			dispatch(ShowNotificationAction(error.response.data.message, 'error'));
		} finally {
			dispatch({
				type: types.SET_LOADING,
				payload: false,
			});
		}
	};

export const UpdateProductAction = (product: ProductInterface) => async (dispatch: any) => {
  dispatch({
    type: types.SET_LOADING,
    payload: true,
  });
  try {
    await axiosClient.put(`api/products/${product.id}`, product);
    dispatch(ShowNotificationAction('Producto actualizado', 'success'));
  } catch (error: any) {
    console.log(error);
    dispatch(ShowNotificationAction(error.response.data.message, 'error'));
  } finally {
    dispatch({
      type: types.SET_LOADING,
      payload: false,
    });
  }
};


export const DeleteProductAction = (id: string) => async (dispatch: any) => {
	dispatch({
		type: types.SET_LOADING,
		payload: true,
	});
	try {
		await axiosClient.delete(`api/products/${id}`);
		dispatch(ShowNotificationAction('Producto eliminado', 'success'));
	} catch (error: any) {
		console.log(error);
		dispatch(ShowNotificationAction(error.response.data.message, 'error'));
	} finally {
		dispatch({
			type: types.SET_LOADING,
			payload: false,
		});
	}
};

export const AddToCartAction =
	(product: ProductInterface) => (dispatch: any) => {
		dispatch({
			type: types.ADD_TO_CART,
			payload: product,
		});
		dispatch(ShowNotificationAction('Producto agregado al carrito', 'success'));
	};

export const RemoveFromCartAction = (id: number) => (dispatch: any) => {
	dispatch({
		type: types.REMOVE_FROM_CART,
		payload: id,
	});

	dispatch(ShowNotificationAction('Producto eliminado del carrito', 'success'));
};

export const ClearCartAction = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_CART,
  });
}

export const BuyProductsAction = (products: ProductInterface[]) => async (dispatch: any) => {
  dispatch({
    type: types.SET_LOADING,
    payload: true,
  });
  try {
    await axiosClient.post('api/buys', products);
    dispatch(ShowNotificationAction('Compra realizada', 'success'));
  } catch (error: any) {
    console.log(error);
    dispatch(ShowNotificationAction(error.response.data.message, 'error'));
  } finally {
    dispatch({
      type: types.SET_LOADING,
      payload: false,
    });
  }
}

export const GetAllBuysAction = (page: number, size: number) => async (dispatch: any) => {
  dispatch({
    type: types.SET_LOADING,
    payload: true,
  });
  try {
    const response = await axiosClient.get(`api/buys?page=${page}&size=${size}`);
    dispatch({
      type: types.GET_ALL_BUYS,
      payload: response.data,
    });
  } catch (error: any) {
    console.log(error);
    dispatch(ShowNotificationAction(error.response.data.message, 'error'));
  } finally {
    dispatch({
      type: types.SET_LOADING,
      payload: false,
    });
  }
}
