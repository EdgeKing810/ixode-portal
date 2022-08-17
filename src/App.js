import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import LoginWrapper from './wrappers/LoginWrapper.jsx';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Configs from './pages/Configs.jsx';
import Users from './pages/Users.jsx';
import Profile from './pages/Profile.jsx';
import Media from './pages/Media.jsx';
import Misc from './pages/Misc.jsx';
import Sheet from './pages/Sheet.jsx';
import DataHome from './pages/DataHome.jsx';
import Events from './pages/Events.jsx';

import ViewProject from './pages/ViewProject.jsx';
import ViewCollection from './pages/ViewCollection.jsx';
import ViewCustomStructure from './pages/ViewCustomStructure.jsx';

import ViewDataProject from './pages/ViewDataProject.jsx';
import ViewDataCollection from './pages/ViewDataCollection.jsx';

import './assets/css/blinker.css';
import Data from './pages/Data.jsx';

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
          <Route exact path="/media" element={<Media />} />
          <Route exact path="/misc" element={<Misc />} />
          <Route exact path="/sheet" element={<Sheet />} />
          <Route exact path="/data" element={<DataHome />} />

          <Route exact path="/project/:project_id" element={<ViewProject />} />
          <Route exact path="/p/:project_id" element={<ViewProject />} />
          <Route
            exact
            path="/project/:project_id/collection/:collection_id"
            element={<ViewCollection />}
          />
          <Route
            exact
            path="/p/:project_id/c/:collection_id"
            element={<ViewCollection />}
          />
          <Route
            exact
            path="/project/:project_id/collection/:collection_id/custom/:custom_structure_id"
            element={<ViewCustomStructure />}
          />
          <Route
            exact
            path="/p/:project_id/c/:collection_id/cs/:custom_structure_id"
            element={<ViewCustomStructure />}
          />

          <Route
            exact
            path="/data/project/:project_id"
            element={<ViewDataProject />}
          />
          <Route
            exact
            path="/data/p/:project_id"
            element={<ViewDataProject />}
          />
          <Route
            exact
            path="/data/project/:project_id/collection/:collection_id"
            element={<ViewDataCollection />}
          />
          <Route
            exact
            path="/data/p/:project_id/c/:collection_id"
            element={<ViewDataCollection />}
          />
          <Route
            exact
            path="/data/project/:project_id/collection/:collection_id/data/:mode"
            element={<Data />}
          />
          <Route
            exact
            path="/data/p/:project_id/c/:collection_id/d/:mode"
            element={<Data />}
          />
          <Route
            exact
            path="/data/project/:project_id/collection/:collection_id/data/:mode/:data_id"
            element={<Data />}
          />
          <Route
            exact
            path="/data/p/:project_id/c/:collection_id/d/:mode/:data_id"
            element={<Data />}
          />
          <Route exact path="/events" element={<Events />} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LoginWrapper>
    </div>
  );
}

export default App;
