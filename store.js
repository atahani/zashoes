import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga'
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers';

// defince it as gloabal variable
let currentStore = null;
const middlewares = [];

/**
 * config middlewares
 */

// create saga middlewares to handle async flow
const sagaMiddleware = createSagaMiddleware();

// add middlewares only in development mode
if (process.env.NODE_ENV === 'development') {
  // add redux-logger to middlewares
  middlewares.push(createLogger());
}

middlewares.push(sagaMiddleware);

/**
 * config compose with middlewares
 */

let customCompose = compose(applyMiddleware(...middlewares));

// wrap customCompose by composeWithDevTools with config to enable redux dev
// tools
if (process.env.NODE_ENV === 'development') {
  // this is for redux dev tools
  const composeEnhancers = composeWithDevTools({
    // specify here name, actionBlackList, actionCreators and other options if
    // needed
  });

  customCompose = composeEnhancers(customCompose);
}

/**
 * configure store with initial state
 * NOTE: since the persist store take for a while use from Promise to configureStore
 * @param {object} initialState initial state can set by windows --app-initial
 */
export const configureStore = initialState => {
  // create store
  currentStore = createStore(reducers, initialState, customCompose,);
  currentStore.runSaga = sagaMiddleware.run;
  currentStore.close = () => currentStore.dispatch(END);
  return currentStore;
};

/**
 * set current store
 * @param {object} store redux store
 */
export const setAsCurrentStore = store => {
  currentStore = store;
}

/**
 * get current store
 * can use from dispath action
 * getStore().dispatch()
 */
export const getStore = () => currentStore;

/**
 * get current state
 */
export const getState = () => currentStore.getState();