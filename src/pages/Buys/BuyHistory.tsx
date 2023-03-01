import React, { useEffect, useState } from 'react';
import './BuyHistory.css'
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { HistoryResponseInterface } from '../../utils/interfaces';
import { GetAllBuysAction } from '../../redux/actions';
import moment from 'moment';

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.clientIdType} {row.clientId}
        </TableCell>
        <TableCell align="center">{row.clientName}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.quantity}
                      </TableCell>
                      <TableCell align="left">{product.name}</TableCell>
                      <TableCell align="left">{product.quantity}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface BuyHistoryProps {
  buys: HistoryResponseInterface;
  GetAllBuys: (page: number, size: number) => void;
}

function BuyHistory({
  buys,
  GetAllBuys,
}: BuyHistoryProps) {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);

	const { items, currentPage, totalCount } = buys;

  useEffect(() => {
    GetAllBuys(page, size);
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
    <div className='buys-list'>
      <h1>Historial de Compras</h1>

      <div className='buys-container'>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Id Cliente</TableCell>
                <TableCell align="center">Nombre Cliente</TableCell>
                <TableCell align="right">Fecha de Compra</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {items &&
              items.length > 0 &&
              items.map((buy) => (
                <Row key={buy.id} row={buy} />
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
        

				<TablePagination
					component='div'
					count={totalCount}
					page={currentPage}
					onPageChange={handleChangePage}
					rowsPerPage={size}
					onRowsPerPageChange={handleChangeRowsPerPage}
					style={{ marginTop: '10px' }}
					labelRowsPerPage='Items por página'
					rowsPerPageOptions={[5, 10, 15]}
				/>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
	buys: state.products.buys,
});

const mapDispatchToProps = (dispatch) => ({
	GetAllBuys: (page: number, size: number) =>
		dispatch(GetAllBuysAction(page, size)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BuyHistory);
