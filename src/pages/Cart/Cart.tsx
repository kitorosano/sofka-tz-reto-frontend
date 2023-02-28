import React, { useEffect } from 'react';
import './Cart.css'
import { connect } from 'react-redux';
import { RemoveFromCartAction, ClearCartAction } from '../../redux/actions';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ProductInterface } from '../../utils/interfaces';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface CartProps {
  cart: ProductInterface[];
}
function Cart({cart}: CartProps) {
  
	return (
		<div className='product-cart'>
			<h1>Carrito de compras</h1>

			<div className='cart-container'>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Productos a comprar...
          </Typography>
          <List >
            {cart.length === 0 && <ListItem>No hay productos en el carrito</ListItem>}
            {cart.map(product =>
              <ListItem 
                key={product.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <RemoveCircleIcon color="action"/>
                  </IconButton>
                }
              >
                <ListItemText
                  primary={product.name}
                />
              </ListItem>,
            )}
          </List>
        </Grid>
      </div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	cart: state.products.cart,
});

const mapDispatchToProps = (dispatch) => ({
  RemoveFromCart: (id: number) => dispatch(RemoveFromCartAction(id)),
  ClearCart: () => dispatch(ClearCartAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);