import React, { useEffect } from 'react';
import './ProductForm.css';
import { connect } from 'react-redux';
import {
	Button,
	FormControl,
	FormControlLabel,
	Switch,
	TextField,
} from '@mui/material';
import { AddProductAction, ShowNotificationAction, UpdateProductAction } from '../../redux/actions';
import { ProductInterface, NewProductInterface } from '../../utils/interfaces';
import { useParams } from 'react-router-dom';

interface ProductFormProps {
	selectedProduct: ProductInterface;
	AddProduct: (product: NewProductInterface) => void;
  UpdateProduct: (product: ProductInterface) => void;
	ShowNotification: (message: string, type: string, duration: number) => void;
}

function ProductForm({
	selectedProduct,
	AddProduct,
  UpdateProduct,
	ShowNotification,
}: ProductFormProps) {
  const { productId } = useParams();

	const [name, setName] = React.useState('');
	const [inventory, setInventory] = React.useState(0);
	const [min, setMin] = React.useState(0);
	const [max, setMax] = React.useState(0);
	const [enabled, setEnabled] = React.useState(true);

	useEffect(() => {
		if (selectedProduct) {
			setName(selectedProduct.name);
			setInventory(selectedProduct.inventory);
			setMin(selectedProduct.min);
			setMax(selectedProduct.max);
			setEnabled(selectedProduct.enabled);
		}
	}, [selectedProduct]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name || !inventory || !min || !max) {
			ShowNotification('Debe completar todos los campos', 'error', 3000);
			return;
		}
		if (isNaN(inventory) || isNaN(min) || isNaN(max)) {
			ShowNotification('Los valores deben ser numericos', 'error', 3000);
			return;
		}
		if (inventory < 0 || min < 0 || max < 0) {
			ShowNotification(
				'Los valores no pueden ser negativos',
				'error',
				3000
			);
			return;
		}
		if (min > max) {
			ShowNotification(
				'El stock minimo no puede ser mayor al stock maximo',
				'error',
				3000
			);
			return;
		}
		if (inventory < min || inventory > max) {
			ShowNotification(
				'El stock actual debe estar entre el stock minimo y el stock maximo',
				'error',
				3000
			);
			return;
		}

		const product: NewProductInterface = {
			name,
			inventory,
			min,
			max,
			enabled,
		};

    if(productId) {
      UpdateProduct({...product, id: productId});
    } else {
      AddProduct(product);
    }

    setName('');
    setInventory(0);
    setMin(0);
    setMax(0);
	};

	return (
		<div className='product-form'>
			<h1>Agregar Nuevo Producto</h1>

			<form className='form-container' onSubmit={handleSubmit} autoComplete='off'>
				<FormControl sx={{ width: 1, gap: 2 }}>
					<TextField
            value={name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setName(event.target.value);
						}}
						sx={{ mt: 1, mr: 1 }}
						id='product-name'
						label='Nombre producto'
						variant='outlined'
					/>
					<TextField
            value={inventory}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setInventory(parseInt(event.target.value));
						}}
						sx={{ mt: 1, mr: 1 }}
						id='product-inventory'
						label='Inventario'
						variant='outlined'
						inputProps={{ inputMode: 'numeric', min: 0 }}
					/>
					<TextField
            value={min}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setMin(parseInt(event.target.value));
						}}
						sx={{ mt: 1, mr: 1 }}
						id='product-min'
						label='Stock minimo permitido'
						variant='outlined'
						inputProps={{ inputMode: 'numeric', min: 0 }}
					/>
					<TextField
            value={max}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setMax(parseInt(event.target.value));
						}}
						sx={{ mt: 1, mr: 1 }}
						id='product-max'
						label='Stock máximo permitido'
						variant='outlined'
						inputProps={{ inputMode: 'numeric', min: 0 }}
					/>
					<FormControlLabel
						sx={{ width: 4 / 7 }}
						control={
							<Switch
								checked={enabled}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setEnabled(event.target.checked);
								}}
							/>
						}
						value
						label='Habilitado'
						labelPlacement='start'
						classes={{ label: 'switch-label' }}
					/>

					<Button sx={{ mt: 1, mr: 1 }} type='submit' variant='contained'>
						Agregar
					</Button>
				</FormControl>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedProduct: state.products.selectedProduct,
});

const mapDispatchToProps = (dispatch) => ({
	AddProduct: (product: NewProductInterface) =>
		dispatch(AddProductAction(product)),
  UpdateProduct: (product: ProductInterface) =>
    dispatch(UpdateProductAction(product)),
	ShowNotification: (text: string, type: string, timer: number) =>
		dispatch(ShowNotificationAction(text, type, timer)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
