import React, { useEffect } from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import {
	RemoveFromCartAction,
	ClearCartAction,
	AddToCartAction,
} from '../../redux/actions';
import {
	Grid,
	Typography,
	List,
	ListItem,
	ListItemText,
	IconButton,
	ListItemIcon,
	ListSubheader,
	FormControl,
	TextField,
	Button,
} from '@mui/material';
import {
	CartInfoInterface,
	CartInterface,
	ProductInterface,
} from '../../utils/interfaces';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImageIcon from '@mui/icons-material/Image';
import { ShowNotificationAction, BuyProductsAction } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

interface CartProps {
	cart: CartInterface[];
	AddToCart: (product: ProductInterface | CartInterface) => void;
	RemoveFromCart: (id: number) => void;
	ClearCart: () => void;
  ShowNotification: (message: string, type: string, timer?: number) => void;
  BuyProducts: (cart: CartInfoInterface) => void;
}
function Cart({ cart, AddToCart, RemoveFromCart, ClearCart, ShowNotification, BuyProducts }: CartProps) {
	const [total, setTotal] = React.useState(0);
	const [dirtyCart, setDirtyCart] = React.useState<CartInterface[]>([]);
	const [clientName, setClientName] = React.useState('');
	const [clientId, setClientId] = React.useState('');
	const [clientIdType, setClientIdType] = React.useState('');
  const navigate = useNavigate();

	useEffect(() => {
		// let total = 0;
		// cart.products.forEach((product) => {
		//   total += product.price * product.quantity;
		// });
		// setTotal(total);

		setDirtyCart(cart.sort((a, b) => a.name.localeCompare(b.name)));
	}, [cart]);

	const handleAddQuantity = (product) => {
		AddToCart(product);
	};

	const handleRemoveQuantity = (id) => {
		RemoveFromCart(id);
	};

	const handleLimpiarCarrito = () => {
		ClearCart();
	};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clientName || !clientId || !clientIdType) {
      ShowNotification('Debe completar todos los campos', 'error', 3000);
      return;
    }
    if (clientId.length < 6) {
      ShowNotification('El id debe tener al menos 6 caracteres', 'error', 3000);
      return;
    }

    const cartInfo: CartInfoInterface = {
      clientName,
      clientId,
      clientIdType,
      date: new Date(),
      products: dirtyCart,
    };

    BuyProducts(cartInfo)
  };


	return (
		<div className='product-cart'>
			<h1>Carrito de compras</h1>

			<div className='cart-container'>
				<Grid container spacing={2}>
					{dirtyCart.length === 0 ? (
						<Typography variant='h6' color='GrayText' padding={1}>
							No hay productos en el carrito
						</Typography>
					) : (
						<>
							<Grid item sm={12} lg={6}>
								<List
									sx={{
										width: '100%',
										bgcolor: 'background.paper',
									}}
									subheader={<ListSubheader>Lista de productos:</ListSubheader>}
								>
									{dirtyCart.map((product) => (
										<ListItem
											key={product.id}
											sx={{ px: 2 }}
											secondaryAction={
												<>
													<IconButton
														edge='end'
														aria-label='comments'
														onClick={() => handleAddQuantity(product)}
													>
														<AddCircleIcon color='action' />
													</IconButton>
													<IconButton
														edge='end'
														aria-label='comments'
														onClick={() => handleRemoveQuantity(product.id)}
													>
														<RemoveCircleIcon color='action' />
													</IconButton>
												</>
											}
											disablePadding
										>
											<ListItemIcon>
												<ImageIcon />
											</ListItemIcon>
											<ListItemText
												primary={product.name}
												secondary={'Cantidad: ' + product.quantity}
											/>
										</ListItem>
									))}
								</List>

								<Button
									sx={{ mt: 2, mr: 1 }}
									onClick={handleLimpiarCarrito}
									variant='outlined'
									color='inherit'
									style={{float: 'right'}}
								>
									Limpiar carrito
								</Button>
							</Grid>
							<Grid item sm={12} lg={6}>
								<form onSubmit={handleSubmit}>
									<FormControl
										fullWidth
										sx={{
											display: 'flex',
											flexDirection: 'column',
											width: '80%',
											pt: 2,
											px: 2,
											mx: 3,
											textAlign: 'center',
										}}
									>
										{/* form title like subheader */}
										<Typography
											variant='subtitle2'
											gutterBottom
											component='div'
											color='GrayText'
										>
											Resumen de compra:
										</Typography>

										{/* form content */}
										<TextField
											value={clientName}
											onChange={(
												event: React.ChangeEvent<HTMLInputElement>
											) => {
												setClientName(event.target.value);
											}}
											sx={{ mt: 1, mr: 1 }}
											id='client-name'
											label='Nombre cliente'
											variant='filled'
										/>

										<div style={{ display: 'flex' }}>
											<TextField
												value={clientIdType}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													setClientIdType(event.target.value);
												}}
												sx={{ mt: 1, mr: 1, width: 1 / 3 }}
												id='client-id-type'
												label='Tipo id'
												variant='filled'
											/>

											<TextField
												value={clientId}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													setClientId(event.target.value);
												}}
												sx={{ mt: 1, mr: 1, width: 2 / 3 }}
												id='client-id'
												label='Id cliente'
												variant='filled'
											/>
										</div>

										<Typography
											sx={{ mt: 2 }}
											variant='h6'
											gutterBottom
											component='div'
										>
											Total: ${total}
										</Typography>

										<hr />

										<Button
											sx={{ mt: 1, mr: 1 }}
											type='submit'
											variant='contained'
										>
											Comprar
										</Button>
									</FormControl>
								</form>
							</Grid>
						</>
					)}
				</Grid>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	cart: state.products.cart,
});

const mapDispatchToProps = (dispatch) => ({
	AddToCart: (product: ProductInterface | CartInterface) =>
		dispatch(AddToCartAction(product)),
	RemoveFromCart: (id: number) => dispatch(RemoveFromCartAction(id)),
	ClearCart: () => dispatch(ClearCartAction()),
  ShowNotification: (message: string, type: string, timer = 4000) =>
    dispatch(ShowNotificationAction(message, type, timer)),
  BuyProducts: (cart: CartInfoInterface) =>
    dispatch(BuyProductsAction(cart)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
