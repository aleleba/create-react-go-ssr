import { TAction } from '../actions';

const initialState = {
	hello: 'world'
};

const testReducer = (state = initialState, action: TAction) => {
	switch (action.type){
	case 'CHANGE_HELLO': {
		const newHello = action.payload.hello;
		return {
			hello: newHello
		};
	}
	default:
		return state;
	}
};

export default testReducer;
