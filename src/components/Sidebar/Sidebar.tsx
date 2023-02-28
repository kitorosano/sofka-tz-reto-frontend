import React from 'react';
import './Sidebar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SegmentIcon from '@mui/icons-material/Segment';
import { Box, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

function Sidebar() {
	const navigate = useNavigate();

	return (
		<>
			<div className='sidebar'>
				<h1>TALENTZONE SHOP</h1>
				<hr />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Button
            variant='outlined'
            color="inherit"
            size="large"
            endIcon={<SegmentIcon />}
            onClick={() => navigate('/')}
          >
            Listado Productos
          </Button>

          <Button
            variant='outlined'
            color="inherit"
            size="large"
            endIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/add-product')}
          >
            Agregar Producto
          </Button>

          <Button
            variant='outlined'
            color="inherit"
            size="large"
            endIcon={<ShoppingCartIcon />}
            onClick={() => navigate('/cart')}
          >
            Carrito Compras
          </Button>

          <Button
            variant='outlined'
            color="inherit"
            size="large"
            endIcon={<HistoryIcon />}
            onClick={() => navigate('/buys')}
          >
            Historial Compras
          </Button>
        </Box>
			</div>
			<Outlet />
		</>
	);
}

export default Sidebar;
