import React from 'react';
import { Provider } from 'react-redux';
import BasicApp from './BasicApp';
import { configureStore, setAsCurrentStore } from './store';
import rootSaga from './sagas';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // configure redux
    const store = configureStore();
    store.runSaga(rootSaga);
    setAsCurrentStore(store);
    this.state = {
      store,
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <BasicApp />
      </Provider>
    );
  }
}
