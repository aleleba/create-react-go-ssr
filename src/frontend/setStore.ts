// Redux
import { legacy_createStore as createStore} from 'redux'; //, applyMiddleware
// import { Provider } from 'react-redux';
import { composeWithDevTools as composeWithDevToolsWeb } from '@redux-devtools/extension';
import { config } from '../../config';
import reducer, { IInitialState } from './reducers';


const { ENV } = config;

const composeEnhancers = composeWithDevToolsWeb({
	// Specify here name, actionsBlacklist, actionsCreators and other options
});

const setStore = ({ initialState }: { initialState: IInitialState | undefined }) => {
	const store = ENV === 'development' ? createStore(
		reducer,
		initialState,
		composeEnhancers(),
	) : createStore(
		reducer,
		initialState,
	);
	return store;
};

export default setStore;
