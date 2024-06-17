import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Process from '../pages/Process';
import Clients from '../pages/Clients';
import Client from '../pages/Client';
import ClientCreate from '../pages/ClientCreate';
import PrivateRoute from './PrivateRoute';
import ProcessCreate from '../pages/ProcessCreate';

export default function ContainerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/process"
        element={
          <PrivateRoute>
            <Process />
          </PrivateRoute>
        }
      />
      <Route
        path="/process/:id"
        element={
          <PrivateRoute>
            <ProcessCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients/:id"
        element={
          <PrivateRoute>
            <Client />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients/create"
        element={
          <PrivateRoute>
            <ClientCreate />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/clients/delete/:id"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
