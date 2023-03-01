import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { connect } from 'react-redux';
import { Grid, TablePagination } from '@mui/material';
import ProductCard from './ProductCard/ProductCard';
import { GetAllProductsAction, SelectProductAction } from '../../redux/actions';
import { ProductResponseInterface } from '../../utils/interfaces';

interface ProductListProps {
	products: ProductResponseInterface;
	GetAllProducts: (page: number, size: number) => void;
}

function ProductList({ products, GetAllProducts }: ProductListProps) {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(8);

	const { items, currentPage, totalCount } = products;

	useEffect(() => {
		GetAllProducts(page, size);
	}, [page, size]);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setSize(parseInt(event.target.value));
		setPage(0);
	};

	return (
		<div className='product-list'>
			<h1>Listado de Productos</h1>

			<div className='products-container'>
				<Grid container spacing={2}>
					{items &&
						items.length > 0 &&
						items.map((product) => (
							<Grid item lg={3} key={product.id}>
								<ProductCard product={product} />
							</Grid>
						))}
				</Grid>

				<TablePagination
					component='div'
					count={totalCount}
					page={currentPage}
					onPageChange={handleChangePage}
					rowsPerPage={size}
					onRowsPerPageChange={handleChangeRowsPerPage}
					style={{ marginTop: '10px' }}
					labelRowsPerPage='Items por página'
					rowsPerPageOptions={[8, 12, 16]}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
	GetAllProducts: (page: number, size: number) =>
		dispatch(GetAllProductsAction(page, size)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
