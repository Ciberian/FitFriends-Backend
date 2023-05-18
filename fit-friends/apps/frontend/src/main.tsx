import React from 'react';
import * as ReactDOM from 'react-dom/client';
import browserHistory from './app/services/browser-history.service';
import HistoryRouter from './app/components/history-router/history-router';
import App from './app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import {
  checkAuthAction,
  fetchGymsAction,
  fetchTrainingsAction
} from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchGymsAction());
store.dispatch(fetchTrainingsAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <HistoryRouter history={browserHistory}>
      <App />
    </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
