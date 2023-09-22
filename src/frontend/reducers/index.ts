import { combineReducers } from 'redux';
import testReducer from './testReducer';
import { IChangeHelloPayload } from '../actions/testAction';

export interface IInitialState {
	testReducer?: IChangeHelloPayload | undefined
}

const rootReducer = combineReducers({
	// Here comes the reducers
	testReducer
});

export default rootReducer;
