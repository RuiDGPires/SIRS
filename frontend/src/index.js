import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import LoginCustomer from './pages/login-customer';
import LoginEmployee from './pages/login-employee';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logincustomer" element={<LoginCustomer />} />
        <Route path="/loginemployee" element={<LoginEmployee />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
