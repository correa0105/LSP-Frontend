import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import ContainerRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Menu />
          <ContainerRoutes />
          <GlobalStyles />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
