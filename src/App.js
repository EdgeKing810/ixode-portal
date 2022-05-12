import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import LoginWrapper from './wrappers/LoginWrapper.jsx';

import Sheet from './pages/Sheet.jsx';

import './assets/css/blinker.css';

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route
          exact
          path="/protected"
          element={
            <LoginWrapper>
              {/* <Navbar /> */}
              <div></div>
            </LoginWrapper>
          }
        />

        <Route exact path="/sheet" element={<Sheet />} />

        <Route path="*" element={<Navigate to="/sheet" />} />
      </Routes>
    </div>
  );
}

export default App;
