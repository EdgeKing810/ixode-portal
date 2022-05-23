import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import LoginWrapper from "./wrappers/LoginWrapper.jsx";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Configs from "./pages/Configs.jsx";
import Sheet from "./pages/Sheet.jsx";

import "./assets/css/blinker.css";

function App() {
  return (
    <div className="w-full">
      <LoginWrapper>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/home" element={<Home />} />
          <Route exact path="/configs" element={<Configs />} />

          <Route exact path="/sheet" element={<Sheet />} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LoginWrapper>
    </div>
  );
}

export default App;
