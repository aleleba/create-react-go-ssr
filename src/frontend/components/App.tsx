import React, { useEffect } from 'react';
import PrincipalRoutes from './PrincipalRoutes';

const App = () => {
	useEffect(() => {
		const ws = new WebSocket('wss://nmr4jbx8-3000.use.devtunnels.ms/ws');
		ws.onmessage = (event) => {
			if (event.data === 'reload') {
				window.location.reload();
			}
		};
	}, []);

	return <PrincipalRoutes />;
};

export default App;
