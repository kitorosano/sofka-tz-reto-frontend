import CarritoProductos from './pages/Cart/Cart';
import ProductForm from './pages/ProductForm/ProductForm';
import BuyHistory from './pages/Buys/BuyHistory';
import ProductList from './pages/ProductList/ProductList';
import ErrorPage404 from './pages/ErrorPage/ErrorPage404';
import Sidebar from './components/Sidebar/Sidebar';

export const routes = [
	{
		path: '/',
		element: <Sidebar />,
    errorElement: <ErrorPage404 />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: 'add-product',
        element: <ProductForm />,
      },
      {
        path: 'edit-product/:productId',
        element: <ProductForm />,
      },
      {
        path: 'cart',
        element: <CarritoProductos />,
      },
      {
        path: 'buys',
        element: <BuyHistory />,
      }
    ]
	},
];
