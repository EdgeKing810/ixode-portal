import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import LoginWrapper from './wrappers/LoginWrapper.jsx';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Configs from './pages/Configs.jsx';
import Users from './pages/Users.jsx';
import Profile from './pages/Profile.jsx';
import Sheet from './pages/Sheet.jsx';

import ViewProject from './pages/ViewProject.jsx';
import ViewCollection from './pages/ViewCollection.jsx';

import './assets/css/blinker.css';

function App() {
  return (
    <div className="w-full">
      <LoginWrapper>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/home" element={<Home />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/configs" element={<Configs />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/sheet" element={<Sheet />} />

          <Route exact path="/project/:project_id" element={<ViewProject />} />
          <Route
            exact
            path="/project/:project_id/collection/:collection_id"
            element={<ViewCollection />}
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LoginWrapper>
    </div>
  );
}

export default App;
