import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

// @ts-ignore
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// @ts-ignore
import AlertTemplate from 'react-alert-template-basic';

import { LocalContextProvider } from './wrappers/LocalContext';

// @ts-ignore
const App = React.lazy(() => import('./App.js'));

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '30px',
  transition: transitions.SCALE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <LocalContextProvider>
      <Router>
        <React.StrictMode>
          <Suspense fallback={<div></div>}>
            <App />
          </Suspense>
        </React.StrictMode>
      </Router>
    </LocalContextProvider>
  </AlertProvider>,
  document.getElementById('root')
);
