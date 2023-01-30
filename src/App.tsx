import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import LoginWrapper from './wrappers/LoginWrapper';

import Login from './pages/Login';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Configs from './pages/Configs';
import Constraints from './pages/Constraints';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Media from './pages/Media';
import Misc from './pages/Misc';
import DataHome from './pages/DataHome';
import RoutesHome from './pages/RoutesHome';
import Events from './pages/Events';

import Data from './pages/Data';
import RoutePage from './pages/Route';
import Repl from './pages/Repl';

import ViewProject from './pages/ViewProject';
import ViewCollection from './pages/ViewCollection';
import ViewCustomStructure from './pages/ViewCustomStructure';

import ViewDataProject from './pages/ViewDataProject';
import ViewDataCollection from './pages/ViewDataCollection';

import ViewRoutesProject from './pages/ViewRoutesProject';

import './assets/css/blinker.css';

function App() {
  return (
    <div className="w-full">
      <LoginWrapper>
        <Routes>
          <Route
            // exact
            path="/"
            element={<Login />}
          />

          <Route
            // exact
            path="/home"
            element={<Home />}
          />
          <Route
            // exact
            path="/projects"
            element={<Projects />}
          />
          <Route
            // exact
            path="/configs"
            element={<Configs />}
          />
          <Route
            // exact
            path="/users"
            element={<Users />}
          />
          <Route
            // exact
            path="/profile"
            element={<Profile />}
          />
          <Route
            // exact
            path="/media"
            element={<Media />}
          />
          <Route
            // exact
            path="/misc"
            element={<Misc />}
          />
          <Route
            // exact
            path="/data"
            element={<DataHome />}
          />
          <Route
            // exact
            path="/routes"
            element={<RoutesHome />}
          />
          <Route
            // exact
            path="/events"
            element={<Events />}
          />

          <Route
            // exact
            path="/project/:project_id"
            element={<ViewProject />}
          />
          <Route
            // exact
            path="/p/:project_id"
            element={<ViewProject />}
          />
          <Route
            // exact
            path="/project/:project_id/collection/:collection_id"
            element={<ViewCollection />}
          />
          <Route
            // exact
            path="/p/:project_id/c/:collection_id"
            element={<ViewCollection />}
          />
          <Route
            // exact
            path="/project/:project_id/collection/:collection_id/custom/:custom_structure_id"
            element={<ViewCustomStructure />}
          />
          <Route
            // exact
            path="/p/:project_id/c/:collection_id/cs/:custom_structure_id"
            element={<ViewCustomStructure />}
          />

          <Route
            // exact
            path="/data/project/:project_id"
            element={<ViewDataProject />}
          />
          <Route
            // exact
            path="/data/p/:project_id"
            element={<ViewDataProject />}
          />
          <Route
            // exact
            path="/data/project/:project_id/collection/:collection_id"
            element={<ViewDataCollection />}
          />
          <Route
            // exact
            path="/data/p/:project_id/c/:collection_id"
            element={<ViewDataCollection />}
          />
          <Route
            // exact
            path="/data/project/:project_id/collection/:collection_id/data/:mode"
            element={<Data />}
          />
          <Route
            // exact
            path="/data/p/:project_id/c/:collection_id/d/:mode"
            element={<Data />}
          />
          <Route
            // exact
            path="/data/project/:project_id/collection/:collection_id/data/:mode/:data_id"
            element={<Data />}
          />
          <Route
            // exact
            path="/data/p/:project_id/c/:collection_id/d/:mode/:data_id"
            element={<Data />}
          />

          <Route
            // exact
            path="/routes/project/:project_id"
            element={<ViewRoutesProject />}
          />
          <Route
            // exact
            path="/routes/p/:project_id"
            element={<ViewRoutesProject />}
          />
          <Route
            // exact
            path="/routes/project/:project_id/route/:mode"
            element={<RoutePage />}
          />
          <Route
            // exact
            path="/routes/p/:project_id/r/:mode"
            element={<RoutePage />}
          />
          <Route
            // exact
            path="/routes/project/:project_id/route/:mode/:route_id"
            element={<RoutePage />}
          />
          <Route
            // exact
            path="/routes/p/:project_id/r/:mode/:route_id"
            element={<RoutePage />}
          />

          <Route
            //exact
            path="/constraints"
            element={<Constraints />}
          />

          <Route
            //exact
            path="/repl"
            element={<Repl />}
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LoginWrapper>
    </div>
  );
}

export default App;
