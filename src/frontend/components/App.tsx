import React, { useEffect } from 'react';
import PrincipalRoutes from './PrincipalRoutes';
import { config } from '../../../config';

const App = () => {
	if(config.ENV === 'development') {
		useEffect(() => {
			const ws = new WebSocket('wss://nmr4jbx8-3000.use.devtunnels.ms/ws');
			ws.onmessage = (event) => {
				if (event.data === 'reload') {
					window.location.reload();
				}
			};
		}, []);
	}

	return <PrincipalRoutes />;
};

export default App;
