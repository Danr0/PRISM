import * as React from 'react';
import { Provider } from "react-redux";
import { Suspense } from "react";
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from "./store";
import {Router} from './pages/Router'


const App: React.FC = () => (
  <Provider store={store}>
    <Suspense fallback={<div>Loading</div>}>
      <ConnectedRouter history={history}>
        <Router/>
      </ConnectedRouter>
    </Suspense>
  </Provider>
)

export default App;
