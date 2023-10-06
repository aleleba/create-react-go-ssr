import setStore from '../setStore';
import initialState from '../reducers/initialState';
const store = setStore({ initialState });
const preloadedState = store.getState();
console.log(preloadedState);
