import React from 'react';
//Redux
import { Provider } from 'react-redux';
import setStore from '../setStore';
import initialState from '../reducers/initialState';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../components/App';

const url = process.argv[2];

const store = setStore({ initialState });

const render = () => {
	return renderToString(
		<Provider store={store}>
			<StaticRouter location={`${url}`} >
				<App />
			</StaticRouter>
		</Provider>
	);
};

console.log(render());
