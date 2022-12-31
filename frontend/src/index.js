import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import LoginCustomer from './pages/login-customer';
import LoginEmployee from './pages/login-employee';
import Customer from './pages/customer';
import Employee from './pages/employee';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-customer" element={<LoginCustomer />} />
        <Route path="/customer/:username" element={<Customer />} />
        <Route path="/login-employee" element={<LoginEmployee />} />
        <Route path="/employee/:username" element={<Employee />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
