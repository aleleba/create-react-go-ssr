import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../components/App';

const url = process.argv[2];

const render = () => {
	return renderToString(
		<StaticRouter location={`${url}`} >
			<App />
		</StaticRouter>
	);
};

console.log(render());
