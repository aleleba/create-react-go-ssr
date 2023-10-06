import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import initialStateReducer from '../frontend/reducers/initialState';
import setStore from '../frontend/setStore';

export const ProviderMock = ({ children, initialState }: { children: unknown, initialState?: unknown}) => {
	let initialStateMock = initialStateReducer;

	if(initialState !== undefined){
		initialStateMock = initialState as unknown as typeof initialStateReducer;
	}

	const history = createMemoryHistory();
	const store = setStore({ initialState: initialStateMock });

	return(
		<Provider store={store}>
			<Router location={history.location} navigator={history}>
				{children as JSX.Element}
			</Router>
		</Provider>
	);
};

export default ProviderMock;
