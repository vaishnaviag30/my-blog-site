import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-pastel-bg">
      <Header />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
        {location.pathname === '/' && !userData?.$id && (
          <div className="text-center text-4xl font-bold text-pastel-text mt-8 animate-pulse">
            Login to read posts!!
          </div>
        )}
      </main>

      <Footer />
    </div>
  ) : null;
}

export default App;

