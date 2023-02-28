import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { ProductInterface } from '../../utils/interfaces';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	AddToCartAction,
	DeleteProductAction,
	SelectProductAction,
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
	product: ProductInterface;
	AddToCart: (product: ProductInterface) => void;
	SelectProduct: (id: string) => void;
	DeleteProduct: (id: string) => void;
}

function ProductCard({
	product,
	AddToCart,
	SelectProduct,
	DeleteProduct,
}: ProductCardProps) {
	const { id, name, inventory, enabled } = product;
	const navigate = useNavigate();

	const addToCart = () => {
		AddToCart(product);
	};

	const editProduct = (id) => {
		SelectProduct(id);
		navigate(`/edit-product/${id}`);
	};

	const deleteProduct = (id) => {
		DeleteProduct(id);
	};

	return (
		<Card sx={{ maxWidth: 250 }}>
			<CardHeader
				title={name}
				subheader={`inventario: ${inventory}`}
				subheaderTypographyProps={{ variant: 'body2' }}
			/>
			<CardMedia
				component='img'
				height='194'
				image={'/src/assets/images/shopping-icon.png'}
				alt={name}
			/>

			<CardActions disableSpacing>
				{enabled ? (
					<IconButton aria-label='add to cart' onClick={addToCart}>
						<AddShoppingCartIcon color='warning' />
					</IconButton>
				) : (
					<IconButton aria-label='add to cart' disabled onClick={addToCart}>
						<RemoveShoppingCartIcon color='action' />
					</IconButton>
				)}

				<IconButton aria-label='edit product' onClick={() => editProduct(id)}>
					<EditIcon color='primary' />
				</IconButton>

				<IconButton
					aria-label='delete product'
					onClick={() => deleteProduct(id)}
				>
					<DeleteIcon color='error' />
				</IconButton>
			</CardActions>
		</Card>
	);
}

const mapDispatchToProps = (dispatch) => ({
	AddToCart: (product: ProductInterface) => dispatch(AddToCartAction(product)),
	SelectProduct: (id: string) => dispatch(SelectProductAction(id)),
	DeleteProduct: (id: string) => dispatch(DeleteProductAction(id)),
});
export default connect(null, mapDispatchToProps)(ProductCard);
