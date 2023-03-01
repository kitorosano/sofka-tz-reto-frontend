import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from './routes';
import NotificationAlert from './components/NotificationAlert/NotificationAlert';
import { MessageInterface } from './utils/interfaces';

const router = createBrowserRouter(routes);

interface AppProps {
	notification: MessageInterface;
}
function App({ notification }: AppProps) {
	const { type, text } = notification;

	return (
		<div className='app'>
			<RouterProvider router={router} />
      {text && type && (
        <NotificationAlert type={type} message={text} iconSize='medium' />
      )}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		notification: state.products.notification,
	};
};

export default connect(mapStateToProps)(App);
