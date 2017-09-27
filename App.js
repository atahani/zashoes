import React from 'react';
import { Provider } from 'react-redux';
import BasicApp from './BasicApp';
import { configureStore, setAsCurrentStore } from './store';
import rootSaga from './sagas';

const App = () => {
  // configure redux
  const store = configureStore();
  store.runSaga(rootSaga);
  setAsCurrentStore(store);
  return (
    <Provider store={store}>
      <BasicApp />
    </Provider>
  );
};

export default App;
