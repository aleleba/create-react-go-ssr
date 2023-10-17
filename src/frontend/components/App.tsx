import React, { useEffect } from 'react';
import PrincipalRoutes from './PrincipalRoutes';
import { config } from '../../../config';

const App = () => {
	const { PREFIX_URL } = config;
	if(config.ENV === 'development') {
		useEffect(() => {
			const ws = new WebSocket(`wss://${config.HOST}${PREFIX_URL}/ws`);
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
